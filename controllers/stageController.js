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
    const { id } = req.params
    const deletedStage = await Stage.findByIdAndDelete(id)
    if (!deletedStage) {
      return res.status(404).send({ message: "Stage not found" })
    }
    res.send(deletedStage)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  getAllStages,
  getStageById,
  createStage,
  updateStage,
  deleteStage
}