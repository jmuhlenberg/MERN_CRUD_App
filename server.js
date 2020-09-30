const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MONGODBURI = process.env.MONGODBURI



// Database
mongoose.connect(MONGODBURI, {
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
  console.log('mongo connected: ', MONGODBURI)
)

mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))



// Middleware
app.use(express.json())
app.use(express.static('public'))



// Routes
app.get('/', (req, res) => {
  res.send('Hello World')
})



// Listener
app.listen(PORT, () => {
console.log('listening to ...', PORT);
} )
