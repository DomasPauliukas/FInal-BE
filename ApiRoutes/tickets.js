const express = require('express')
const { getTicketById, createTicket, updateTicket, deleteTicket, getAllTickets } = require('../controllers/ticketController')
const router = express.Router()

router.get('/', getAllTickets)
router.get('/:id', getTicketById)
router.post('/', createTicket)
router.put('/:id', updateTicket)
router.delete('/:id', deleteTicket)

module.exports = router