const express = require('express')
const { register, login, getAllUsers, getUserById, updateUser, deleteUser, getUserFestivals } = require('../controllers/userController')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

router.get('/my-festivals', getUserFestivals)

module.exports = router
