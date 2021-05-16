const express = require('express')
const router = express.Router()
const Word = require('./../models/Word')
router.get('/', (req, res) => {
  let { lower, upper } = req.query
  Word.find({ $and: [{ rank: { $gte: lower } }, { rank: { $lte: upper } }] })
    .then((words) => res.json(words))
})
module.exports = router