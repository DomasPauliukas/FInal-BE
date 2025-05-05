const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    ticketType: {
        type: String,
        enum: ['VIP', 'Regular'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    purchaseAt: {
        type: Date,
        default: Date.now
    },
    festivalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Festival',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)
module.exports = Ticket