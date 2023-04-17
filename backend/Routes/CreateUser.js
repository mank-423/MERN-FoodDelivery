const express = require("express");
const router = express.Router();
const user = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "MyNameismahyankKumar"

//Signup
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

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await user.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//Login
router.post(
  "/loginuser",
  [
    // username must be an email
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let email = req.body.email;

    try {
      let userData = await user.findOne({ email });

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try login with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password);

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try login with correct credentials" });
      }

      const data = {
        user: {
          id: userData.id
        }
      }
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken});
    
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
