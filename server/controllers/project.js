const projectRouter = require('express').Router();
const Project = require('../models/Project');

projectRouter.get('/', async (request, response) => {
  const projects = await Project
    .find({});

  response.json(projects.map(Project.format));
});

projectRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body;
    if (body.name === undefined) {
      return response.status(400).json({ error: 'Name missing' });
    }
    const project = { ...body, test: 'test' };
    const updatedProject = await Project
      .findByIdAndUpdate(request.params.id, project, { new: true });
    response.status(203).json(Project.format(updatedProject));
  } catch (excpetion) {
    console.warn(excpetion);
    response.status(500).json({ error: 'Something went wrong when updating a project.' });
  }
});

module.exports = projectRouter;