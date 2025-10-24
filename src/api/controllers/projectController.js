/**
 * Project Controller
 * Handles CRUD operations for user projects
 */

const Project = require('../../models/Project');
const Joi = require('joi');

/**
 * Validate project creation input
 */
const createProjectSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).optional(),
  type: Joi.string().valid('website', 'mobile-app').default('website'),
});

/**
 * Create new project
 */
const createProject = async (req, res) => {
  try {
    const { error, value } = createProjectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const project = new Project({
      ...value,
      userId: req.user._id,
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
    });
  }
};

/**
 * Get all projects for current user
 */
const getProjects = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const query = { userId: req.user._id };

    if (status) query.status = status;
    if (type) query.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get projects',
    });
  }
};

/**
 * Get single project by ID
 */
const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({ _id: id, userId: req.user._id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.json({
      success: true,
      data: { project },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project',
    });
  }
};

/**
 * Update project
 */
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, builderState, mobileConfig } = req.body;

    const project = await Project.findOne({ _id: id, userId: req.user._id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    if (status) project.status = status;
    if (builderState) project.builderState = builderState;
    if (mobileConfig) project.mobileConfig = mobileConfig;

    await project.save();

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: { project },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
    });
  }
};

/**
 * Delete project
 */
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
    });
  }
};

/**
 * Publish project
 */
const publishProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({ _id: id, userId: req.user._id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    project.status = 'published';
    project.metadata.lastPublishedAt = new Date();
    
    // Generate a subdomain if not exists
    if (!project.domain) {
      const subdomain = `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${project._id.toString().substring(0, 8)}`;
      project.domain = subdomain;
      project.metadata.publishedUrl = `https://${subdomain}.ai-bilder.com`;
    }

    await project.save();

    res.json({
      success: true,
      message: 'Project published successfully',
      data: { 
        project,
        publishedUrl: project.metadata.publishedUrl,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Publish project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to publish project',
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  publishProject,
};
