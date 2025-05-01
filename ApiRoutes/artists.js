const express = require('express')
const { getAllArtists, getArtistById, deleteArtist, updateArtist, createArtist } = require('../controllers/artistController')
const authMiddleware = require('../middlewares/authmiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const router = express.Router()

router.get('/', getAllArtists)
router.get('/:id', getArtistById)

router.post('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), createArtist)
router.put('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), updateArtist)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteArtist)


module.exports = router