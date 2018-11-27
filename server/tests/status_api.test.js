const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Status = require('../models/Status');

const initialStatuses = [
  {
    name: 'Test Status 1'
  },
  {
    name: 'Test Status 2'
  }
];

describe('When there are initiallystatuses saved', async () => {
  beforeAll(async () => {
    await Status.deleteMany({});
    const statusObjects = initialStatuses.map(status => new Status(status));
    const promiseArray = statusObjects.map(status => status.save());
    await Promise.all(promiseArray);
  });

  test('Statuses are returned as json', async () => {
    await api
      .get('/api/statuses')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('GET /api/statuses works', async () => {
    const response = await api.get('/api/statuses');
    expect(response.body.length).toBe(initialStatuses.length);
  });

  afterAll(() => {
    server.close();
  });
});
