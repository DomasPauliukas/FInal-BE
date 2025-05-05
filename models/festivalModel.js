const mongoose = require('mongoose')

const festivalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    vipPrice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    stages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stage'
    }]
})

const Festival = mongoose.model('Festival', festivalSchema)
module.exports = Festival