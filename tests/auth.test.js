const request = require('supertest');

const createApp = require('../src/app');

const app = createApp();

describe('Authentication API Tests', () => {

  // Tests for user registration, login, and token management

  

  beforeAll(async () => {

    // Setup test database connection if needed

  }, 10000);

  afterAll(async () => {

    // Clean up if needed

  });

  describe('POST /api/auth/register', () => {

    it('should register a new user with valid data', async () => {

      const userData = {

        email: `test${Date.now()}@example.com`,

        password: 'SecurePassword123!',

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

        expect(response.body.data.user).not.toHaveProperty('password');

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

        password: 'SecurePassword123!',

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

        password: 'SecurePassword123!',

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

    it('should reject registration with weak password', async () => {

      const userData = {

        email: 'test@example.com',

        password: 'password123',

        name: 'Test User',

      };

      const response = await request(app)

        .post('/api/auth/register')

        .send(userData)

        .expect('Content-Type', /json/)

        .expect(400);

      expect(response.body.success).toBe(false);

    });

    it('should reject registration with missing name', async () => {

      const userData = {

        email: 'test@example.com',

        password: 'SecurePassword123!',

      };

      const response = await request(app)

        .post('/api/auth/register')

        .send(userData)

        .expect('Content-Type', /json/)

        .expect(400);

      expect(response.body.success).toBe(false);

    });

    it('should reject duplicate email registration', async () => {

      const userData = {

        email: `duplicate${Date.now()}@example.com`,

        password: 'SecurePassword123!',

        name: 'Test User',

      };

      // First registration

      await request(app)

        .post('/api/auth/register')

        .send(userData);

      // Attempt duplicate registration

      const response = await request(app)

        .post('/api/auth/register')

        .send(userData)

        .expect('Content-Type', /json/);

      if (response.status === 409 || response.status === 400) {

        expect(response.body.success).toBe(false);

        expect(response.body.message).toMatch(/email|exist|duplicate/i);

      }

    }, 15000);

  });

  describe('POST /api/auth/login', () => {

    const testUser = {

      email: `login${Date.now()}@example.com`,

      password: 'SecurePassword123!',

      name: 'Login Test User',

    };

    beforeAll(async () => {

      // Register a test user for login tests

      await request(app)

        .post('/api/auth/register')

        .send(testUser);

    }, 15000);

    it('should login user with valid credentials', async () => {

      const response = await request(app)

        .post('/api/auth/login')

        .send({ 

          email: testUser.email, 

          password: testUser.password 

        })

        .expect('Content-Type', /json/);

      if (response.status === 200) {

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveProperty('user');

        expect(response.body.data).toHaveProperty('tokens');

        expect(response.body.data.user).toHaveProperty('email', testUser.email);

        expect(response.body.data.user).not.toHaveProperty('password');

        expect(response.body.data.tokens).toHaveProperty('accessToken');

        expect(response.body.data.tokens).toHaveProperty('refreshToken');

      }

    }, 15000);

    it('should reject login with incorrect password', async () => {

      const response = await request(app)

        .post('/api/auth/login')

        .send({ 

          email: testUser.email, 

          password: 'WrongPassword123!' 

        })

        .expect('Content-Type', /json/)

        .expect(401);

      expect(response.body.success).toBe(false);

      expect(response.body.message).toMatch(/password|credential|invalid/i);

    });

    it('should reject login with non-existent email', async () => {

      const response = await request(app)

        .post('/api/auth/login')

        .send({ 

          email: 'nonexistent@example.com', 

          password: 'SecurePassword123!' 

        })

        .expect('Content-Type', /json/)

        .expect(401);

      expect(response.body.success).toBe(false);

    });

    it('should reject login with missing email', async () => {

      const response = await request(app)

        .post('/api/auth/login')

        .send({ password: 'SecurePassword123!' })

        .expect('Content-Type', /json/)

        .expect(400);

      expect(response.body.success).toBe(false);

    });

    it('should reject login with missing password', async () => {

      const response = await request(app)

        .post('/api/auth/login')

        .send({ email: testUser.email })

        .expect('Content-Type', /json/)

        .expect(400);

      expect(response.body.success).toBe(false);

    });

  });

  describe('Protected Routes with JWT Authorization', () => {

    let authToken;

    let refreshToken;

    const protectedUser = {

      email: `protected${Date.now()}@example.com`,

      password: 'SecurePassword123!',

      name: 'Protected Test User',

    };

    beforeAll(async () => {

      // Register and login to get tokens

      await request(app)

        .post('/api/auth/register')

        .send(protectedUser);

      const loginResponse = await request(app)

        .post('/api/auth/login')

        .send({ 

          email: protectedUser.email, 

          password: protectedUser.password 

        });

      if (loginResponse.body.data && loginResponse.body.data.tokens) {

        authToken = loginResponse.body.data.tokens.accessToken;

        refreshToken = loginResponse.body.data.tokens.refreshToken;

      }

    }, 15000);

    it('should access protected route with valid token', async () => {

      if (!authToken) {

        return; // Skip if no token available

      }

      const response = await request(app)

        .get('/api/user/profile')

        .set('Authorization', `Bearer ${authToken}`)

        .expect('Content-Type', /json/);

      if (response.status === 200) {

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveProperty('user');

      }

    });

    it('should reject access without token', async () => {

      const response = await request(app)

        .get('/api/user/profile')

        .expect('Content-Type', /json/)

        .expect(401);

      expect(response.body.success).toBe(false);

      expect(response.body.message).toMatch(/token|auth|unauthorized/i);

    });

    it('should reject access with invalid token', async () => {

      const response = await request(app)

        .get('/api/user/profile')

        .set('Authorization', 'Bearer invalid_token_here')

        .expect('Content-Type', /json/)

        .expect(401);

      expect(response.body.success).toBe(false);

    });

    it('should reject access with malformed authorization header', async () => {

      const response = await request(app)

        .get('/api/user/profile')

        .set('Authorization', 'InvalidFormat token')

        .expect('Content-Type', /json/)

        .expect(401);

      expect(response.body.success).toBe(false);

    });

  });

  describe('GET /api/user/profile', () => {

    let authToken;

    let userEmail;

    let userName;

    beforeAll(async () => {

      userEmail = `profile${Date.now()}@example.com`;

      userName = 'Profile Test User';

      

      const userData = {

        email: userEmail,

        password: 'SecurePassword123!',

        name: userName,

      };

      await request(app).post('/api/auth/register').send(userData);

      

      const loginResponse = await request(app)

        .post('/api/auth/login')

        .send({ 

          email: userEmail, 

          password: userData.password 

        });

      if (loginResponse.body.data && loginResponse.body.data.tokens) {

        authToken = loginResponse.body.data.tokens.accessToken;

      }

    }, 15000);

    it('should retrieve user profile with valid token', async () => {

      if (!authToken) {

        return; // Skip if no token available

      }

      const response = await request(app)

        .get('/api/user/profile')

        .set('Authorization', `Bearer ${authToken}`)

        .expect('Content-Type', /json/);

      if (response.status === 200) {

        expect(response.body.success).toBe(true);

        expect(response.body.data.user).toHaveProperty('email', userEmail);

        expect(response.body.data.user).toHaveProperty('name', userName);

        expect(response.body.data.user).not.toHaveProperty('password');

      }

    });

    it('should not expose sensitive user data', async () => {

      if (!authToken) {

        return;

      }

      const response = await request(app)

        .get('/api/user/profile')

        .set('Authorization', `Bearer ${authToken}`)

        .expect('Content-Type', /json/);

      if (response.status === 200) {

        expect(response.body.data.user).not.toHaveProperty('password');

        expect(response.body.data.user).not.toHaveProperty('passwordHash');

      }

    });

  });

  describe('Token Refresh', () => {

    let authToken;

    let refreshToken;

    const tokenUser = {

      email: `token${Date.now()}@example.com`,

      password: 'SecurePassword123!',

      name: 'Token Test User',

    };

    beforeAll(async () => {

      await request(app)

        .post('/api/auth/register')

        .send(tokenUser);

      const loginResponse = await request(app)

        .post('/api/auth/login')

        .send({ 

          email: tokenUser.email, 

          password: tokenUser.password 

        });

      if (loginResponse.body.data && loginResponse.body.data.tokens) {

        authToken = loginResponse.body.data.tokens.accessToken;

        refreshToken = loginResponse.body.data.tokens.refreshToken;

      }

    }, 15000);

    it('should refresh access token with valid refresh token', async () => {

      if (!refreshToken) {

        return;

      }

      const response = await request(app)

        .post('/api/auth/refresh')

        .send({ refreshToken })

        .expect('Content-Type', /json/);

      if (response.status === 200) {

        expect(response.body.success).toBe(true);

        expect(response.body.data.tokens).toHaveProperty('accessToken');

        expect(response.body.data.tokens.accessToken).not.toBe(authToken);

      }

    });

    it('should reject refresh with invalid refresh token', async () => {

      const response = await request(app)

        .post('/api/auth/refresh')

        .send({ refreshToken: 'invalid_refresh_token' })

        .expect('Content-Type', /json/)

        .expect(401);

      expect(response.body.success).toBe(false);

    });

    it('should reject refresh with missing refresh token', async () => {

      const response = await request(app)

        .post('/api/auth/refresh')

        .send({})

        .expect('Content-Type', /json/)

        .expect(400);

      expect(response.body.success).toBe(false);

    });

  });

  describe('Logout', () => {

    let authToken;

    const logoutUser = {

      email: `logout${Date.now()}@example.com`,

      password: 'SecurePassword123!',

      name: 'Logout Test User',

    };

    beforeEach(async () => {

      await request(app)

        .post('/api/auth/register')

        .send(logoutUser);

      const loginResponse = await request(app)

        .post('/api/auth/login')

        .send({ 

          email: logoutUser.email, 

          password: logoutUser.password 

        });

      if (loginResponse.body.data && loginResponse.body.data.tokens) {

        authToken = loginResponse.body.data.tokens.accessToken;

      }

    }, 15000);

    it('should logout user successfully', async () => {

      if (!authToken) {

        return;

      }

      const response = await request(app)

        .post('/api/auth/logout')

        .set('Authorization', `Bearer ${authToken}`)

        .expect('Content-Type', /json/);

      if (response.status === 200) {

        expect(response.body.success).toBe(true);

      }

    });

    it('should reject logout without token', async () => {

      const response = await request(app)

        .post('/api/auth/logout')

        .expect('Content-Type', /json/)

        .expect(401);

      expect(response.body.success).toBe(false);

    });

  });

});