const express = require('express')
const { getAllStages, getStageById, createStage, updateStage, deleteStage } = require('../controllers/stageController')

const router = express.Router()


router.get('/', getAllStages)
router.get('/:id', getStageById)
router.post('/', createStage)
router.put('/:id', updateStage)
router.delete('/:id', deleteStage)

module.exports = router