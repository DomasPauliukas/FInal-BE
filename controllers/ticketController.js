const Festival = require("../models/festivalModel")
const Ticket = require("../models/ticketModel")
const User = require("../models/userModel")

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

    const user = await User.findById(deletedTicket.userId)
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }
    user.tickets = user.tickets.filter(ticketId => ticketId.toString() !== id)
    await user.save()
    
    res.send(deletedTicket)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function buyTicket(req, res) {
  try {
    const { ticketType, quantity, festivalId } = req.body
    const userId = req.user.userId

    if (!userId) {
      return res.status(400).send({ message: 'User ID is missing or invalid' })
    }

    const festival = await Festival.findById(festivalId)
    if (!festival) {
      return res.status(404).send({ message: "Festival not found" })
    }

    let price
    if (ticketType === "VIP") {
      price = festival.vipPrice * quantity
    } else if (ticketType === "Regular") {
      price = festival.regularPrice * quantity
    } else {
      return res.status(400).send({ message: "Invalid ticket type" })
    }

    const ticket = new Ticket({
      ticketType,
      price,
      quantity,
      festivalId,
      userId
    })
    await ticket.save()

    await User.findByIdAndUpdate(
      userId,
      { $push: { tickets: ticket._id } },
      { new: true }
    )

    const updatedUser = await User.findById(userId)
        .populate('tickets')

    res.send(updatedUser)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function getTicketsByUserId(req, res) {
  try {
    const userId = req.user.userId
    const tickets = await Ticket.find({ userId })
        .populate('festivalId')
        .populate('userId')

    if (!tickets) {
      return res.status(404).send({ message: "No tickets found for this user" })
    }
    res.send(tickets)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  buyTicket,
  getTicketsByUserId
}