const express = require('express')
const { getTicketById, createTicket, updateTicket, deleteTicket, getAllTickets } = require('../controllers/ticketController')
const authMiddleware = require('../middlewares/authmiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const router = express.Router()

router.get('/', getAllTickets)
router.get('/:id', getTicketById)

router.post('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), createTicket)
router.put('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), updateTicket)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteTicket)

module.exports = router