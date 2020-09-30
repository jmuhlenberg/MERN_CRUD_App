const express = require('express')
const song = express.Router()
const Song = require('../models/song.js')
const songSeed = require('../models/song_seed.js')

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

song.put('/:id', (req, res) => {
  Song.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedSongs) => {
      if (err) {
        res.send(err)
      } else {
        Song.find({}, (err, foundSongs) => {
          res.json(foundSongs)
        })
      }
    })
})

song.delete('/:id', (req, res) => {
  Song.findByIdAndRemove(req.params.id, (err, deletedSong) => {
    Song.find({}, (err, foundSong) => {
      res.json(foundSong)
    })
  })
})

song.get('/seed', (req, res) => {
  Song.insertMany(songSeed, (err, manySongs) => {
    res.redirect('/')
  })
})
module.exports = song
