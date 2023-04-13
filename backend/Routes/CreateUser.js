const express = require("express");
const router = express.Router();
const user = require("../models/user");
const { body, validationResult } = require('express-validator');

router.post(
  "/createuser",
  // username must be an email
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  // password must be at least 5 chars long
  body("password", "Incorrect Password").isLength({ min: 5 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await user.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;