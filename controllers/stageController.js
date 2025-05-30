const Festival = require("../models/festivalModel")
const Schedule = require("../models/scheduleModel")
const Stage = require("../models/stageModel")


async function getAllStages(req, res) {
  try {
    const stages = await Stage.find()
        .populate('festivalId')

    res.send(stages)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function getStageById(req, res) {
  try {
    const { id } = req.params
    const stage = await Stage.findById(id)
        .populate('festivalId')

    if (!stage) {
      return res.status(404).send({ message: "Stage not found" })
    }
    res.send(stage)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function createStage(req, res) {
  try {
    const stage = new Stage(req.body)
    await stage.save()

    res.send(stage)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

async function updateStage(req, res) {
  try {
    const { id } = req.params
    const updatedStage = await Stage.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    )
    if (!updatedStage) {
      return res.status(404).send({ message: "Stage not found" })
    } 

    res.send(updatedStage)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function deleteStage(req, res) {
  try {
    const stageId = req.params.id

    const stage = await Stage.findById(stageId)
    if (!stage) {
      return res.status(404).send({ message: 'Stage not found' })
    }

    const festivalId = stage.festivalId

    const relatedSchedules = await Schedule.find({ stageId })
    const artistIdsToRemove = relatedSchedules.map(s => s.artistId)

    await Schedule.deleteMany({ stageId })

    await Stage.findByIdAndDelete(stageId)

    await Festival.findByIdAndUpdate(festivalId, {
      $pull: { stages: stageId }
    })

    await Festival.findByIdAndUpdate(festivalId, {
      $pull: { artists: { $in: artistIdsToRemove } }
    })
    
    res.send({ message: 'Stage deleted successfully' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function getStagesByFestival(req, res) {
  try {
    const { festivalId } = req.params
    const stages = await Stage.find({ festivalId })
        .populate('festivalId')

    if (!stages) {
      return res.status(404).send({ message: "Stages not found" })
    }
    res.send(stages)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  getAllStages,
  getStageById,
  createStage,
  updateStage,
  deleteStage,
  getStagesByFestival
}