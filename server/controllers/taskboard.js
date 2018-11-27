const taskboardRouter = require('express').Router();
const Taskboard = require('../models/Taskboard');
const Project = require('../models/Project');

taskboardRouter.get('/', async (request, response) => {
  const tasks = await Taskboard.find({}).populate('project');
  response.json(tasks.map(Taskboard.format));
});

taskboardRouter.get('/:id', async (request, response) => {
  try {
    const taskboard = await Taskboard.findOne({ _id: request.params.id });
    response.json(Taskboard.format(taskboard));
  } catch (excpetion) {
    response
      .status(500)
      .json({ error: 'Something  went wrong when getting single taskboard.' });
  }
});

taskboardRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    const taskboard = new Taskboard({ ...body });
    const savedTask = await taskboard.save();
    const project = await Project.findOne({ _id: body.project });
    project.taskboards = [...(project.taskboards || []), savedTask._id];
    await project.save();
    response.status(201).json(Taskboard.format(savedTask));
  } catch (excpetion) {
    console.warn(excpetion.message);
    response
      .status(500)
      .json({ error: 'Something went wrong when creating a taskboard' });
  }
});

taskboardRouter.put('/:id', async (request, response) => {
  try {
    const taskboard = request.body;
    const updatedTask = await Taskboard.findOneAndUpdate(
      { _id: request.params.id },
      taskboard,
      { new: true }
    );
    response.status(203).json(Taskboard.format(updatedTask));
  } catch (excpetion) {
    console.warn(excpetion.message);
    response
      .status(500)
      .json({ error: 'Something went wrong when updating a task.' });
  }
});

taskboardRouter.delete('/:id', async (request, response) => {
  try {
    const deletedTaskboard = await Taskboard.findOneAndDelete({
      _id: request.params.id
    });
    response.status(204).json(Taskboard.format(deletedTaskboard));
  } catch (excpetion) {
    console.warn(excpetion.message);
    response
      .status(500)
      .json({ error: 'Something went wrong when deletinig a task' });
  }
});

module.exports = taskboardRouter;
