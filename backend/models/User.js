const { Schema, model } = require('mongoose')
const userSchema = new Schema({
  username: String,
  password: String,
  confirmPassword: String
})

module.exports = model('user', userSchema)