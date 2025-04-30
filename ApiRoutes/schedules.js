const express = require('express')
const { getAllSchedules, getScheduleById, createSchedule, updateSchedule, deleteSchedule, getSchedulesByFestival } = require('../controllers/scheduleController')

const router = express.Router()

router.get('/', getAllSchedules)
router.get('/:id', getScheduleById)
router.post('/', createSchedule)
router.put('/:id', updateSchedule)
router.delete('/:id', deleteSchedule)
router.get('/festival/:festivalId', getSchedulesByFestival)

module.exports = router