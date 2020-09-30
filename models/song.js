const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  artist: {type: String, require: true},
  song: {type: String, require: true},
  rating: {type: Number, require: true, min: 0, max: 10},
  iframe: {type: Object, default: "https://www.youtube.com/embed/AzV77KFsLn4"},
  description: String
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
