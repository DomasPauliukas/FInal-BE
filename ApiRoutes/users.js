const express = require('express')
const { register, login, getAllUsers, getUserById, updateUser, deleteUser, getUserFestivals } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.put('/:id', authMiddleware, updateUser)

router.get('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), getAllUsers)
router.get('/:id', authMiddleware, getUserById)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteUser)

router.get('/my-festivals', authMiddleware, getUserFestivals)

module.exports = router
