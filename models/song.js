const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  name: {type: String, require: true},
  rating: {type: Number, require: true, min: 0, max: 10},
  link: {type: String, default: 'https://youtu.be/BrnDIRmW5hs'}
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
