/**
 * Example Usage of Hybrid Project API
 * This file demonstrates how to use the dual-database project API
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api/hybrid-projects';

// Example: Create a new project
async function createProject() {
  try {
    const projectData = {
      name: 'My First Project',
      project_type: 'React',
      global_settings: {
        theme: 'dark',
        font: 'Inter',
      },
      pages: [
        {
          name: 'Home',
          slug: '/',
          components: [
            {
              id: 'hero_1',
              type: 'HeroSection',
              props: {
                title: 'Welcome to My Website!',
                subtitle: 'Built with AI Wonder',
                buttonText: 'Get Started',
              },
            },
            {
              id: 'features_1',
              type: 'FeatureGrid',
              props: {
                items: [
                  { title: 'Feature 1', description: 'Amazing feature' },
                  { title: 'Feature 2', description: 'Another great feature' },
                ],
              },
            },
          ],
        },
        {
          name: 'About',
          slug: '/about',
          components: [
            {
              id: 'text_1',
              type: 'TextBlock',
              props: {
                content: 'About our company...',
              },
            },
          ],
        },
      ],
    };

    const response = await axios.post(API_BASE_URL, projectData);
    console.log('Project created:', response.data);
    return response.data.data.project_id;
  } catch (error) {
    console.error('Error creating project:', error.response?.data || error.message);
  }
}

// Example: Get a project
async function getProject(projectId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${projectId}`);
    console.log('Project retrieved:', JSON.stringify(response.data, null, 2));
    return response.data.data;
  } catch (error) {
    console.error('Error getting project:', error.response?.data || error.message);
  }
}

// Example: Update a project
async function updateProject(projectId) {
  try {
    const updateData = {
      name: 'My Updated Project',
      global_settings: {
        theme: 'light',
        font: 'Roboto',
      },
      pages: [
        {
          name: 'Home',
          slug: '/',
          components: [
            {
              id: 'hero_1',
              type: 'HeroSection',
              props: {
                title: 'Updated Title!',
                subtitle: 'Now with more features',
              },
            },
          ],
        },
      ],
    };

    const response = await axios.put(`${API_BASE_URL}/${projectId}`, updateData);
    console.log('Project updated:', response.data);
  } catch (error) {
    console.error('Error updating project:', error.response?.data || error.message);
  }
}

// Run the examples
async function runExamples() {
  console.log('=== Hybrid Project API Examples ===\n');

  // 1. Create a project
  console.log('1. Creating a new project...');
  const projectId = await createProject();

  if (projectId) {
    // 2. Get the project
    console.log('\n2. Retrieving the project...');
    await getProject(projectId);

    // 3. Update the project
    console.log('\n3. Updating the project...');
    await updateProject(projectId);

    // 4. Get the updated project
    console.log('\n4. Retrieving the updated project...');
    await getProject(projectId);
  }

  console.log('\n=== Examples completed ===');
}

// Export functions for use in other files
module.exports = {
  createProject,
  getProject,
  updateProject,
  runExamples,
};

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples().catch(console.error);
}
