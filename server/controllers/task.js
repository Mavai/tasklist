const taskRouter = require('express').Router();
const Task = require('../models/Task');

taskRouter.get('/', async (request, response) => {
  const tasks = await Task
    .find({});

  response.json(tasks.map(Task.format));
});

taskRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    const task = new Task({ ...body });
    const savedTask = await task.save();
    response.status(201).json(Task.format(savedTask));
  } catch(excpetion) {
    console.warn(excpetion);
    response.status(500).json({ error: 'Something went wrong when creating a task' });
  }

});

taskRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body;
    const task = { ...body };
    const updatedTask = await Task
      .findByIdAndUpdate(request.params.id, task, { new: true });
    response.status(203).json(Task.format(updatedTask));
  } catch (excpetion) {
    console.warn(excpetion);
    response.status(500).json({ error: 'Something went wrong when updating a task.' });
  }
});

taskRouter.delete('/:id', async (request, response) => {
  try {
    const deletedTask = await Task.findByIdAndRemove(request.params.id);
    response.status(204).json(Task.format(deletedTask));
  } catch (excpetion) {
    console.warn(excpetion);
    response.status(500).json({ error: 'Something went wrong when deletinig a task' });
  }
});

module.exports = taskRouter;