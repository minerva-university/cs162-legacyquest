-- Migration: Add Firebase Authentication Support
-- Up

-- Modify users table for Firebase integration
ALTER TABLE users
    DROP COLUMN password_hash,
    ADD COLUMN firebase_uid TEXT UNIQUE NOT NULL,
    ALTER COLUMN username SET NOT NULL,
    ALTER COLUMN username SET UNIQUE,
    ALTER COLUMN email SET NOT NULL,
    ALTER COLUMN email SET UNIQUE,
    ADD COLUMN display_name TEXT,
    ADD COLUMN photo_url TEXT,
    ADD COLUMN disabled BOOLEAN DEFAULT FALSE,
    ADD COLUMN email_verified BOOLEAN DEFAULT FALSE,
    ADD COLUMN phone_number TEXT,
    ADD COLUMN provider_data JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN last_sign_in_time TIMESTAMP WITH TIME ZONE,
    ADD COLUMN created_by_provider TEXT;

-- Add indexes for performance
CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX idx_users_email_firebase ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_provider ON users(created_by_provider);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_created_by ON tasks(created_by);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_task_id ON comments(task_id);
CREATE INDEX idx_project_members_user_id ON project_members(user_id);

-- Add user settings table for additional user preferences
CREATE TABLE user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "task_assignments": true, "project_updates": true, "comment_mentions": true}'::jsonb,
    theme_preference VARCHAR(20) DEFAULT 'light',
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add audit log table for tracking important changes
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    changes JSONB NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for audit logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create trigger for user_settings updated_at
CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically create user settings
CREATE OR REPLACE FUNCTION create_user_settings_on_user_insert()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_settings (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically create user settings
CREATE TRIGGER create_user_settings_trigger
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION create_user_settings_on_user_insert();

-- Create function to log user changes
CREATE OR REPLACE FUNCTION log_user_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (
            user_id,
            entity_type,
            entity_id,
            action_type,
            changes,
            created_by
        )
        VALUES (
            NEW.id,
            'user',
            NEW.id,
            'update',
            jsonb_build_object(
                'old', to_jsonb(OLD),
                'new', to_jsonb(NEW)
            ),
            NEW.id
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for logging user changes
CREATE TRIGGER log_user_changes_trigger
    AFTER UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION log_user_changes();

-- Down
DROP TRIGGER IF EXISTS log_user_changes_trigger ON users;
DROP FUNCTION IF EXISTS log_user_changes();
DROP TRIGGER IF EXISTS create_user_settings_trigger ON users;
DROP FUNCTION IF EXISTS create_user_settings_on_user_insert();
DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;
DROP INDEX IF EXISTS idx_audit_logs_created_at;
DROP INDEX IF EXISTS idx_audit_logs_entity;
DROP INDEX IF EXISTS idx_audit_logs_user_id;
DROP INDEX IF EXISTS idx_project_members_user_id;
DROP INDEX IF EXISTS idx_comments_task_id;
DROP INDEX IF EXISTS idx_comments_user_id;
DROP INDEX IF EXISTS idx_tasks_project_id;
DROP INDEX IF EXISTS idx_tasks_created_by;
DROP INDEX IF EXISTS idx_tasks_assigned_to;
DROP INDEX IF EXISTS idx_users_provider;
DROP INDEX IF EXISTS idx_users_username;
DROP INDEX IF EXISTS idx_users_email_firebase;
DROP INDEX IF EXISTS idx_users_firebase_uid;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS user_settings;
ALTER TABLE users
    ADD COLUMN password_hash VARCHAR(255),
    DROP COLUMN created_by_provider,
    DROP COLUMN last_sign_in_time,
    DROP COLUMN provider_data,
    DROP COLUMN phone_number,
    DROP COLUMN email_verified,
    DROP COLUMN disabled,
    DROP COLUMN photo_url,
    DROP COLUMN display_name,
    DROP COLUMN firebase_uid; 