const express = require("express");
require("dotenv").config();

const logger = require("./util/logger");

const app = express();
const router = express.Router();

const port = process.env.PORT || 80;

app.use(express.json());

const EntriesRoute = require("./routes/Entries");
const ScheduleRoute = require("./routes/Schedule");

app.get("/", (req, res) => {
  res.send("That's illegal");
});

app.use("/api", router);
router.use("/entries", EntriesRoute);
router.use("/schedule", ScheduleRoute);

app.listen(port, () => {
  logger.info(`App is running on port ${port}.`);
});
