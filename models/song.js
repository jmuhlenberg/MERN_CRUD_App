const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  artist: {type: String, require: true},
  song: {type: String, require: true},
  rating: {type: Number, require: true, min: 0, max: 10},
  iframe: {type: Object, default: '<iframe width="560" height="315" src="https://www.youtube.com/embed/AzV77KFsLn4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'},
  description: String
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
