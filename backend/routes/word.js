const express = require("express");
const router = express.Router();
const Word = require("./../models/Word");

router.get("/", (req, res) => {
  res.send("what is up");
});
router.get("/u/list", (req, res) => {
  let { lower, upper } = req.query;
  Word.find({
    $and: [{ rank: { $gt: lower } }, { rank: { $lte: upper } }],
  }).then((words) => res.json(words));
});
router.get("/list", (req, res) => {
  let { lower, upper } = req.query;
  Word.find({
    $and: [{ rank: { $gt: lower } }, { rank: { $lte: upper } }],
  }).then((words) => {
    res.json(words);
  });
});
router.get("/:word", (req, res) => {
  Word.find({ word: req.params.word }).then((w) => res.json(w));
});
module.exports = router;
