const { Client } = require("pg");

const logger = require("./util/logger");

const client = new Client();

client.connect().then(() => {
  logger.info("Connected to db");
});

module.exports = client;
