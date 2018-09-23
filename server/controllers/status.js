const statusRouter = require('express').Router();
const Status = require('../models/Status');

statusRouter.get('/', async (request, response) => {
  const statuses = await Status
    .find({});

  response.json(statuses.map(Status.format));
});

module.exports = statusRouter;