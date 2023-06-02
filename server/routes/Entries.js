const express = require("express");
const { query, validationResult } = require("express-validator");
const getEntries = require("../requests/getEntries");

const router = express.Router();

router.get(
  "/",
  [query("netwerk_username").notEmpty(), query("netwerk_password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const credentials = {
      username: req.query.netwerk_username,
      password: req.query.netwerk_password,
    };

    try {
      const entries = await getEntries(credentials);

      const pinned = { message: ":)" };

      res.json({ entries, pinned });
    } catch (err) {
      if (err.name == "AuthenticationError")
        return res
          .status(401)
          .json({ error: err.name, message: "User is unauthorized!" });

      return res.status(500).json({
        error: "InternalServerError",
        message: "Internal server error!",
      });
    }
  }
);

module.exports = router;
