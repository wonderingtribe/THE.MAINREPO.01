# Hybrid Project API Documentation

## Overview

The Hybrid Project API implements a dual-database approach for managing user projects:

- **PostgreSQL**: Stores user accounts and project metadata (structured data)
- **MongoDB**: Stores flexible project content (JSON structure for builder state)

This architecture provides the benefits of both relational and document databases:
- Fast, consistent queries for user/project relationships (PostgreSQL)
- Flexible, schema-less storage for dynamic project content (MongoDB)

## Database Schema

### PostgreSQL Tables

#### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    project_type VARCHAR(50), -- e.g., 'React', 'HTML', 'Next.js'
    mongo_document_id VARCHAR(255) NOT NULL, -- Reference to MongoDB document
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB Collection

#### project_content Collection
```json
{
  "_id": "uuid-from-postgres",
  "global_settings": {
    "theme": "dark",
    "font": "Inter"
  },
  "pages": [
    {
      "name": "Home",
      "slug": "/",
      "components": [
        {
          "id": "comp_1",
          "type": "HeroSection",
          "props": {
            "title": "Welcome to my website!",
            "subtitle": "Built with AI Wonder."
          }
        }
      ]
    }
  ]
}
```

## API Endpoints

### Create Project
**POST** `/api/hybrid-projects`

Creates a new project with metadata in PostgreSQL and content in MongoDB.

#### Request Body
```json
{
  "name": "My Awesome Project",
  "project_type": "React",
  "global_settings": {
    "theme": "dark",
    "font": "Roboto"
  },
  "pages": [
    {
      "name": "Home",
      "slug": "/",
      "components": [
        {
          "id": "comp_1",
          "type": "HeroSection",
          "props": {
            "title": "Welcome!"
          }
        }
      ]
    }
  ]
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "project_id": 1,
    "name": "My Awesome Project",
    "project_type": "React",
    "created_at": "2025-10-28T16:00:00.000Z"
  }
}
```

### Get Project
**GET** `/api/hybrid-projects/:id`

Retrieves a project with combined metadata and content.

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "My Awesome Project",
    "project_type": "React",
    "created_at": "2025-10-28T16:00:00.000Z",
    "updated_at": "2025-10-28T16:00:00.000Z",
    "global_settings": {
      "theme": "dark",
      "font": "Roboto"
    },
    "pages": [...]
  }
}
```

### Update Project
**PUT** `/api/hybrid-projects/:id`

Updates project metadata and/or content.

#### Request Body
```json
{
  "name": "Updated Project Name",
  "project_type": "Next.js",
  "global_settings": {
    "theme": "light"
  },
  "pages": [...]
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Project updated successfully"
}
```

## Validation

All endpoints use Joi for input validation:

- **name**: String, 2-255 characters, required for creation
- **project_type**: Enum ('React', 'HTML', 'Next.js', 'Vue', 'Angular'), defaults to 'React'
- **global_settings**: Object with optional theme and font properties
- **pages**: Array of page objects with name, slug, and components

## Setup and Migration

### 1. Environment Configuration

Update your `.env` file:
```bash
# Choose database type (we use both for hybrid approach)
DB_TYPE=mongodb

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ai_bilder

# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ai_bilder
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
```

### 2. Run PostgreSQL Migrations

```bash
npm run migrate
```

This will create the `users` and `projects` tables in PostgreSQL.

### 3. Start the Server

```bash
npm run dev
```

The API will connect to both PostgreSQL and MongoDB on startup.

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

Common HTTP status codes:
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **404**: Not Found
- **500**: Internal Server Error

## Security Considerations

- Input validation using Joi
- SQL injection prevention via Sequelize ORM
- NoSQL injection prevention via Mongoose ODM
- Environment variables for sensitive configuration
- Password hashing (when authentication is implemented)
- Rate limiting on API routes

## Future Enhancements

- User authentication and authorization
- Project sharing and permissions
- Version control for project content
- Real-time collaboration
- Project templates and cloning
- Export functionality
