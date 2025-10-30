/**
 * Hybrid Project API Tests
 * Tests the dual-database approach (PostgreSQL + MongoDB)
 */

const request = require('supertest');
const createApp = require('../src/app');
const { connectPostgreSQL, disconnectPostgreSQL, getModels } = require('../src/database/postgresql');
const { connectMongoDB, disconnectMongoDB } = require('../src/database/mongodb');
const ProjectContent = require('../src/models/ProjectContent');

describe('Hybrid Project API Tests', () => {
  let app;
  let models;

  beforeAll(async () => {
    // Connect to databases
    try {
      await connectPostgreSQL();
      await connectMongoDB();
      models = getModels();

      // Clean up test data
      await models.Project.destroy({ where: {}, force: true });
      await models.User.destroy({ where: {}, force: true });
      await ProjectContent.deleteMany({});

      // Create a test user
      await models.User.create({
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed_password',
      });

      app = createApp();
    } catch (error) {
      console.error('Test setup error:', error);
      throw error;
    }
  }, 30000);

  afterAll(async () => {
    // Clean up test data
    try {
      if (models && models.Project) {
        await models.Project.destroy({ where: {}, force: true });
      }
      if (models && models.User) {
        await models.User.destroy({ where: {}, force: true });
      }
      await ProjectContent.deleteMany({});

      await disconnectPostgreSQL();
      await disconnectMongoDB();
    } catch (error) {
      console.error('Test cleanup error:', error);
    }
  }, 30000);

  describe('POST /api/hybrid-projects', () => {
    it('should create a new project with metadata in PostgreSQL and content in MongoDB', async () => {
      const projectData = {
        name: 'Test Project',
        project_type: 'React',
        global_settings: {
          theme: 'dark',
          font: 'Roboto',
        },
        pages: [
          {
            name: 'Home',
            slug: '/',
            components: [
              {
                id: 'comp_1',
                type: 'HeroSection',
                props: {
                  title: 'Welcome!',
                },
              },
            ],
          },
        ],
      };

      const response = await request(app)
        .post('/api/hybrid-projects')
        .send(projectData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Project created successfully');
      expect(response.body.data).toHaveProperty('project_id');
      expect(response.body.data).toHaveProperty('name', 'Test Project');
      expect(response.body.data).toHaveProperty('project_type', 'React');

      // Verify data in PostgreSQL
      const projectId = response.body.data.project_id;
      const pgProject = await models.Project.findByPk(projectId);
      expect(pgProject).not.toBeNull();
      expect(pgProject.name).toBe('Test Project');
      expect(pgProject.mongo_document_id).toBeDefined();

      // Verify data in MongoDB
      const mongoContent = await ProjectContent.findById(pgProject.mongo_document_id);
      expect(mongoContent).not.toBeNull();
      expect(mongoContent.global_settings.theme).toBe('dark');
      expect(mongoContent.pages).toHaveLength(1);
      expect(mongoContent.pages[0].name).toBe('Home');
    }, 10000);

    it('should validate required fields', async () => {
      const invalidData = {
        project_type: 'React',
      };

      const response = await request(app)
        .post('/api/hybrid-projects')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Validation error');
    });

    it('should use default values when optional fields are not provided', async () => {
      const minimalData = {
        name: 'Minimal Project',
      };

      const response = await request(app)
        .post('/api/hybrid-projects')
        .send(minimalData)
        .expect(201);

      expect(response.body.data.project_type).toBe('React');
    });
  });

  describe('GET /api/hybrid-projects/:id', () => {
    let testProjectId;

    beforeAll(async () => {
      // Create a test project
      const response = await request(app).post('/api/hybrid-projects').send({
        name: 'Get Test Project',
        project_type: 'Next.js',
        global_settings: {
          theme: 'light',
          font: 'Inter',
        },
        pages: [
          {
            name: 'About',
            slug: '/about',
            components: [],
          },
        ],
      });
      testProjectId = response.body.data.project_id;
    });

    it('should retrieve project with combined metadata and content', async () => {
      const response = await request(app)
        .get(`/api/hybrid-projects/${testProjectId}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id', testProjectId);
      expect(response.body.data).toHaveProperty('name', 'Get Test Project');
      expect(response.body.data).toHaveProperty('project_type', 'Next.js');
      expect(response.body.data).toHaveProperty('global_settings');
      expect(response.body.data.global_settings.theme).toBe('light');
      expect(response.body.data).toHaveProperty('pages');
      expect(response.body.data.pages).toHaveLength(1);
    });

    it('should return 404 for non-existent project', async () => {
      const response = await request(app).get('/api/hybrid-projects/99999').expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Project not found');
    });
  });

  describe('PUT /api/hybrid-projects/:id', () => {
    let testProjectId;

    beforeAll(async () => {
      // Create a test project
      const response = await request(app).post('/api/hybrid-projects').send({
        name: 'Update Test Project',
        project_type: 'React',
      });
      testProjectId = response.body.data.project_id;
    });

    it('should update project metadata in PostgreSQL', async () => {
      const updateData = {
        name: 'Updated Project Name',
        project_type: 'Vue',
      };

      const response = await request(app)
        .put(`/api/hybrid-projects/${testProjectId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Project updated successfully');

      // Verify update in PostgreSQL
      const pgProject = await models.Project.findByPk(testProjectId);
      expect(pgProject.name).toBe('Updated Project Name');
      expect(pgProject.project_type).toBe('Vue');
    });

    it('should update project content in MongoDB', async () => {
      const updateData = {
        global_settings: {
          theme: 'custom',
          font: 'Montserrat',
        },
        pages: [
          {
            name: 'New Page',
            slug: '/new',
            components: [
              {
                id: 'new_comp',
                type: 'Button',
                props: { label: 'Click me' },
              },
            ],
          },
        ],
      };

      await request(app).put(`/api/hybrid-projects/${testProjectId}`).send(updateData).expect(200);

      // Verify update in MongoDB
      const pgProject = await models.Project.findByPk(testProjectId);
      const mongoContent = await ProjectContent.findById(pgProject.mongo_document_id);
      expect(mongoContent.global_settings.theme).toBe('custom');
      expect(mongoContent.pages).toHaveLength(1);
      expect(mongoContent.pages[0].name).toBe('New Page');
    });

    it('should return 404 when updating non-existent project', async () => {
      const response = await request(app)
        .put('/api/hybrid-projects/99999')
        .send({ name: 'Test' })
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
    });
  });
});
