/**
 * Project Model (MongoDB)
 * Represents user projects/sites in the builder
 */

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['website', 'mobile-app'],
      default: 'website',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    domain: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      unique: true,
    },
    customDomain: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      unique: true,
    },
    builderState: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        pages: [],
        components: [],
        theme: {},
        settings: {},
      },
    },
    mobileConfig: {
      platform: {
        type: String,
        enum: ['react-native', 'flutter', 'both'],
      },
      bundleId: String,
      appName: String,
      version: String,
    },
    metadata: {
      lastPublishedAt: Date,
      publishedUrl: String,
      mobileExports: [{
        platform: String,
        version: String,
        exportedAt: Date,
        downloadUrl: String,
      }],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
projectSchema.index({ userId: 1, status: 1 });
projectSchema.index({ userId: 1, createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
