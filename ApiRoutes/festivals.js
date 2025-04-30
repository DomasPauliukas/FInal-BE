const express = require('express')
const { getAllFestivals, getFestivalById, createFestival, updateFestival, deleteFestival, addArtistToFestival } = require('../controllers/festivalController')


const router = express.Router()

router.get('/', getAllFestivals)
router.get('/:id', getFestivalById)
router.post('/', createFestival)
router.put('/:id', updateFestival)
router.delete('/:id', deleteFestival)

router.put('/:id/artists',addArtistToFestival)

module.exports = router