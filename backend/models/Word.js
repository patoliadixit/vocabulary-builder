const { model, Schema } = require('mongoose')

const word = new Schema({
  word: String,
  rank: Number,
  meaning: String
})
module.exports = model('word', word)