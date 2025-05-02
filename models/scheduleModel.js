const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    startTime:{
        type: String,
        required: true
    },
    endTime:{
        type: String,
        required: true
    },
    stageId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stage',
        required: true
    },
    artistId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    festivalId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Festival',
        required: true
    }
})

const Schedule = mongoose.model('Schedule', scheduleSchema)
module.exports = Schedule