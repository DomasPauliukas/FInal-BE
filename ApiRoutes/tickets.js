const express = require('express')
const { getTicketById, createTicket, updateTicket, deleteTicket, getAllTickets, buyTicket, getTicketsByUserId } = require('../controllers/ticketController')
const authMiddleware = require('../middlewares/authmiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const router = express.Router()

router.get('/', getAllTickets)
router.get('/my-tickets', authMiddleware, getTicketsByUserId)

router.get('/:id', getTicketById)

router.post('/buy', authMiddleware, buyTicket)

router.post('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), createTicket)
router.put('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), updateTicket)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteTicket)

module.exports = router