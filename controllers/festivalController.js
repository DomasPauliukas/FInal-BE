const Festival = require("../models/festivalModel")

async function getAllFestivals(req, res) { 
  try {
    const festivals = await Festival.find()
    res.send(festivals)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function getFestivalById(req, res) {
  try {
    const { id } = req.params
    const festival = await Festival.findById(id).populate('artists')
    if (!festival) {
      return res.status(404).send({ message: "Festival not found" })
    }
    res.send(festival)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function createFestival(req, res) {
  try {
    const festival = new Festival(req.body)
    await festival.save()

    res.send(festival)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

async function updateFestival(req, res) {
  try {
    const { id } = req.params
    const updatedFestival = await Festival.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    )
    if (!updatedFestival) {
      return res.status(404).send({ message: "Festival not found" })
    } 

    res.send(updatedFestival)
    }catch (error) {
    res.status(500).send({ message: error.message })
    }
}

async function deleteFestival(req, res) {
  try {
    const { id } = req.params
    const deletedFestival = await Festival.findByIdAndDelete(id)
    if (!deletedFestival) {
      return res.status(404).send({ message: "Festival not found" })
    }
    res.send(deletedFestival)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function addArtistToFestival(req, res) {
  try {
    const { id } = req.params
    const { artistId } = req.body

    const festival = await Festival.findById(id)

    if (!festival) {
      return res.status(404).send({ message: "Festival not found" })
    }

    festival.artists.push(...artistId)
    await festival.save()
    res.send(festival)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  getAllFestivals,
  getFestivalById,
  createFestival,
  updateFestival,
  deleteFestival,
  addArtistToFestival
}

