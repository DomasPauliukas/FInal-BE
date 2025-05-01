const mongoose = require('mongoose')
const ROLES = require('../config/roles')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9]+$/.test(value)
            },
            message: props => `${props.value} is not a valid username!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    }]
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User