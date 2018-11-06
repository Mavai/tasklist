const { app, server } = require('../index');
const supertest = require('supertest');
const api = supertest(app);
const Task = require('../models/Task');
const Project = require('../models/Project');
const mongoose = require('mongoose');
const { nonExistingObjectId, objectsInDb } = require('./testHelpers');

const initialTasks = [
  {
    name: 'Test task 1',
    description: 'Test description 1'
  },
  {
    name: 'Test task 1',
    description: 'Test description 1'
  }
];

describe('When there are initially tasks saved', async () => {
  let projectId = mongoose.Types.ObjectId();
  beforeAll(async () => {
    await Task.deleteMany({});
    const taskObjects = initialTasks.map(
      task => new Task({ ...task, project: projectId }));
    const promiseArray = taskObjects.map(task => task.save());
    await Promise.all(promiseArray);
  });

  test('Tasks are returned as json', async () => {
    await api
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('GET /api/tasks works', async () => {
    const response = await api
      .get('/api/tasks');
    expect(response.body.length).toBe(initialTasks.length);
  });

  test('GET /api/tasks/project/:projectId works with valid id', async () => {
    const response = await api
      .get(`/api/tasks/project/${projectId}`);
    expect(response.body.length).toBe(initialTasks.length);
  });

  test('GET /api/tasks/project/:projectId works with invalid id', async () => {
    const invalidId = await nonExistingObjectId(Project);
    const response = await api
      .get(`/api/tasks/project/${invalidId}`);
    expect(response.body.length).toBe(0);
  });

  describe('Addition of a new task', async () => {

    test('A valid task can be added', async () => {
      const newTask = {
        name: 'Test name',
        description: 'Test description'
      };
      await api
        .post('/api/tasks')
        .send(newTask)
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8');
      const response = await api.get('/api/tasks');
      expect(response.body.length).toBe(initialTasks.length + 1);
    });

    test('Task without name is not added', async () => {
      const newTask = { description: 'Test description' };
      const initialResponse = await api.get('/api/tasks');
      await api
        .post('/api/tasks')
        .send(newTask)
        .expect(400);
      const response = await api.get('/api/tasks');
      expect(response.body.length).toBe(initialResponse.body.length);
    });

    test('Task with invalid status is not added', async () => {
      const newTask = { name: 'Test name', status: 1 };
      const initialResponse = await api.get('/api/tasks');
      await api
        .post('/api/tasks')
        .send(newTask)
        .expect(500);
      const response = await api.get('/api/tasks');
      expect(response.body.length).toBe(initialResponse.body.length);
    });
  });

  describe('Updating an existing task', async () => {
    let newTask;

    beforeAll(async () => {
      newTask = await Task.create({
        name: 'Test name',
        description: 'I will be updated.'
      });
    });

    test('PUT /api/tasks/:id with valid values works', async () => {
      const taskBeforeOperation = await Task.findOne({ _id: newTask._id });
      const response = await api
        .put(`/api/tasks/${newTask.id}`)
        .send({ name: newTask.name, description: 'I have been updated' })
        .expect(203);
      const taskAfterOperation = await Task.findOne({ _id: newTask._id });
      expect(taskBeforeOperation.description).not.toBe(taskAfterOperation.description);
      expect(response.body.description).toBe('I have been updated');
      expect(taskAfterOperation.description).toBe('I have been updated');
    });

    test('PUT /api/tasks/:id with missing values works', async () => {
      await api
        .put(`/api/tasks/${newTask.id}`)
        .send({ description: 'I have been updated' })
        .expect(400);
    });

    test('PUT /api/tasks/:id with invalid id works', async () => {
      await api
        .put(`/api/tasks/${1}`)
        .send({ name: 'Test name' })
        .expect(500);
    });
  });

  describe('Deleting a task', async () => {
    let newTask;

    beforeAll(async () => {
      newTask = await Task.create({
        name: 'Test task',
        description: 'I will be deleted'
      });
    });

    test('DELETE /api/tasks/:id with valid id works', async () => {
      const tasksBeforeOperation = await objectsInDb(Task);
      await api
        .delete(`/api/tasks/${newTask.id}`)
        .expect(204);
      const tasksAfterOperation = await objectsInDb(Task);
      expect(tasksAfterOperation.length).toBe(tasksBeforeOperation.length - 1);
    });

    test('DELETE /api/tasks/:id with non existing id works', async () => {
      const taskId = await nonExistingObjectId(Task);
      const tasksBeforeOperation = await objectsInDb(Task);
      await api
        .delete(`/api/tasks/${taskId}`)
        .expect(204);
      const tasksAfterOperation = await objectsInDb(Task);
      expect(tasksAfterOperation.length).toBe(tasksBeforeOperation.length);
    });

    test('DELETE /api/tasks/:id with invalid id works', async () => {
      await api
        .delete('/api/tasks/1')
        .expect(500);
    });
  });

  afterAll(() => {
    server.close();
  });
});
