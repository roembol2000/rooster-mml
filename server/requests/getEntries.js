const url = require("url");
const util = require("util");
const httpntlm = require("httpntlm");

const ntlmGet = util.promisify(httpntlm.get);

const getEntries = async (netwerkCredentials) => {
  const options = {
    url: url.resolve(process.env.BASE_URL, "frames/navbar.htm"),
    username: netwerkCredentials.username,
    password: netwerkCredentials.password,
  };

  const response = await ntlmGet(options);

  if (response.statusCode == 401) {
    const error = new Error("User is unauthorized! Got 401 at request.");
    error.name = "AuthenticationError";
    throw error;
  }
  if (response.statusCode !== 200) {
    const error = new Error(
      `Status code was not 200 but ${response.statusCode}`
    );
    error.name = "UnexpectedStatusError";
    throw error;
  }

  const body = await response.body;

  const entryTypes = [
    ["classes", "c"],
    ["teachers", "t"],
    ["rooms", "r"],
    ["students", "s"],
  ];

  const entries = entryTypes
    .map(([entryType, entryTypeShort]) => {
      const regex = new RegExp(`${entryType} = (.*);`);
      const array = JSON.parse(body.match(regex)[1]);
      return array.map((entry, index) => ({
        name: entry,
        type: entryTypeShort,
        id: index + 1,
      }));
    })
    .reduce((acc, curr) => [...acc, ...curr], []);

  return entries;
};

module.exports = getEntries;
