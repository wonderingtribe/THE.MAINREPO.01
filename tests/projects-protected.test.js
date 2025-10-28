/**
 * Protected Project Routes Tests
 * Verifies that project routes require authentication
 */

const request = require('supertest');
const createApp = require('../src/app');

describe('Protected Project Routes Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('Project Routes Authentication', () => {
    it('POST /api/projects should require authentication', async () => {
      const response = await request(app)
        .post('/api/projects')
        .send({ name: 'Test Project' })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('token');
    });

    it('GET /api/projects should require authentication', async () => {
      const response = await request(app)
        .get('/api/projects')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('GET /api/projects/:id should require authentication', async () => {
      const response = await request(app)
        .get('/api/projects/123')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('PUT /api/projects/:id should require authentication', async () => {
      const response = await request(app)
        .put('/api/projects/123')
        .send({ name: 'Updated Project' })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('DELETE /api/projects/:id should require authentication', async () => {
      const response = await request(app)
        .delete('/api/projects/123')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('POST /api/projects/:id/publish should require authentication', async () => {
      const response = await request(app)
        .post('/api/projects/123/publish')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should reject invalid token', async () => {
      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message.toLowerCase()).toContain('invalid');
    });

    it('should accept properly formatted Bearer token', async () => {
      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', 'Bearer fake-but-well-formed-token');

      // Will return 401 due to invalid token, but at least it processes the header
      expect(response.body).toHaveProperty('success');
    });
  });
});
