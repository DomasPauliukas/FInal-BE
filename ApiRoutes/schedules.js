const express = require('express')
const { getAllSchedules, getScheduleById, createSchedule, updateSchedule, deleteSchedule, getSchedulesByFestival } = require('../controllers/scheduleController')
const authMiddleware = require('../middlewares/authMiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')

const router = express.Router()

router.get('/', getAllSchedules)
router.get('/:id', getScheduleById)

router.post('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), createSchedule)
router.put('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), updateSchedule)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteSchedule)
router.get('/festival/:festivalId', getSchedulesByFestival)

module.exports = router