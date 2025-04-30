const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    ticketType: {
        type: String,
        enum: ['VIP', 'Regular'],
        required: true
    },
    days: {
        type: String,
        enum: ['1-day', '2-day', 'Full-Pass'],
        required: true
    },
    price: {
        type: Number,
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