const fs = require("fs");
const readline = require("readline");

const { Client } = require("pg");
require("dotenv").config();

const client = new Client();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const getSchemaVersion = () => {
  return new Promise(async (resolve, reject) => {
    const schemverExists = (
      await client.query(
        "SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'schemver')"
      )
    ).rows[0].exists;

    if (schemverExists) {
      const schemver = (await client.query("SELECT version_nr FROM schemver"))
        .rows[0].version_nr;
      resolve(schemver);
    } else {
      resolve(-1);
    }
  });
};

const applyMigrations = async (migrations) => {
  for (const migration of migrations) {
    let data;

    try {
      data = fs.readFileSync(`./migrations/${migration}.sql`, "utf8");
    } catch (err) {
      console.log(`Could not read data from migration file ${migration}.sql`);
      return;
    }

    console.log(`Applying updates from ${migration}.sql`);

    try {
      await client.query(data);
    } catch (err) {
      console.log(
        `Could not apply migration '${migration}.sql'! Error: ${err}`
      );
    }
  }
};

console.log(
  `=============================
   DATABASE MIGRATION TOOL
=============================
`
);

(async () => {
  try {
    await client.connect();
    console.log(
      `Database connection successful! Logged in as user '${client.user}'`
    );
  } catch (err) {
    console.log(
      "Could not connect to the database! See the following error: " + err
    );

    process.exitCode = 1;
    return;
  }

  const schemaVersion = await getSchemaVersion();
  console.log(
    schemaVersion == -1
      ? "!IMPORTANT! Database does not contain schema version, the database will be set up from scratch."
      : `Current schema version is: ${schemaVersion}`
  );

  const migrationsList = fs
    .readdirSync("./migrations")
    .map((migration) => {
      const match = migration.match(/(\d+)/);
      return match ? Number(match[0]) : null;
    })
    .sort((a, b) => a - b);

  const unappliedMigrationsList = migrationsList.filter(
    (migration) => migration > schemaVersion
  );

  console.log(`${unappliedMigrationsList.length} migrations to be applied`);

  if (unappliedMigrationsList.length == 0) {
    console.log("Your database is up-to-date!");
    rl.close();
  }

  const answer = await prompt(
    `\nDo you wish to apply ${unappliedMigrationsList.length} migrations now? [y/N] `
  );

  if (answer.toLowerCase() != "y") {
    console.log("Not applying migrations. Goodbye!");
    rl.close();
  }

  await applyMigrations(unappliedMigrationsList);

  rl.close();
})();

rl.on("close", () => {
  process.exit(0);
});
