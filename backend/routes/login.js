const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send({
      message: "no_user_found",
    });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "wrong_password",
    });
  }
  const payload = {
    user: {
      id: user.id,
    },
  };
  jwt.sign(payload, SECRET_KEY, (err, token) => {
    if (err) {
      throw err;
    }
    res.status(200).json({
      token,
    });
  });
});
module.exports = router;
