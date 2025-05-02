const express = require('express')
const { getAllStages, getStageById, createStage, updateStage, deleteStage, getStagesByFestival } = require('../controllers/stageController')
const authMiddleware = require('../middlewares/authmiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')

const router = express.Router()


router.get('/', getAllStages)
router.get('/:id', getStageById)
router.get('/festival/:festivalId', getStagesByFestival)

router.post('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), createStage)
router.put('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), updateStage)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteStage)



module.exports = router