const Schedule = require("../models/scheduleModel")

async function getAllSchedules(req, res) {
  try {
    const schedules = await Schedule.find()
        .populate('stageId')
        .populate('artistId')
        .populate('festivalId')

    res.send(schedules)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function getScheduleById(req, res) {
  try {
    const { id } = req.params
    const schedule = await Schedule.findById(id)
        .populate('stageId')
        .populate('artistId')
        .populate('festivalId')

    if (!schedule) {
      return res.status(404).send({ message: "Schedule not found" })
    }
    res.send(schedule)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function createSchedule(req, res) {
  try {
    const schedule = new Schedule(req.body)
    await schedule.save()

    res.send(schedule)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

async function updateSchedule(req, res) {
  try {
    const { id } = req.params
    const updatedSchedule = await Schedule.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    )
    if (!updatedSchedule) {
      return res.status(404).send({ message: "Schedule not found" })
    } 

    res.send(updatedSchedule)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function deleteSchedule(req, res) {
  try {
    const { id } = req.params
    const deletedSchedule = await Schedule.findByIdAndDelete(id)
    if (!deletedSchedule) {
      return res.status(404).send({ message: "Schedule not found" })
    }
    res.send(deletedSchedule)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function getSchedulesByFestival(req, res) {
  try {
    const { festivalId } = req.params

    const schedules = await Schedule.find({ festivalId })
        .populate('stageId', 'name capacity')
        .populate('artistId', 'name genre')
        .populate('festivalId', 'name')

    if (!schedules) {
      return res.status(404).send({ message: "Schedules not found" })
    }
    res.send(schedules)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedulesByFestival,
}