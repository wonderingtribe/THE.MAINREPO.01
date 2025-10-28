# API Examples

This directory contains example code demonstrating how to use the AI-WONDERLAND APIs.

## Hybrid Projects API Example

The `hybrid-projects-example.js` file demonstrates how to use the dual-database project API:

### Prerequisites

1. Make sure the API server is running:
   ```bash
   npm run dev
   ```

2. Ensure both PostgreSQL and MongoDB are running and configured in your `.env` file.

3. Run the migration to create PostgreSQL tables:
   ```bash
   npm run migrate
   ```

### Running the Example

```bash
node examples/hybrid-projects-example.js
```

### What the Example Does

1. **Creates a Project**: Creates a new project with pages and components
2. **Retrieves the Project**: Fetches the project to verify it was created
3. **Updates the Project**: Modifies the project name, settings, and content
4. **Retrieves Again**: Fetches the updated project to verify changes

### Using the Functions Programmatically

You can also import and use the example functions in your own code:

```javascript
const { createProject, getProject, updateProject } = require('./examples/hybrid-projects-example');

async function myFunction() {
  // Create a project
  const projectId = await createProject();
  
  // Get the project
  const project = await getProject(projectId);
  
  // Update the project
  await updateProject(projectId);
}
```

### API Endpoints Used

- `POST /api/hybrid-projects` - Create a new project
- `GET /api/hybrid-projects/:id` - Get a project by ID
- `PUT /api/hybrid-projects/:id` - Update a project

See [docs/HYBRID_PROJECTS_API.md](../docs/HYBRID_PROJECTS_API.md) for complete API documentation.
