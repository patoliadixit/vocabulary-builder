const { Schema, model } = require('mongoose')
const wordSchema = new Schema({
  word: String,
  rank: Number,
  status: String
})
const userSchema = new Schema({
  username: String,
  password: String,
  wordData: [wordSchema]
})

module.exports = model('user', userSchema)