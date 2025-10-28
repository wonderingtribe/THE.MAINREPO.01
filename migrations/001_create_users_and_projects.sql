-- PostgreSQL Migration Script
-- Creates users and projects tables for AI-WONDERLAND backend

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    project_type VARCHAR(50), -- e.g., 'React', 'HTML', 'Next.js'
    mongo_document_id VARCHAR(255) NOT NULL, -- The ID for the document in MongoDB
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_mongo_document_id ON projects(mongo_document_id);
CREATE INDEX IF NOT EXISTS idx_projects_user_created ON projects(user_id, created_at DESC);

-- Add comment to explain the schema
COMMENT ON TABLE users IS 'Stores user account information';
COMMENT ON TABLE projects IS 'Stores project metadata. Project content is stored in MongoDB using mongo_document_id as reference';
COMMENT ON COLUMN projects.mongo_document_id IS 'References the _id field in MongoDB project_content collection';
