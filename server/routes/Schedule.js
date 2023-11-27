const express = require("express");
const { query, validationResult } = require("express-validator");

const getSchedule = require("../requests/getSchedule");
const auth = require("../middlewares/auth");
const logger = require("../util/logger");

const router = express.Router();

router.get(
  "/",
  [
    auth,
    query("netwerk_username").notEmpty(),
    query("netwerk_password").notEmpty(),
    query("week").isInt(),
    query("type").isIn(["c", "t", "r", "s"]),
    query("id").isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const netwerkCredentials = {
      username: req.query.netwerk_username,
      password: req.query.netwerk_password,
    };

    const { week, type, id } = req.query;

    try {
      const schedule = await getSchedule(netwerkCredentials, week, type, id);

      res.json({ schedule });
    } catch (err) {
      if (err.name == "AuthenticationError")
        return res
          .status(401)
          .json({ error: err.name, message: "User is unauthorized!" });
      if (err.name == "NotFoundError")
        return res
          .status(404)
          .json({ error: err.name, message: "Schedule not found!" });

      logger.error(err);

      return res.status(500).json({
        error: "InternalServerError",
        message: "Internal server error!",
      });
    }
  }
);

module.exports = router;
