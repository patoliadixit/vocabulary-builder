const express = require('express')
const { registerValidator } = require('../validators/validators')
const UserModel = require('../models/User')
const bcryptjs = require('bcryptjs')
const router = express.Router()

router.post("/", async (req, res) => {
  console.log(req.body)
  let result = await registerValidator(req.body)
  if (!result) {
    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(req.body.password, salt)
    let user = new UserModel({
      username: req.body.username,
      password
    })
    user.save()
      .then(res.json("done"))
      .catch(err => res.json(err))
  } else {
    res.json("user exists")
  }
})
module.exports = router