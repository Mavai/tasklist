const { app, server } = require('../index');
const supertest = require('supertest');
const api = supertest(app);
const Taskboard = require('../models/Taskboard');
const { objectsInDb } = require('./testHelpers');

describe('When there are initially tasks saved', async () => {
  let newTaskboard;
  beforeEach(async () => {
    await Taskboard.remove({});
    const taskboard = {
      name: 'Test taskboard',
      layout: {
        '1': ['1', '2'],
        '2': ['3', '4']
      }
    };
    newTaskboard = await Taskboard.create(taskboard);
  });

  test('Taskboards are returned as json', async () => {
    await api
      .get('/api/taskboards')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('GET /api/tasakboards works', async () => {
    const response = await api.get('/api/taskboards');
    expect(response.body.length).toBe(1);
  });

  test('GET /api/taskboards/:id works with valid id', async () => {
    const response = await api.get(`/api/taskboards/${newTaskboard._id}`);
    expect(response.body.id).toEqual(String(newTaskboard._id));
    expect(response.body.layout).toEqual(newTaskboard.layout);
  });

  test('GET /api/taskboards/:id works with invalid', async () => {
    await api.get('/api/taskboards/1').expect(500);
  });

  describe('Addition of a new taskboard', async () => {
    test('A valid taskboard can be added', async () => {
      const taskboard = {
        name: 'New taskboard',
        layout: {
          '1': ['1', '2'],
          '2': ['3', '4']
        }
      };
      await api
        .post('/api/tasks')
        .send(taskboard)
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8');
      const response = await api.get('/api/taskboards');
      expect(response.body.length).toBe(1);
    });
  });

  describe('Updating an existing taskboard', async () => {
    beforeEach(async () => {
      await Taskboard.remove({});
      const taskboard = {
        name: 'Test taskboard',
        layout: {
          '1': ['1', '2'],
          '2': ['3', '4']
        }
      };
      newTaskboard = await Taskboard.create(taskboard);
    });

    test('PUT /api/taskboards/:id with valid values works', async () => {
      const taskboardBeforeOperation = await Taskboard.findOne({
        _id: newTaskboard._id
      });
      const response = await api
        .put(`/api/taskboards/${newTaskboard._id}`)
        .send({ layout: newTaskboard.layout, name: 'Updated taskboard' })
        .expect(203);
      const taskboardAfterOperation = await Taskboard.findOne({
        _id: newTaskboard._id
      });
      expect(taskboardBeforeOperation.name).not.toEqual(
        taskboardAfterOperation.name
      );
      expect(response.body.name).toEqual('Updated taskboard');
      expect(taskboardAfterOperation.name).toEqual('Updated taskboard');
    });

    test('PUT /api/taskboards/:id with invalid id works', async () => {
      await api
        .put(`/api/taskboards/${1}`)
        .send({ name: 'Test name' })
        .expect(500);
    });
  });

  describe('Deleting a taskboard', async () => {
    beforeEach(async () => {
      await Taskboard.remove({});
      const taskboard = {
        name: 'Test taskboard',
        layout: {
          '1': ['1', '2'],
          '2': ['3', '4']
        }
      };
      newTaskboard = await Taskboard.create(taskboard);
    });
    test('DELETE /api/taskboards/:id with valid id works', async () => {
      await api.delete(`/api/taskboards/${newTaskboard.id}`).expect(204);
      const tasksAfterOperation = await objectsInDb(Taskboard);
      expect(tasksAfterOperation.length).toBe(0);
    });

    test('DELETE /api/taskboards/:id with invalid id works', async () => {
      await api.delete('/api/taskboards/1').expect(500);
    });
  });

  afterAll(() => {
    server.close();
  });
});
