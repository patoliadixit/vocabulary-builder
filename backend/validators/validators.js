const UserModel = require("./../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerValidator = async ({ username, password, confirmPassword }) => {
  let result = await UserModel.find({ username: username });
  return Boolean(result.length);
};

module.exports = { registerValidator };
