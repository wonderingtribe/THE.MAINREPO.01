/**
 * Protected Routes Tests
 * Tests that project routes require authentication
 */

const request = require('supertest');
const createApp = require('../src/app');

describe('Protected Routes Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('Project Routes Protection', () => {
    it('should require authentication for GET /api/projects', async () => {
      const response = await request(app)
        .get('/api/projects')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('token');
    });

    it('should require authentication for POST /api/projects', async () => {
      const projectData = {
        name: 'Test Project',
        description: 'Test Description',
      };

      const response = await request(app)
        .post('/api/projects')
        .send(projectData)
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('token');
    });

    it('should require authentication for GET /api/projects/:id', async () => {
      const response = await request(app)
        .get('/api/projects/123')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should require authentication for PUT /api/projects/:id', async () => {
      const response = await request(app)
        .put('/api/projects/123')
        .send({ name: 'Updated Name' })
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should require authentication for DELETE /api/projects/:id', async () => {
      const response = await request(app)
        .delete('/api/projects/123')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should require authentication for POST /api/projects/:id/publish', async () => {
      const response = await request(app)
        .post('/api/projects/123/publish')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should reject requests with invalid token format', async () => {
      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', 'InvalidFormat token123')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should reject requests with malformed Bearer token', async () => {
      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', 'Bearer')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should reject requests with invalid JWT token', async () => {
      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', 'Bearer invalid.jwt.token')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('token');
    });
  });
});
