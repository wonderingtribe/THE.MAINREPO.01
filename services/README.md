# Authentication and Project Services

This directory contains the frontend API services for authentication and project management.

## Services

### authService.ts

Handles user authentication, registration, and token management.

#### Features
- User registration
- User login
- Token storage (localStorage)
- Token refresh
- Profile management
- API key generation
- Logout

#### Usage Example

```typescript
import * as authService from '@/services/authService';

// Register a new user
const result = await authService.register({
  email: 'user@example.com',
  password: 'SecurePassword123',
  name: 'John Doe'
});

if (result.success) {
  // User registered and tokens stored automatically
  console.log('User registered:', result.data?.user);
}

// Login
const loginResult = await authService.login({
  email: 'user@example.com',
  password: 'SecurePassword123'
});

if (loginResult.success) {
  // Tokens stored automatically
  console.log('User logged in:', loginResult.data?.user);
}

// Get profile
const profile = await authService.getProfile();
if (profile.success) {
  console.log('User profile:', profile.data?.user);
}

// Logout
authService.logout(); // Clears tokens from localStorage
```

### projectService.ts

Handles project-related API calls with authentication.

#### Features
- Create project
- Get all projects
- Get single project
- Update project
- Delete project
- Publish project

#### Usage Example

```typescript
import * as projectService from '@/services/projectService';

// Create a new project
const result = await projectService.createProject({
  name: 'My Website',
  description: 'A website built with AI-WONDERLAND'
});

if (result.success) {
  console.log('Project created:', result.data?.project);
}

// Get all projects
const projects = await projectService.getProjects();
if (projects.success) {
  console.log('Projects:', projects.data?.projects);
}

// Update a project
const updated = await projectService.updateProject('project-id', {
  name: 'Updated Name',
  description: 'Updated description'
});

// Delete a project
const deleted = await projectService.deleteProject('project-id');

// Publish a project
const published = await projectService.publishProject('project-id');
```

## Token Management

Tokens are automatically stored in localStorage when you login or register:
- `accessToken` - API access token (7 days default, shorter than refresh token)
- `refreshToken` - Long-lived token for refreshing access tokens (30 days default)

The services automatically include the access token in the Authorization header:
```
Authorization: Bearer <accessToken>
```

## Environment Variables

Set the API URL in your `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## React Context Integration

These services are integrated into the React contexts:

### UserContext
```typescript
import { useUser } from '@/contexts/UserContext';

function MyComponent() {
  const { user, login, register, logout, isAuthenticated, loading } = useUser();
  
  // Use the context methods
}
```

### AppContext
```typescript
import { useApp } from '@/contexts/AppContext';

function MyComponent() {
  const { 
    projects, 
    currentProject, 
    createProject, 
    updateProject, 
    deleteProject,
    loadProjects,
    loading 
  } = useApp();
  
  // Use the context methods
}
```

## Error Handling

All service methods return a response object with a `success` boolean:

```typescript
const result = await authService.login({ email, password });

if (result.success) {
  // Success - data is available in result.data
  console.log(result.data);
} else {
  // Error - message is available in result.message
  console.error(result.message);
}
```

## Security Considerations

- **IMPORTANT**: Tokens are currently stored in localStorage. For production applications, consider using HttpOnly cookies with secure and SameSite flags to prevent XSS attacks. This requires backend cookie handling implementation.
- Always use HTTPS in production
- The backend validates all tokens using JWT
- Passwords are hashed with bcrypt on the backend
- Input validation is performed on both frontend and backend
