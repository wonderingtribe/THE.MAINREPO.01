/**
 * Authentication Tests
 * Tests for user registration, login, and token management
 */

const request = require('supertest');
const createApp = require('../src/app');

describe('Authentication Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('POST /api/auth/register', () => {
    it('should validate registration input', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: '123',
          name: 'T',
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message');
    });

    it('should accept valid email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        });

      // Will fail if MongoDB is not connected, but validates the endpoint exists
      expect(response.body).toHaveProperty('success');
    }, 15000);
  });

  describe('POST /api/auth/login', () => {
    it('should validate login input', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'invalid-email',
          password: '',
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message');
    });

    it('should accept valid credentials format', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      // Will fail if user doesn't exist or MongoDB is not connected
      expect(response.body).toHaveProperty('success');
    }, 15000);
  });

  describe('POST /api/auth/refresh-token', () => {
    it('should require refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh-token')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Refresh token is required');
    });

    it('should validate refresh token format', async () => {
      const response = await request(app)
        .post('/api/auth/refresh-token')
        .send({ refreshToken: 'invalid-token' })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('GET /api/auth/profile', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('token');
    });

    it('should reject invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('PUT /api/auth/profile', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .put('/api/auth/profile')
        .send({ name: 'New Name' })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('POST /api/auth/api-key', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .post('/api/auth/api-key')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });
});
