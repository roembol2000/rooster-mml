const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../db");
const logger = require("../util/logger");

const router = express.Router();

router.post(
  "/",
  [body("username").notEmpty(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const credentials = {
      username: req.body.username,
      password: req.body.password,
    };

    const passwordHash = await bcrypt.hash(
      credentials.password,
      Number(process.env.HASH_ROUNDS)
    );

    console.log(passwordHash);

    let userQuery;

    try {
      userQuery = await db.query(
        "SELECT id,password_hash FROM users WHERE username = $1",
        [credentials.username]
      );
    } catch (err) {
      logger.error(err);
    }

    if (!userQuery.rows[0]) {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid credentials" }] });
    }

    const match = await bcrypt.compare(
      credentials.password,
      userQuery.rows[0].password_hash
    );

    if (!match)
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid credentials" }] });

    const token = jwt.sign({ id: userQuery.rows[0].id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.json({ message: "Access granted", token });
  }
);

module.exports = router;
