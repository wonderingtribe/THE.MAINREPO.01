/**
 * Hybrid Project Controller
 * Implements dual-database approach:
 * - PostgreSQL for project metadata (users and projects tables)
 * - MongoDB for flexible project content (JSON structure)
 */

const { getModels } = require('../../database/postgresql');
const ProjectContent = require('../../models/ProjectContent');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

/**
 * Validation schemas
 */
const createProjectSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  project_type: Joi.string()
    .valid('React', 'HTML', 'Next.js', 'Vue', 'Angular')
    .default('React'),
  global_settings: Joi.object({
    theme: Joi.string().default('light'),
    font: Joi.string().default('Inter'),
  }).optional(),
  pages: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        slug: Joi.string().required(),
        components: Joi.array()
          .items(
            Joi.object({
              id: Joi.string().required(),
              type: Joi.string().required(),
              props: Joi.object().optional(),
            })
          )
          .default([]),
      })
    )
    .default([]),
});

const updateProjectSchema = Joi.object({
  name: Joi.string().min(2).max(255).optional(),
  project_type: Joi.string()
    .valid('React', 'HTML', 'Next.js', 'Vue', 'Angular')
    .optional(),
  global_settings: Joi.object({
    theme: Joi.string(),
    font: Joi.string(),
  }).optional(),
  pages: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        slug: Joi.string().required(),
        components: Joi.array()
          .items(
            Joi.object({
              id: Joi.string().required(),
              type: Joi.string().required(),
              props: Joi.object().optional(),
            })
          )
          .optional(),
      })
    )
    .optional(),
});

/**
 * Create new project
 * POST /api/projects
 */
const createProject = async (req, res) => {
  try {
    // Validate input
    const { error, value } = createProjectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { name, project_type, global_settings, pages } = value;

    // Get user ID from authenticated user (assuming auth middleware sets req.user)
    const userId = req.user?.id || req.user?._id || 1; // Fallback to 1 for testing

    // Generate unique MongoDB document ID
    const mongoDocumentId = uuidv4();

    // Create project content in MongoDB
    const projectContent = new ProjectContent({
      _id: mongoDocumentId,
      global_settings: global_settings || {
        theme: 'light',
        font: 'Inter',
      },
      pages: pages || [],
    });

    await projectContent.save();

    // Create project metadata in PostgreSQL
    const models = getModels();
    const project = await models.Project.create({
      user_id: userId,
      name,
      project_type: project_type || 'React',
      mongo_document_id: mongoDocumentId,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project_id: project.id,
        name: project.name,
        project_type: project.project_type,
        created_at: project.created_at,
      },
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message,
    });
  }
};

/**
 * Get project by ID
 * GET /api/projects/:id
 */
const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id || 1;

    // Fetch project metadata from PostgreSQL
    const models = getModels();
    const project = await models.Project.findOne({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Fetch project content from MongoDB
    const projectContent = await ProjectContent.findById(project.mongo_document_id);

    if (!projectContent) {
      return res.status(404).json({
        success: false,
        message: 'Project content not found',
      });
    }

    // Combine metadata and content
    res.json({
      success: true,
      data: {
        id: project.id,
        name: project.name,
        project_type: project.project_type,
        created_at: project.created_at,
        updated_at: project.updated_at,
        global_settings: projectContent.global_settings,
        pages: projectContent.pages,
      },
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project',
      error: error.message,
    });
  }
};

/**
 * Update project
 * PUT /api/projects/:id
 */
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id || 1;

    // Validate input
    const { error, value } = updateProjectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { name, project_type, global_settings, pages } = value;

    // Find project in PostgreSQL
    const models = getModels();
    const project = await models.Project.findOne({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Update metadata in PostgreSQL
    const updateData = {};
    if (name) updateData.name = name;
    if (project_type) updateData.project_type = project_type;
    updateData.updated_at = new Date();

    await project.update(updateData);

    // Update content in MongoDB
    const contentUpdate = {};
    if (global_settings) contentUpdate.global_settings = global_settings;
    if (pages) contentUpdate.pages = pages;

    if (Object.keys(contentUpdate).length > 0) {
      await ProjectContent.findByIdAndUpdate(project.mongo_document_id, contentUpdate, {
        new: true,
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProject,
  updateProject,
};
