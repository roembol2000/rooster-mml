const express = require("express");
require("dotenv").config();

const logger = require("./util/logger");

// Check if all required env vars are available. Pass BYPASS_ENV_CHECK=1 to skip.
const requiredEnvs = ["BASE_URL"];
const missingEnvs = requiredEnvs.filter(
  (env) => !process.env.hasOwnProperty(env)
);
if (missingEnvs.length && process.env.BYPASS_ENV_CHECK !== "1") {
  logger.error(
    `You are missing one or more environment variables: ${missingEnvs.join(
      ", "
    )}`
  );
  return;
}

const app = express();
const router = express.Router();

const port = process.env.PORT || 80;

app.use(express.json());

const EntriesRoute = require("./routes/Entries");
const ScheduleRoute = require("./routes/Schedule");

app.use("/api", router);
router.use("/entries", EntriesRoute);
router.use("/schedule", ScheduleRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
  });
}

app.listen(port, () => {
  logger.info(`App is running on port ${port}. Log level is ${logger.level}.`);
});
