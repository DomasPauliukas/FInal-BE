const mongoose = require('mongoose')
require('dotenv').config()
const process = require('process')

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error))

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB disconnected')
    process.exit(0)
  })
})