const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const admin = require('firebase-admin');
const { PrismaClient } = require('./generated/prisma'); // Adjust path if needed

// Load environment variables from .env file
dotenv.config();

// --- Firebase Admin SDK Initialization ---
// Make sure you have downloaded the service account key and placed it correctly
// Also ensure 'backend/firebase-admin-sdk-key.json' is in your .gitignore
const serviceAccount = require('./firebase-admin-sdk-key.json'); // Adjust path if needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// --- Prisma Client Initialization ---
const prisma = new PrismaClient();

// --- Express App Initialization ---
const app = express();
const PORT = process.env.PORT || 3001; // Use 3001 to avoid conflict with frontend dev server (often 3000)

// --- Middleware ---
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // Middleware to parse JSON bodies

// --- Authentication Middleware ---
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    console.log('Auth Error: No token provided');
    return res.status(401).json({ error: 'Authentication token required' }); // if there isn't any token
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebase_uid = decodedToken.uid;

    // Find user in DB or create if it doesn't exist
    let user = await prisma.user.findUnique({
      where: { firebase_uid: firebase_uid },
    });

    if (!user) {
      console.log(`Creating new user for firebase_uid: ${firebase_uid}`);
      // Only include fields that are expected in your User model and available in decodedToken
      user = await prisma.user.create({
        data: {
          firebase_uid: firebase_uid,
          email: decodedToken.email || '', // Add fallback if email might be missing
          email_verified: decodedToken.email_verified || false,
          full_name: decodedToken.name, // Firebase often provides 'name'
          profile_picture_url: decodedToken.picture,
          // Add default values for other required fields if necessary (e.g., role, legacy_id, cohort_id)
          role: 'student', // Example default role
        },
      });
    } else {
        // Optionally update user fields like last login time, name, picture on subsequent logins
        user = await prisma.user.update({
            where: { firebase_uid: firebase_uid },
            data: {
                // Example: update name and picture if they changed in Firebase
                full_name: decodedToken.name,
                profile_picture_url: decodedToken.picture,
                // updated_at is usually handled automatically by Prisma @updatedAt
            }
        });
    }

    // Attach the database user object (not the Firebase decoded token) to the request
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Auth Error:', error.message);
    // Handle specific Firebase auth errors if needed
    if (error.code === 'auth/id-token-expired') {
        return res.status(401).json({ error: 'Token expired' });
    } else if (error.code && error.code.startsWith('auth/')) {
        return res.status(403).json({ error: 'Invalid token' }); // Token is invalid (e.g., wrong signature, revoked)
    } else {
        return res.status(500).json({ error: 'Internal server error during authentication' });
    }
  }
};

// --- Basic Route ---
app.get('/', (req, res) => {
  res.send('LegacyQuest Backend API is running!');
});

// --- API Routes ---

// Example Protected Route: Get current user's profile
app.get('/api/me', authenticateToken, (req, res) => {
  // req.user is populated by the authenticateToken middleware
  // We don't send back the firebase_uid or other sensitive details unless needed
  const { user_id, email, full_name, profile_picture_url, role, created_at, legacy_id, cohort_id } = req.user;
  res.json({
    user_id,
    email,
    full_name,
    profile_picture_url,
    role,
    created_at,
    legacy_id,
    cohort_id
    // Add other fields you want the frontend to have access to
  });
});

// Add placeholder route for tasks to enable testing user creation via DashboardContent
app.get('/api/tasks', authenticateToken, (req, res) => {
  console.log('Placeholder /api/tasks route hit by user:', req.user?.email);
  // Send back an empty array for now so the frontend doesn't hang or error on data mapping
  res.json([]);
});

// You can add more routes here, e.g., for tasks, submissions, etc.
// Example:
// const taskRoutes = require('./routes/tasks'); // Assuming you create route files
// app.use('/api/tasks', authenticateToken, taskRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// --- Graceful Shutdown (Optional but recommended) ---
process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server')
  await prisma.$disconnect()
  console.log('Prisma Client disconnected.')
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server')
  await prisma.$disconnect()
  console.log('Prisma Client disconnected.')
  process.exit(0)
}) 