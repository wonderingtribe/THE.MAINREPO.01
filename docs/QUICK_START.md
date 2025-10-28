# Quick Start Guide - Hybrid Projects API

This guide will help you get the hybrid projects API up and running quickly.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- MongoDB 4.4+ installed and running
- Git (for cloning the repository)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Create a `.env` file in the project root (or copy from `.env.example`):

```bash
# Application
NODE_ENV=development
PORT=3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ai_bilder

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ai_bilder
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# JWT (for future authentication)
JWT_SECRET=your-secret-key
```

## Step 3: Create PostgreSQL Database

```bash
# Using psql
psql -U postgres -c "CREATE DATABASE ai_bilder;"
```

Or use your preferred PostgreSQL client (pgAdmin, DBeaver, etc.)

## Step 4: Run Migrations

```bash
npm run migrate
```

This creates the `users` and `projects` tables in PostgreSQL.

## Step 5: Start the Server

```bash
npm run dev
```

You should see:
```
Starting Ai-bilder...
Connected to PostgreSQL database
Connected to MongoDB database
All databases connected successfully
Ai-bilder API server listening on port 3000
```

## Step 6: Test the API

### Option 1: Using the Example Script

```bash
node examples/hybrid-projects-example.js
```

### Option 2: Using cURL

**Create a project:**
```bash
curl -X POST http://localhost:3000/api/hybrid-projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My First Project",
    "project_type": "React",
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
            "id": "hero_1",
            "type": "HeroSection",
            "props": {
              "title": "Welcome!"
            }
          }
        ]
      }
    ]
  }'
```

**Get a project:**
```bash
curl http://localhost:3000/api/hybrid-projects/1
```

**Update a project:**
```bash
curl -X PUT http://localhost:3000/api/hybrid-projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Project Name",
    "global_settings": {
      "theme": "light"
    }
  }'
```

### Option 3: Using Postman or Insomnia

Import the following endpoints:
- POST `http://localhost:3000/api/hybrid-projects`
- GET `http://localhost:3000/api/hybrid-projects/:id`
- PUT `http://localhost:3000/api/hybrid-projects/:id`

## Step 7: Run Tests

```bash
npm test
```

## Troubleshooting

### PostgreSQL Connection Errors

**Error:** `Connection refused`
- Ensure PostgreSQL is running: `sudo systemctl status postgresql`
- Check connection settings in `.env`
- Verify the database exists: `psql -U postgres -l`

### MongoDB Connection Errors

**Error:** `MongoServerError`
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check the connection URI in `.env`
- Verify MongoDB is accessible: `mongo --eval "db.version()"`

### Migration Errors

**Error:** `relation "users" already exists`
- This is normal if you've run migrations before
- The migration script uses `IF NOT EXISTS` to prevent errors

### Port Already in Use

**Error:** `EADDRINUSE: address already in use`
- Change the PORT in `.env` to a different value (e.g., 3001)
- Or stop the process using port 3000

## Next Steps

1. **Read the API Documentation**: See `docs/HYBRID_PROJECTS_API.md`
2. **Review the Examples**: Check `examples/hybrid-projects-example.js`
3. **Explore the Tests**: Look at `tests/hybrid-projects.test.js`
4. **Implement Authentication**: Enable the auth middleware in the routes
5. **Add More Features**: Extend the API with DELETE, LIST, etc.

## Useful Commands

```bash
# Development
npm run dev              # Start server with nodemon
npm run start            # Start server (production)

# Database
npm run migrate          # Run PostgreSQL migrations

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors
npm run format           # Format code with Prettier

# Frontend (if needed)
npm run dev:frontend     # Start Next.js dev server
npm run build            # Build Next.js app
```

## Getting Help

- **API Documentation**: `docs/HYBRID_PROJECTS_API.md`
- **Implementation Details**: `docs/BACKEND_IMPLEMENTATION.md`
- **Examples**: `examples/hybrid-projects-example.js`
- **Issue Tracker**: GitHub Issues

## What's Next?

Now that the backend API is running, you can:
1. Integrate it with the frontend builder
2. Add user authentication
3. Implement project sharing
4. Add real-time collaboration
5. Set up deployment (Docker, cloud hosting)
