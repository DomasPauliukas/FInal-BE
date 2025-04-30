const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const process = require('process')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const ROLES = require('../config/roles')

const register = async (req, res) => {
    const { username, email, password, name, surname, age } = req.body

    if (!username || !email || !password || !name || !surname || !age) {
        return res.status(400).send({ message: 'All fields are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).send({ message: 'Email already exists' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name,
            surname,
            age,
            // role: req.body.role || ROLES.USER
        })
        await newUser.save()

        const token = jwt.sign(
            {
                UserId: newUser._id,
                email: newUser.email,
                role: newUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(201).send({ 
            message: 'User registered successfully',
            token: token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                name: newUser.name,
                surname: newUser.surname,
                age: newUser.age,
                role: newUser.role,
            }
        })
    } catch (error) {
        res.status(500).send({ message: 'Server error', error })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' })
        }

        const token = jwt.sign(
            {
                UserId: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).send({
            message: 'User logged in successfully',
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                surname: user.surname,
                age: user.age,
                role: user.role,
            }
        })
    } catch (error) {
        res.status(500).send({ message: 'Server error', error })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.user
    const { username, name, surname, age } = req.body

    if (!username || !name || !surname || !age) {
        return res.status(400).send({ message: 'All fields are required' })
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                username,
                name,
                surname,
                age,
            },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' })
        }

        res.status(200).send({
            message: 'User updated successfully',
            user: updatedUser
        })
    } catch (error) {
        res.status(500).send({ message: 'Server error', error })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({ message: 'Server error', error })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({ message: 'Server error', error })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const currentUserId = req.user.id

    try {
        if (id === currentUserId) {
            return res.status(400).send({ message: 'You cannot delete your own account' })
        }

        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found' })
        }

        res.status(200).send({
            message: 'User deleted successfully',
            user: deletedUser
        })
    } catch (error) {
        res.status(500).send({ message: 'Server error', error })
    }
}

const getUserFestivals = async (req, res) => {
    const userId = req.user.id

    try {
        const userTickets = await Ticket.find({ userId })
            .populate('festivalId')
        
        if (!userTickets || userTickets.length === 0) {
            return res.status(404).send({ message: 'No tickets found for this user' })
        }

        const festivals = userTickets.map(ticket => ticket.festivalId)
        res.status(200).send( {festivals} )
    } catch (error) {
        res.status(500).send({ message: 'Server error', error })
    }
}


module.exports = {
    register,
    login,
    updateUser,
    getAllUsers,
    deleteUser,
    getUserFestivals,
    getUserById
}