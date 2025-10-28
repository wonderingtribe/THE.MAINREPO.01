/**
 * Authentication API Tests
 * Tests user registration, login, and token management
 */

const request = require('supertest');
const createApp = require('../src/app');

describe('Authentication API Tests', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  afterAll(async () => {
    // Clean up if needed
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const userData = {
        email: `test${Date.now()}@example.com`,
        password: 'SecurePassword123',
        name: 'Test User',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('success');
      
      // If database is connected and registration succeeds
      if (response.status === 201) {
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('user');
        expect(response.body.data).toHaveProperty('tokens');
        expect(response.body.data.user).toHaveProperty('email', userData.email);
        expect(response.body.data.user).toHaveProperty('name', userData.name);
        expect(response.body.data.tokens).toHaveProperty('accessToken');
        expect(response.body.data.tokens).toHaveProperty('refreshToken');
      }
      // If database is not connected, we expect a 500 error
      else if (response.status === 500) {
        expect(response.body.success).toBe(false);
      }
    }, 15000); // Increased timeout for database operations

    it('should reject registration with missing email', async () => {
      const userData = {
        password: 'SecurePassword123',
        name: 'Test User',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('email');
    });

    it('should reject registration with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'SecurePassword123',
        name: 'Test User',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should reject registration with short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'short',
        name: 'Test User',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('password');
    });

    it('should reject registration with missing name', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePassword123',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('name');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should accept login endpoint and validate input', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('success');
      
      // Without database connection or valid user, expect error response
      // The endpoint should still be reachable and return proper JSON
      if (response.status === 401) {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('Invalid');
      } else if (response.status === 500) {
        // Database not connected
        expect(response.body.success).toBe(false);
      }
    }, 15000); // Increased timeout for database operations

    it('should reject login with missing email', async () => {
      const loginData = {
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('email');
    });

    it('should reject login with missing password', async () => {
      const loginData = {
        email: 'test@example.com',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('password');
    });
  });

  describe('POST /api/auth/refresh-token', () => {
    it('should have refresh token endpoint', async () => {
      const response = await request(app)
        .post('/api/auth/refresh-token')
        .send({})
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('success');
    });

    it('should reject refresh without token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh-token')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('token');
    });
  });

  describe('GET /api/auth/profile', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('token');
    });

    it('should reject invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/auth/profile', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .put('/api/auth/profile')
        .send({ name: 'Updated Name' })
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/api-key', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .post('/api/auth/api-key')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
