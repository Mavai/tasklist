const projectRouter = require('express').Router();
const Project = require('../models/Project');

projectRouter.get('/', async (request, response) => {
  const projects = await Project
    .find({});

  response.json(projects.map(Project.format));
});

module.exports = projectRouter;