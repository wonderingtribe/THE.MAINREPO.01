/**
 * Project Content Model (MongoDB)
 * Stores the flexible JSON structure of project content
 * This represents the visual/builder structure of a project
 */

const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    props: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: false }
);

const pageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    components: [componentSchema],
  },
  { _id: false }
);

const projectContentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    global_settings: {
      theme: {
        type: String,
        default: 'light',
      },
      font: {
        type: String,
        default: 'Inter',
      },
    },
    pages: [pageSchema],
  },
  {
    timestamps: true,
    collection: 'project_content',
  }
);

const ProjectContent = mongoose.model('ProjectContent', projectContentSchema);

module.exports = ProjectContent;
