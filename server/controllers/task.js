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
    response.status(500).json({ error: 'Something went wrong, check the console for error messages.' });
  }

});

module.exports = taskRouter;