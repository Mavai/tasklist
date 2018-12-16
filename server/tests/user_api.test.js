const User = require('../models/User');
const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const { objectsInDb } = require('./testHelpers');

describe('When there is initially one user in the db', async () => {
  beforeEach(async () => {
    await User.remove({});
    const user = new User({ username: 'root', password: 'sekret' });
    await user.save();
  });

  test('POST /api/users succeeds with a fresh username', async () => {
    const user = {
      username: 'test',
      name: 'Test User',
      password: 'aaaaa'
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8');

    const usersAfterOperation = await objectsInDb(User);
    expect(usersAfterOperation).toHaveLength(2);
  });

  test('POST /api/users fails if username is already taken', async () => {
    const user = {
      username: 'root',
      name: 'Test User',
      password: 'aaaaa'
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(422);
    expect(response.body).toEqual({ errors: ['username must be unique.'] });

    const usersAfterOperation = await objectsInDb(User);
    expect(usersAfterOperation).toHaveLength(1);
  });

  afterAll(() => {
    server.close();
  });
});
