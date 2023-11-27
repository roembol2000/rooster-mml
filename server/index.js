const express = require("express");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());

const EntriesRoute = require("./routes/Entries");
const ScheduleRoute = require("./routes/Schedule");
const LoginRoute = require("./routes/Login");

app.use("/api", router);
router.use("/entries", EntriesRoute);
router.use("/schedule", ScheduleRoute);
router.use("/login", LoginRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
  });
}

app.listen(port, () => {
  logger.info(`App is running on port ${port}. Log level is ${logger.level}.`);
});
