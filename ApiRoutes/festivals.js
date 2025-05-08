const express = require('express')
const { getAllFestivals, getFestivalById, createFestival, updateFestival, deleteFestival, addArtistToFestival } = require('../controllers/festivalController')
const authMiddleware = require('../middlewares/authMiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')


const router = express.Router()

router.get('/', getAllFestivals)
router.get('/:id', getFestivalById)

router.post('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), createFestival)
router.put('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), updateFestival)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteFestival)

router.put('/:id/artists',addArtistToFestival)

module.exports = router