# Database Documentation

## Overview
This database is designed for a project management application with user authentication, project collaboration, task management, and commenting features.

## Schema Structure

### Tables

1. **users**
   - Stores user account information
   - Fields: id, username, email, password_hash, created_at, updated_at

2. **projects**
   - Stores project information
   - Fields: id, title, description, owner_id, created_at, updated_at

3. **tasks**
   - Stores task information
   - Fields: id, title, description, status, priority, due_date, project_id, assigned_to, created_by, created_at, updated_at

4. **comments**
   - Stores comments on tasks
   - Fields: id, content, task_id, user_id, created_at, updated_at

5. **project_members**
   - Manages project collaboration
   - Fields: project_id, user_id, role, joined_at

## Setup Instructions

1. **Database Connection**
   - Host: ep-square-math-a68ipd2t-pooler.us-west-2.aws.neon.tech
   - Database: legacyquest
   - SSL Mode: require
   - Connection pooling is enabled

2. **Initial Setup**
   ```bash
   # Connect to the database
   psql "postgresql://user:password@ep-square-math-a68ipd2t-pooler.us-west-2.aws.neon.tech/legacyquest?sslmode=require"
   
   # Run the schema
   \i schema.sql
   ```

3. **Environment Variables**
   Create a `.env` file with:
   ```
   DATABASE_URL=postgresql://user:password@ep-square-math-a68ipd2t-pooler.us-west-2.aws.neon.tech/legacyquest?sslmode=require
   ```

## Development Workflow

1. **Making Schema Changes**
   - Create a new migration file in the `migrations` directory
   - Name format: `YYYYMMDDHHMMSS_description.sql`
   - Include both `up` and `down` migrations

2. **Best Practices**
   - Always use migrations for schema changes
   - Test migrations locally before applying to production
   - Keep track of all changes in version control
   - Use appropriate indexes for performance
   - Follow naming conventions consistently

## Security Considerations

- Passwords are stored as hashes only
- Use parameterized queries to prevent SQL injection
- Implement row-level security where needed
- Regular backup schedule is maintained by Neon
- SSL is required for all connections

## Backup and Recovery

Neon provides automatic backups. Manual backups can be created through the Neon console. 