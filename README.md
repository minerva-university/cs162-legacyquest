# LegacyQuest

## Project Overview

LegacyQuest is a full-stack web application designed to help users track tasks, earn points, and compete with other legacy groups. The application features authentication, task management, evidence submission, and leaderboards to encourage friendly competition between legacy cohorts.

## Architecture

LegacyQuest follows a modern web application architecture with the following components:

### Frontend
- Built with **React** and **Vite**
- Uses **Material UI** for components and styling
- Client-side routing via **React Router**
- Authentication with **Firebase Auth**
- State management with **React Context API**

### Backend
- **Node.js** and **Express.js** RESTful API
- **Prisma ORM** for database operations
- **PostgreSQL** database
- **Firebase Admin SDK** for authentication

### Deployment Infrastructure
- Two-tier server architecture for flexible deployment
- Production-ready express server with static file serving
- Support for multiple deployment platforms (Sevalla, Kinsta, etc.)
- Environment variable configuration for secure deployment

## Repository Structure

```
cs162-legacyquest/
├── server.js                  # Main server entry point for deployment
├── Procfile                   # Heroku/Sevalla process configuration
├── nixpacks.toml              # Nixpacks build configuration
├── package.json               # Root project dependencies
├── backend/                   # Backend API server
│   ├── server.js              # API server implementation
│   ├── prisma/                # Prisma schema and migrations
│   ├── lib/                   # Utility functions and services
│   └── firebase-admin-sdk-key.json # Firebase admin credentials (dev only)
└── frontend/                  # React frontend application
    ├── src/                   # Frontend source code
    │   ├── main.jsx           # Application entry point
    │   ├── App.jsx            # Main application component
    │   ├── components/        # React components
    │   └── pages/             # Page-level components
    ├── services/              # API integration and services
    └── public/                # Static assets
```

## Key Features

- **Authentication**: Secure user login via Firebase Auth
- **Task Management**: Create, view, and submit evidence for tasks
- **Legacy System**: Users belong to legacy groups that compete for points
- **Evidence Submission**: Upload task evidence with Google Drive integration
- **Leaderboards**: Global and location-based rankings
- **Admin Dashboard**: Task approval, rejection, and management

## Deployment Architecture

LegacyQuest uses a two-tier server architecture optimized for production:

1. **Root Server (server.js)**
   - Acts as the main entry point for deployment platforms
   - Routes API requests to the backend
   - Serves the built frontend as static files
   - Handles SPA routing

2. **Backend Server (backend/server.js)**
   - Contains all API logic and routes
   - Handles database interactions through Prisma
   - Manages authentication with Firebase

All backend routes defined without `/api` prefix in backend/server.js are automatically mounted under `/api` by the root server, making them accessible as:

```
https://your-app.com/api/endpoint-name
```

## Environment Setup

### Prerequisites
- Node.js v18+
- PostgreSQL database
- Firebase project with Auth enabled

### Environment Variables
The application requires the following environment variables:

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/legacyquest?schema=public"

# Firebase
FIREBASE_ADMIN_SDK_BASE64="[base64-encoded Firebase Admin SDK key]"

# Server
PORT=3001 # Default port if not provided by the deployment platform
NODE_ENV=development # Set to "production" for production environments
```

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/cs162-legacyquest.git
cd cs162-legacyquest
```

2. Install dependencies
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..
```

3. Set up the database
```bash
cd backend
npx prisma migrate dev
cd ..
```

4. Start the development servers
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

## Production Deployment

Deploy LegacyQuest to production using these steps:

1. Build the frontend
```bash
cd frontend
npm run build
cd ..
```

2. Set environment variables on your deployment platform

3. Deploy the application
```bash
git push origin main
```

## API Routes

The backend provides the following main API endpoints:

### Authentication
- `GET /api/me` - Get current user profile

### Tasks
- `GET /api/tasks` - Get all tasks for current user
- `GET /api/tasks/:taskId` - Get a specific task
- `POST /api/tasks/:taskId/submit` - Submit evidence for a task

### Legacy and Rankings
- `GET /api/legacies/rankings/global` - Get global legacy rankings
- `GET /api/legacies/rankings/local/:location` - Get local legacy rankings
- `GET /api/legacy/byname/:baseLegacyName/members` - Get members of a legacy

### Admin Routes
- `GET /api/admin/tasks` - Get all task submissions (admin only)
- `POST /api/admin/tasks` - Create a new task (admin only)
- `PATCH /api/admin/tasks/:taskId/review` - Approve/reject tasks (admin only)


