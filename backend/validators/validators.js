const UserModel = require("./../models/User");
const registerValidator = async ({ username }) => {
  let result = await UserModel.find({ username: username });
  return Boolean(result.length);
};

module.exports = { registerValidator };
