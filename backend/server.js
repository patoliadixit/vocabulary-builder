const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const { MONGOURI } = require('./config')
const Word = require('./models/Word')
const wordRouter = require('./routes/word')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')

const app = express()
app.use(cors())
app.use(bodyParser())
mongoose.connect(MONGOURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected")
  })

app.get('/', (req, res) => {
  res.send('hiii')
})

app.use('/api/word/', wordRouter)
app.use('/api/register/', registerRouter)
app.use('/api/login/', loginRouter)

app.listen(process.env.WEBSITES_PORT || 3000, () => {
  console.log("connected to port 3001")
})