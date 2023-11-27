const express = require("express");
const { query, validationResult } = require("express-validator");

const getEntries = require("../requests/getEntries");
const auth = require("../middlewares/auth");
const logger = require("../util/logger");

const router = express.Router();

router.get(
  "/",
  [
    auth,
    query("netwerk_username").notEmpty(),
    query("netwerk_password").notEmpty(),
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

    try {
      const entries = await getEntries(netwerkCredentials);

      const pinned = { message: ":)" };

      res.json({ entries, pinned });
    } catch (err) {
      if (err.name == "AuthenticationError")
        return res
          .status(401)
          .json({ error: err.name, message: "User is unauthorized!" });

      logger.error(err);

      return res.status(500).json({
        error: "InternalServerError",
        message: "Internal server error!",
      });
    }
  }
);

module.exports = router;
