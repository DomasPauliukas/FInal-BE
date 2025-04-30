const express = require('express')
const process = require('process')
require('dotenv').config()
require('./db.js')

const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
  res.send('Hello World, from BE!')
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))