const express = require('express')
const song = express.Router()
const Song = require('../models/song.js')

song.get('/', (req, res) => {
  Song.find({}, (err, foundSongs) => {
    res.json(foundSongs)
  })
})

song.post('/', (req, res) => {
  Song.create(req.body, (err, createdSongs) => {
     Song.find({}, (err, foundSongs) => {
       res.json(foundSongs)
     })
   })
})



module.exports = song
