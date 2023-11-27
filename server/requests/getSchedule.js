const url = require("url");
const util = require("util");
const httpntlm = require("httpntlm");
const logger = require("../util/logger");
const { cleanUpHTML } = require("../util/scraping");

const ntlmGet = util.promisify(httpntlm.get);

const getEntries = async (netwerkCredentials, week, type, id) => {
  const paddedId = id.padStart(5, "0");
  const urlPath = `${week}/${type}/${type}${paddedId}.htm`;
  const options = {
    url: url.resolve(process.env.BASE_URL, urlPath),
    username: netwerkCredentials.username,
    password: netwerkCredentials.password,
  };

  const response = await ntlmGet(options);

  if (response.statusCode === 401) {
    const error = new Error("User is unauthorized! Got 401 at request.");
    error.name = "AuthenticationError";
    throw error;
  }
  if (response.statusCode === 404) {
    const error = new Error("Schedule not found!");
    error.name = "NotFoundError";
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

  const cleanedUpBody = cleanUpHTML(body);

  return cleanedUpBody;
};

module.exports = getEntries;
