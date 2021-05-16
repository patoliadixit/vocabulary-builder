const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const { MONGO_URI } = require('./config')
const Word = require('./models/Word')
const wordRouter = require('./routes/word')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/user')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongoose connected")
  })

app.get('/', (req, res) => {
  res.send('hiii')
})
app.use('/word/', wordRouter)
app.use('/register/', registerRouter)
app.use('/login/', loginRouter)
app.use('/user/', userRouter)
const PORT = 5001
app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`)
})