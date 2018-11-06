const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Project = require('../models/Project');

const initialProjects = [
  {
    name: 'Test Project 1'
  },
  {
    name: 'Test Project 2'
  }
];

describe('When there are initially projects saved', async () => {
  beforeAll(async () => {
    await Project.deleteMany({});
    const projectObjects = initialProjects.map(
      project => new Project(project));
    const promiseArray = projectObjects.map(project => project.save());
    await Promise.all(promiseArray);
  });

  test('Projects are returned as json', async () => {
    await api
      .get('/api/projects')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('GET /api/projects works', async () => {
    const response = await api
      .get('/api/projects');
    expect(response.body.length).toBe(initialProjects.length);
  });

  describe('Updating an existing project', async () => {
    let newProject;

    beforeAll(async () => {
      newProject = await Project.create({
        name: 'Test Project'
      });
    });

    test('PUT /api/projects with valid values works', async () => {
      const projectBeforeOperation = await Project.findOne({ _id: newProject._id });
      const response = await api
        .put(`/api/projects/${newProject.id}`)
        .send({ name: 'Updated name' })
        .expect(203);
      const projectAfterOperation = await Project.findOne({ _id: newProject._id });
      expect(projectBeforeOperation.name).not.toBe(projectAfterOperation.name);
      expect(response.body.name).toBe('Updated name');
      expect(projectAfterOperation.name).toBe('Updated name');
    });

    test('PUT /api/projects/:id with missing values works', async () => {
      await api
        .put(`/api/projects/${newProject.id}`)
        .send({})
        .expect(400);
    });

    test('PUT /api/projects/:id with invalid id works', async () => {
      await api
        .put(`/api/projects/${1}`)
        .send({ name: 'Updated name' })
        .expect(500);
    });
  });

  afterAll(() => {
    server.close();
  });
});