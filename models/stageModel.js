const mongoose = require('mongoose')

const stageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    festivalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Festival',
        required: true
    }
})

const Stage = mongoose.model('Stage', stageSchema)
module.exports = Stage