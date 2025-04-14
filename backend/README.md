# LegacyQuest Backend

This directory contains the backend API server for the LegacyQuest application. The backend is built with Express.js and uses Prisma ORM to interact with a PostgreSQL database. Firebase Admin SDK is used for authentication.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
  - [Install Dependencies](#install-dependencies)
  - [Environment Configuration](#environment-configuration)
  - [Firebase Admin SDK Setup](#firebase-admin-sdk-setup)
- [Database Setup](#database-setup)
  - [Running Migrations](#running-migrations)
  - [Creating New Migrations](#creating-new-migrations)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [File Structure](#file-structure)
- [Common Issues & Troubleshooting](#common-issues--troubleshooting)

## Prerequisites

- Node.js v18+ and npm
- PostgreSQL database (local or cloud instance)
- Firebase project with Authentication enabled
- Git

## Initial Setup

### Install Dependencies

First, install all the required dependencies:

```bash
cd backend
npm install
npm install --save express dotenv cors firebase-admin
```

### Environment Configuration

Create a `.env` file in the `backend` directory with the following variables (copy the scripts and paste it in theh /env file removing the ````):

```
# Database connection string
DATABASE_URL="postgresql://username:password@localhost:5432/legacyquest?schema=public"

# Server port (default: 3001)
PORT=3001

# Only needed if using Prisma Accelerate (optional)
# PRISMA_ACCELERATE_URL="your_accelerate_url"
```

Notes:
- Replace DATABASE_URL with the url provided in the secrets via Telegram

### Firebase Admin SDK Setup

1. Ask a backend teammate to send you the `firebase-admin-sdk-key.json` file via Telegram
2. Download the file you received 
3. Copy it to the `backend` directory (same level as server.js)
3. Make sure the filename is exactly `firebase-admin-sdk-key.json`


IMPORTANT:
- This file contains sensitive credentials, ensure it's included in your `.gitignore` file

## Database Setup

### Running Migrations

To apply the existing database migrations:

```bash
npx prisma migrate deploy
```

This will create all necessary tables in your database as defined in the Prisma schema.

### Creating New Migrations

If you make changes to the `schema.prisma` file:

1. Create a migration:
   ```bash
   npx prisma migrate dev --name descriptive_name
   ```
   This command:
   - Updates the Prisma client
   - Generates a migration file
   - Applies the migration to your database

2. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

## Running the Server

To start the backend server:

```bash
node server.js
```

For development with auto-reload:
```bash
# Install nodemon if you don't have it
npm install -g nodemon

# Run with nodemon
nodemon server.js
```

The server will start on http://localhost:3001 (or the port specified in your .env file).

## API Documentation

- `GET /` - Health check endpoint
- `GET /api/me` - Get authenticated user's profile information
- `GET /api/tasks` - Get tasks for authenticated user

All routes under `/api` require authentication via a Firebase ID token in the Authorization header.

## File Structure

```
backend/
├── generated/       # Auto-generated Prisma client files
├── lib/             # Utility code 
├── prisma/          # Database schema and migrations
│   ├── migrations/  # Migration files
│   └── schema.prisma # Database schema definition
├── .env             # Environment variables (not committed to git)
├── firebase-admin-sdk-key.json # Firebase Admin credentials (not committed to git)
├── package.json     # Node.js dependencies
└── server.js        # Main application entry point
```

## Common Issues & Troubleshooting

### Missing Firebase Admin SDK Key
Error: `Error: Failed to parse private key: Error: ENOENT: no such file or directory, open './firebase-admin-sdk-key.json'`

Solution: Ensure you've downloaded the Firebase Admin SDK key and saved it as `firebase-admin-sdk-key.json` in the backend directory.

### Database Connection Issues
Error: `PrismaClientInitializationError: Connection to database failed`

Solutions:
- Check if your PostgreSQL server is running
- Verify DATABASE_URL is correct in .env
- Ensure your IP is whitelisted if using a cloud database

### Missing Required Environment Variables
Error: `TypeError: Cannot read properties of undefined (reading 'XXXX')`

Solution: Make sure your .env file is properly configured with all required variables.