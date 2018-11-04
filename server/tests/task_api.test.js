const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Task = require('../models/Task');
const Project = require('../models/Project');

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
let project = null;

const nonExistingId = async () => {
  const task = new Task();
  await task.save();
  await task.remove();
  return task._id.toString();
};

const tasksInDb = async () => {
  const tasks = Task.find({});
  return tasks.map(task => task.format);
};

describe('When there are initially tasks saved', async() => {
  beforeAll(async () => {
    await Task.remove({});
    project = await Project.create({ name: 'Test Project' });
    const taskObjects = initialTasks.map(
      task => new Task({ ...task, project: project.id }));
    const promiseArray = taskObjects.map(task => task.save());
    await Promise.all(promiseArray);

  });

  test('Tasks are returned as json', async () => {
    await api
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('All tasks are returned', async () => {
    const response = await api
      .get('/api/tasks');
    expect(response.body.length).toBe(initialTasks.length);
  });

  test('Tasks by project are returned as json', async () => {
    await api
      .get(`/api/tasks/project/${project.id}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('Tasks by project are returned with valid id', async () => {
    const response = await api
      .get(`/api/tasks/project/${project._id}`);
    expect(response.body.length).toBe(initialTasks.length);
  });

  test('Tasks by project are not returned with invalid id', async () => {
    const invalidId = await nonExistingId();
    const response = await api
      .get(`/api/tasks/project/${invalidId}`);
    expect(response.body.length).toBe(0);
  });

  afterAll(() => {
    server.close();
  });
});