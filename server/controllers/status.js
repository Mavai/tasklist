const statusRouter = require('express').Router();
const Status = require('../models/Status');

const initialStatuses = [
  {
    name: 'Not started',
    color: 'gray'
  },
  {
    name: 'Started',
    color: 'red'
  },
  {
    name: 'In review',
    color: 'cyan'
  },
  { name: 'Ready', color: 'lightGreen' }
];

statusRouter.get('/', async (request, response) => {
  let statuses = await Status.find({});

  if (statuses.length !== 4) {
    await Status.remove({});
    const promisearray = initialStatuses.map(status => Status.create(status));
    await Promise.all(promisearray);
    statuses = await Status.find({});
  }
  response.json(statuses.map(Status.format));
});

module.exports = statusRouter;
