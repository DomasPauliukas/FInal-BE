const Artist = require("../models/artistModel")
const Festival = require("../models/festivalModel")
const Schedule = require("../models/scheduleModel")


async function getAllArtists(req, res) {
  try {
    const artists = await Artist.find()
    res.send(artists)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function getArtistById(req, res) {
  try {
    const { id } = req.params
    const artist = await Artist.findById(id)
    if (!artist) {
      return res.status(404).send({ message: "Artist not found" })
    }
    const festivals = await Festival.find({ artists: id })
    res.send({ artist, festivals })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function createArtist(req, res) {
  try {
    const artist = new Artist(req.body)
    await artist.save()

    res.send(artist)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}   

async function updateArtist(req, res) {
  try {
    const { id } = req.params
    const updatedArtist = await Artist.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    )
    if (!updatedArtist) {
      return res.status(404).send({ message: "Artist not found" })
    } 

    res.send(updatedArtist)
    }catch (error) {
    res.status(500).send({ message: error.message })
    }
}

async function deleteArtist(req, res) {
  try {
    const { id } = req.params
    const deletedArtist = await Artist.findByIdAndDelete(id)
    if (!deletedArtist) {
      return res.status(404).send({ message: "Artist not found" })
    }

    await Schedule.deleteMany({ artistId: id })

    await Festival.updateMany(
      { artists: id },
      { $pull: { artists: id } }
    )

    res.send(deletedArtist)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist
}