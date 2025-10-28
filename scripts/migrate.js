#!/usr/bin/env node
/**
 * PostgreSQL Migration Runner
 * Runs SQL migration files in order
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const config = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  database: process.env.POSTGRES_DB || 'ai_bilder',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
};

const runMigrations = async () => {
  const client = new Client(config);

  try {
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected successfully');

    const migrationsDir = path.join(__dirname, '../migrations');
    const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();

    console.log(`Found ${files.length} migration file(s)`);

    for (const file of files) {
      console.log(`\nRunning migration: ${file}`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      await client.query(sql);
      console.log(`✓ Migration ${file} completed successfully`);
    }

    console.log('\n✓ All migrations completed successfully');
  } catch (error) {
    console.error('\n✗ Migration failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
};

// Run if called directly
if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations;
