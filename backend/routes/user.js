const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const Word = require("./../models/Word");
const ObjectId = require("mongoose").Types.ObjectId;
const { SECRET_KEY } = require("../config.js");
router.get("/", async (req, res) => {
  const { lower, upper } = req.query;
  let userID;
  let token = req.headers["authorization"];
  token = token.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    userID = decoded.user.id;
  });
  let user_words = await User.aggregate([
    { $match: { _id: ObjectId(userID) } },
    {
      $project: {
        _id: 0,
        words: {
          $filter: {
            input: "$wordData",
            as: "word",
            cond: { $gte: ["$$word.rank", lower] },
            cond: { $lte: ["$$word.rank", upper] },
          },
        },
      },
    },
  ]);
  let all_words = await Word.find({
    $and: [{ rank: { $gt: lower } }, { rank: { $lte: upper } }],
  });
  let new_array = all_words.map((item) => {
    let status =
      user_words[0].words.find((w) => w.rank == item.rank)?.status || "";
    let ite = {
      word: item.word,
      rank: item.rank,
      meaning: item.meaning,
      status,
    };
    return ite;
  });
  res.json(new_array);
});
router.get("/profile", async (req, res) => {
  let token = req.headers["authorization"];
  token = token.split(" ")[1];
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    userID = decoded.user.id;
    let user = await User.findOne(
      { _id: ObjectId(userID) },
      { _id: 0, username: 1 }
    );
    let user_words = await User.aggregate([
      { $match: { _id: ObjectId(userID) } },
      {
        $project: {
          _id: 0,
          username: 1,
          known_words: {
            $filter: {
              input: "$wordData",

              as: "word",
              cond: { $eq: ["$$word.status", "known"] },
            },
          },
          unknown_words: {
            $filter: {
              input: "$wordData",
              as: "word",
              cond: { $eq: ["$$word.status", "unknown"] },
            },
          },
        },
      },
    ]);
    res.json(user_words[0]);
  });
});
router.get("/login", async (req, res) => {
  let token = req.headers["authorization"];
  token = token.split(" ")[1];
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    userID = decoded.user.id;
    let user = await User.findOne(
      { _id: ObjectId(userID) },
      { _id: 0, username: 1 }
    );
    res.json(user);
  });
});
router.post("/", async (req, res) => {
  const { word, status, rank } = req.body;
  let token = req.headers["authorization"];
  token = token.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    userID = decoded.user.id;
    User.findOneAndUpdate(
      { _id: ObjectId(userID) },
      { $pull: { wordData: { word: word } } }
    )
      .then((res) =>
        User.findOneAndUpdate(
          { _id: ObjectId(userID) },
          { $push: { wordData: { word, rank, status } } }
        )
      )
      .then((ress) => {
        return res.json("done");
      });
  });
});
router.get("/delete", (req, res) => {
  let token = req.headers["authorization"];
  token = token.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    userID = decoded.user.id;
    User.findOneAndDelete({ _id: ObjectId(userID) }).then((r) =>
      res.send("done")
    );
  });
});
module.exports = router;
