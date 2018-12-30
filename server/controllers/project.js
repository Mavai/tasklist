const projectRouter = require('express').Router();
const Project = require('../models/Project');

projectRouter.get('/', async (request, response) => {
  const projects = await Project.find({}).populate('taskboards');

  response.json(projects.map(Project.format));
});

projectRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    if (body.name === undefined) {
      return response.status(400).json({ error: 'Name missing' });
    }
    const project = new Project({ ...body });
    await project.save();
    response.status(201).json(Project.format(project));
  } catch (excpetion) {
    console.warn(excpetion.message);
    response
      .status(500)
      .json({ error: 'Something went wrong when creating a project.' });
  }
});

projectRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body;
    if (body.name === undefined) {
      return response.status(400).json({ error: 'Name missing' });
    }
    const project = { ...body };
    const updatedProject = await Project.findOneAndUpdate(
      { _id: request.params.id },
      project,
      { new: true }
    );
    response.status(203).json(Project.format(updatedProject));
  } catch (excpetion) {
    console.warn(excpetion.message);
    response
      .status(500)
      .json({ error: 'Something went wrong when updating a project.' });
  }
});

module.exports = projectRouter;
