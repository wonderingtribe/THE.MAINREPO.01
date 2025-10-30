/**
 * Project Model (PostgreSQL)
 * Stores project metadata in PostgreSQL
 * Project content is stored in MongoDB using mongo_document_id as reference
 */

const { DataTypes } = require('sequelize');

const defineProjectModel = (sequelize) => {
  const Project = sequelize.define(
    'Project',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      project_type: {
        type: DataTypes.STRING(50),
        comment: "e.g., 'React', 'HTML', 'Next.js'",
      },
      mongo_document_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'The ID for the document in MongoDB',
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'projects',
      timestamps: false,
      underscored: true,
      hooks: {
        beforeUpdate: (project) => {
          project.updated_at = new Date();
        },
      },
    }
  );

  return Project;
};

module.exports = defineProjectModel;
