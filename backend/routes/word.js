const express = require("express");
const router = express.Router();
const Word = require("./../models/Word");

router.get("/list", (req, res) => {
  let { lower, upper } = req.query;
  Word.find({
    $and: [{ rank: { $gt: lower } }, { rank: { $lte: upper } }],
  }).then((words) => {
    res.json(words);
  });
});
module.exports = router;
