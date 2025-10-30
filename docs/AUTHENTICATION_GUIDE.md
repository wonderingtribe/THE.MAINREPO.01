# Authentication System - Usage Guide

This guide demonstrates how to use the authentication system in your components.

## Table of Contents
- [Backend Setup](#backend-setup)
- [Frontend Usage](#frontend-usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Backend Setup

The backend authentication is already configured and includes:

### Available Endpoints

#### Public Endpoints (No Authentication Required)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT tokens
- `POST /api/auth/refresh-token` - Refresh access token

#### Protected Endpoints (Require Authentication)
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/api-key` - Generate API key for user

### Protected Project Routes
All project routes require authentication:
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get specific project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/publish` - Publish project

## Frontend Usage

### 1. Using the UserContext

```typescript
'use client';

import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';

export default function LoginForm() {
  const { login, register, user, isAuthenticated, logout } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.message || 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await register(email, password, name);
    
    if (!result.success) {
      setError(result.message || 'Registration failed');
    }
  };

  if (isAuthenticated && user) {
    return (
      <div>
        <h2>Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      
      {error && <p className="error">{error}</p>}
      
      <h3>Or Register</h3>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 8 characters)"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
```

### 2. Using the AppContext for Projects

```typescript
'use client';

import { useApp } from '@/contexts/AppContext';
import { useUser } from '@/contexts/UserContext';
import { useEffect } from 'react';

export default function ProjectsPage() {
  const { isAuthenticated } = useUser();
  const { projects, loadProjects, createProject, loading } = useApp();

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated, loadProjects]);

  const handleCreateProject = async () => {
    await createProject('New Project', 'Description');
  };

  if (!isAuthenticated) {
    return <p>Please login to view projects</p>;
  }

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h1>My Projects</h1>
      <button onClick={handleCreateProject}>Create New Project</button>
      
      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Direct Service Usage (Advanced)

```typescript
import * as authService from '@/services/authService';
import * as projectService from '@/services/projectService';

// Login
const loginResult = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

if (loginResult.success) {
  console.log('Logged in:', loginResult.data?.user);
  
  // Tokens are automatically stored and will be used in subsequent requests
  
  // Create a project
  const projectResult = await projectService.createProject({
    name: 'My Project',
    description: 'Built with AI-WONDERLAND'
  });
  
  if (projectResult.success) {
    console.log('Project created:', projectResult.data?.project);
  }
}
```

## API Endpoints

### Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "jwt_refresh_token"
    }
  }
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "jwt_refresh_token"
    }
  }
}
```

### Create Project (Protected)
```bash
POST /api/projects
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "My Website",
  "description": "A website built with AI-WONDERLAND"
}
```

## Testing

The authentication system includes comprehensive tests:

### Run Authentication Tests
```bash
npm test -- tests/auth.test.js
```

### Run Protected Routes Tests
```bash
npm test -- tests/protected-routes.test.js
```

### Run All Tests
```bash
npm test
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with 10 rounds
2. **JWT Tokens**: 
   - Access tokens expire in 7 days
   - Refresh tokens expire in 30 days
3. **Protected Routes**: All project routes require valid JWT
4. **Input Validation**: Using Joi for robust validation
5. **Rate Limiting**: API endpoints are rate-limited
6. **CORS**: Configured to accept requests from allowed origins
7. **Helmet**: Security headers configured
8. **Token Storage**: Currently using localStorage (consider HttpOnly cookies for production to mitigate XSS attacks)

## Environment Variables

Required in `.env`:
```env
# JWT Configuration
# IMPORTANT: Generate strong random secrets using: openssl rand -base64 64
# NEVER use these example values in production!
JWT_SECRET=CHANGE_THIS_TO_A_CRYPTOGRAPHICALLY_SECURE_RANDOM_STRING_IN_PRODUCTION
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=CHANGE_THIS_TO_A_DIFFERENT_CRYPTOGRAPHICALLY_SECURE_RANDOM_STRING_IN_PRODUCTION
JWT_REFRESH_EXPIRES_IN=30d

# Database (MongoDB)
# Database name matches the application
MONGODB_URI=mongodb://localhost:27017/ai_wonderland

# API URL (Frontend)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Security Note**: To generate secure secrets, use:
```bash
# Linux/Mac
openssl rand -base64 64

# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

## Common Issues

### Token Invalid/Expired
If you get a 401 error with "Invalid or expired token":
1. Check if the token is still valid (not expired)
2. Try refreshing the token using `/api/auth/refresh-token`
3. Re-login if refresh token is also expired

### CORS Errors
Make sure `CORS_ORIGIN` in your `.env` matches your frontend URL.

### Database Connection
The backend requires MongoDB to be running. Start MongoDB:
```bash
mongod --dbpath /path/to/data
```
