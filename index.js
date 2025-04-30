const express = require('express')
const process = require('process')
require('dotenv').config()
require('./db.js')

const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())


const festivalRoutes = require('./ApiRoutes/festivals')
const artistRoutes = require('./ApiRoutes/artists')
const scheduleRoutes = require('./ApiRoutes/schedules')
const stageRoutes = require('./ApiRoutes/stages')
const ticketRoutes = require('./ApiRoutes/tickets')
const userRoutes = require('./ApiRoutes/users')


app.use('/api/festivals', festivalRoutes)
app.use('/api/artists', artistRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/stages', stageRoutes)
app.use('/api/tickets', ticketRoutes)
app.use('/api/users', userRoutes)


app.get('/', (req, res) => {
  res.send('Hello World, from BE!')
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))