const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI



// Database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// Error / success
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)

mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)

mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.json())
app.use(express.static('public'))


const songController = require('./controllers/songs_controller.js')
app.use('/songs', songController)



// Listener
app.listen(PORT, () => {
console.log('listening to ...', PORT);
} )
