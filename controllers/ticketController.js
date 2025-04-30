const Ticket = require("../models/ticketModel")


async function getAllTickets(req, res) {
  try {
    const tickets = await Ticket.find()
        .populate('festivalId')
        .populate('userId')

    res.send(tickets)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function getTicketById(req, res) {
  try {
    const { id } = req.params
    const ticket = await Ticket.findById(id)
        .populate('festivalId')
        .populate('userId')

    if (!ticket) {
      return res.status(404).send({ message: "Ticket not found" })
    }
    res.send(ticket)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function createTicket(req, res) {
  try {
    const ticket = new Ticket(req.body)
    await ticket.save()

    res.send(ticket)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

async function updateTicket(req, res) {
  try {
    const { id } = req.params
    const updatedTicket = await Ticket.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    )
    if (!updatedTicket) {
      return res.status(404).send({ message: "Ticket not found" })
    } 

    res.send(updatedTicket)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function deleteTicket(req, res) {
  try {
    const { id } = req.params
    const deletedTicket = await Ticket.findByIdAndDelete(id)
    if (!deletedTicket) {
      return res.status(404).send({ message: "Ticket not found" })
    }
    res.send(deletedTicket)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
}