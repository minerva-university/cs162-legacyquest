// =============================================================================
// Backend API Server for LegacyQuest
// =============================================================================
// This server handles API requests from the frontend, authenticates users
// using Firebase Auth, and interacts with the PostgreSQL database via Prisma.
// =============================================================================

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const admin = require('firebase-admin');
const { PrismaClient } = require('./generated/prisma'); // Adjust path if needed

// Load environment variables from .env file (DATABASE_URL, PORT, JWT_SECRET, etc.)
dotenv.config();

// --- Firebase Admin SDK Initialization ---
// Initializes Firebase Admin using the service account key.
// IMPORTANT: Ensure './firebase-admin-sdk-key.json' exists, is correctly named,
// belongs to the SAME Firebase project as the frontend config, and is in .gitignore.
const serviceAccount = require('./firebase-admin-sdk-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// --- Prisma Client Initialization ---
// Initializes Prisma Client connected to the database specified in DATABASE_URL.
const prisma = new PrismaClient();

// --- Express App Initialization --- 
const app = express();
const PORT = process.env.PORT || 3001; // Use 3001 to avoid conflict with frontend dev server (often 3000)

// --- Core Middleware ---
// Enable Cross-Origin Resource Sharing. Allows requests from frontend origin.
// TODO: Configure specific origins for production for better security.
app.use(cors());
// Parse incoming requests with JSON payloads (e.g., POST/PUT requests).
app.use(express.json());

// --- Authentication Middleware (authenticateToken) ---
// This middleware is applied to protected API routes.
// 1. Extracts the Firebase ID token from the 'Authorization: Bearer <token>' header.
// 2. Verifies the token using Firebase Admin SDK (checks signature, expiration, audience).
// 3. Extracts the firebase_uid and email from the verified token.
// 4. Attempts to find the user in the DB first by firebase_uid.
// 5. If not found by UID, attempts to find by email.
// 6. If found by email and firebase_uid is missing in DB, updates the existing record
//    with the firebase_uid and picture URL (preserving existing name).
// 7. If not found by either, creates a new user record in the DB.
// 8. Attaches the final user record from the DATABASE to req.user.
// 9. Calls next() to proceed, or sends 401/403/500 error.
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    console.log('Auth Error: No token provided');
    return res.status(401).json({ error: 'Authentication token required' });
  }

  try {
    // Verify the token from Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebase_uid = decodedToken.uid;
    // Ensure we handle email consistently as lowercase
    const tokenEmailLower = decodedToken.email ? decodedToken.email.toLowerCase() : null;

    let userRecord = null;

    // 1. Try to find user by Firebase UID first
    userRecord = await prisma.user.findUnique({
      where: { firebase_uid: firebase_uid },
    });

    if (userRecord) {
      // User found by firebase_uid - regular returning user
      console.log(`User found by firebase_uid: ${userRecord.email}`);
      userRecord = await prisma.user.update({
          where: { firebase_uid: firebase_uid },
          data: {
              profile_picture_url: decodedToken.picture,
              // Ensure email_verified and potentially email itself are updated if they change in Firebase
              email: tokenEmailLower, // Update email in case casing changed in Firebase
              email_verified: decodedToken.email_verified || false,
          }
      });
    } else {
      // 2. User not found by firebase_uid - check by email (now unique and lowercase)
      console.log(`User not found by firebase_uid ${firebase_uid}. Checking by email: ${tokenEmailLower}`);
      if (tokenEmailLower) { // Proceed only if email exists
          // Use findFirst to find by email, ignoring case if the database collation isn't case-insensitive
          const existingUserByEmail = await prisma.user.findUnique({
            where: { 
              email: tokenEmailLower // Email should already be lowercase, but we ensure it here
            },
          });

          if (existingUserByEmail) {
            // User found by email!
            if (!existingUserByEmail.firebase_uid) {
              // 2a. Found by email, firebase_uid is missing - LINK accounts (preserve existing name)
              console.log(`Linking Firebase UID ${firebase_uid} to existing user found by email ${tokenEmailLower} (Case 2a)`);
              // Use transaction to prevent race conditions when linking accounts
              userRecord = await prisma.$transaction(async (prisma) => {
                // Double-check the user still doesn't have a firebase_uid (could have been set by another request)
                const freshUser = await prisma.user.findUnique({
                  where: { email: tokenEmailLower },
                });
                
                if (freshUser && !freshUser.firebase_uid) {
                  return prisma.user.update({
                    where: { email: tokenEmailLower },
                    data: {
                      firebase_uid: firebase_uid,
                      profile_picture_url: decodedToken.picture,
                      email_verified: decodedToken.email_verified || false,
                      // DO NOT update full_name
                    },
                  });
                }
                return freshUser; // Return the user without updating if already has firebase_uid
              });
            } else {
              // 2b. Found by email, and firebase_uid ALREADY EXISTS in DB.
              // This could be the correct UID (user logged in before)
              // OR it could be an OLD UID (user deleted Firebase account and signed up again).
              // We will assume the new login takes precedence and UPDATE the firebase_uid.
              if (existingUserByEmail.firebase_uid !== firebase_uid) {
                // The UIDs don't match - update the DB with the new UID from the token.
                console.warn(`Updating firebase_uid for ${tokenEmailLower}. Old: ${existingUserByEmail.firebase_uid}, New: ${firebase_uid}. Preserving DB name. (Case 2b - UID Update)`);
                userRecord = await prisma.user.update({
                  where: { email: tokenEmailLower }, // Find by unique email
                  data: {
                    firebase_uid: firebase_uid, // Update to the new UID from the token
                    profile_picture_url: decodedToken.picture, // Update picture
                    email_verified: decodedToken.email_verified || false,
                    // DO NOT update full_name
                  },
                });
              } else {
                // The UIDs match - this is just a normal login for an existing, linked user.
                // We already updated the picture etc. when checking by UID initially,
                // but if we somehow missed that, we can ensure the record is fresh.
                // Alternatively, just assign the already found record.
                console.log(`User found by email ${tokenEmailLower}, firebase_uid matches token. (Case 2b - UID Match)`);
                // Re-assign to ensure consistency, though technically `existingUserByEmail` should be the same as the record updated earlier if found by UID.
                 userRecord = await prisma.user.update({
                  where: { email: tokenEmailLower }, // Find by unique email
                  data: { // Update non-critical fields just in case
                      profile_picture_url: decodedToken.picture,
                      email_verified: decodedToken.email_verified || false,
                  }
                 });
                 // If userRecord was already found via UID, this re-fetches the same data.
                 // A slightly more optimized way might be: userRecord = existingUserByEmail; but the update ensures freshness.
              }
            }
          } else {
            // 3. Not found by firebase_uid OR email - create a new user
            console.log(`Creating new user for firebase_uid: ${firebase_uid}, email: ${tokenEmailLower}`);
            userRecord = await prisma.user.create({
              data: {
                firebase_uid: firebase_uid,
                email: tokenEmailLower, // Store lowercase email
                email_verified: decodedToken.email_verified || false,
                full_name: decodedToken.name, // Use name from Firebase for new users
                profile_picture_url: decodedToken.picture,
                role: 'student',
              },
            });
          }
      } else {
        console.error(`Auth Error: Firebase token for UID ${firebase_uid} has no email address.`);
        return res.status(400).json({ error: 'Email address missing from authentication token.' });
      }
    }

    // Attach the final database user object to the request
    req.user = userRecord;
    next();

  } catch (error) {
    // Handle token verification errors etc.
    console.error('Auth Error:', error.message);
    if (error.code === 'auth/id-token-expired') {
        return res.status(401).json({ error: 'Token expired' });
    } else if (error.code && error.code.startsWith('auth/')) {
        // Includes invalid audience ('aud'), signature, etc.
        return res.status(403).json({ error: `Invalid token: ${error.message}` });
    } else if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        console.error(`Auth Error: Attempted to create user with duplicate email (should not happen with checks): ${tokenEmailLower}`);
        return res.status(409).json({ error: 'An account with this email may already exist.' });
    } else {
        return res.status(500).json({ error: 'Internal server error during authentication' });
    }
  }
};

// --- Public Routes ---
// Basic health check or landing route for the API.
app.get('/', (req, res) => {
  res.send('LegacyQuest Backend API is running!');
});

// --- Protected API Routes ---
// Routes below this point typically require authentication.

// GET /api/me: Returns profile information for the currently authenticated user.
// Uses `authenticateToken` middleware to get user data into `req.user`.
app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    // Get the user with related legacy and cohort information
    const userWithRelations = await prisma.user.findUnique({
      where: { user_id: req.user.user_id },
      include: {
        legacy: true,  // Include legacy details
        cohort: true   // Include cohort details
      }
    });

    if (!userWithRelations) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract only the necessary fields to send to frontend
    // Exclude sensitive information like firebase_uid
    const { 
      user_id, 
      email, 
      full_name, 
      profile_picture_url, 
      role, 
      created_at, 
      email_verified,
      legacy,
      cohort 
    } = userWithRelations;

    // Format the response with nested objects for related data
    res.json({
      user_id,
      email,
      email_verified,
      full_name,
      profile_picture_url,
      role: role === 'student' ? 'user' : role, // Normalize role for frontend
      created_at,
      // Include legacy information if available
      legacy: legacy ? {
        legacy_id: legacy.legacy_id,
        name: legacy.name,
        points: legacy.points,
        location_filter: legacy.location_filter
      } : null,
      // Include cohort information if available
      cohort: cohort ? {
        cohort_id: cohort.cohort_id,
        name: cohort.name
      } : null
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
});

// GET /api/legacy/:legacyId/members - Fetch all members of a specific legacy
app.get('/api/legacy/:legacyId/members', authenticateToken, async (req, res) => {
  try {
    const legacyId = parseInt(req.params.legacyId);
    
    if (isNaN(legacyId)) {
      return res.status(400).json({ error: 'Invalid legacy ID' });
    }
    
    // Verify the user belongs to the requested legacy or is an admin
    if (req.user.legacy_id !== legacyId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You can only view members of your own legacy' });
    }
    
    // Fetch all users with the specified legacy_id and include the legacy information for location_filter
    const legacyMembers = await prisma.user.findMany({
      where: { legacy_id: legacyId },
      include: {
        cohort: true,  // Include cohort details
        legacy: true   // Include legacy details to access location_filter
      }
    });
    
    // Format the response to match the expected frontend structure
    const formattedMembers = legacyMembers.map(member => ({
      user_id: member.user_id,
      name: member.full_name,
      email: member.email,
      profile_picture_url: member.profile_picture_url || "https://img.icons8.com/?size=100&id=u4U9G3tGGHu1&format=png&color=737373", // Use provided icon as default avatar only when profile_picture_url is null or undefined
      location: member.legacy?.location_filter, // Use location_filter from the legacy relationship
      cohort: member.cohort
    }));
    
    res.json(formattedMembers);
  } catch (error) {
    console.error('Error fetching legacy members:', error);
    res.status(500).json({ error: 'Failed to retrieve legacy members' });
  }
});

// GET /api/tasks - Fetch all tasks for current user
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const userCohortId = req.user.cohort_id;
    const userLegacyId = req.user.legacy_id;

    const tasks = await prisma.task.findMany({
      where: {
        // Match tasks for 'all', user's cohort, or user's legacy
        OR: [
          { assignee_type: 'all' },
          userCohortId && { assignee_type: 'cohort', assignee_id: userCohortId },
          userLegacyId && { assignee_type: 'legacy', assignee_id: userLegacyId }
        ].filter(Boolean), // Remove any undefined/null filters
      },
      include: {
        // Include user's latest submission for status checking
        submissions: {
          where: { user_id: userId },
          orderBy: { submitted_at: 'desc' },
          take: 1
        }
      },
      orderBy: { due_date: 'asc' } // Sort by due date
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// POST /api/tasks/:taskId/submissions - Upload evidence for a task
app.post('/api/tasks/:taskId/submissions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const taskId = parseInt(req.params.taskId, 10);
    const { submitted_evidence } = req.body;

    if (isNaN(taskId)) return res.status(400).json({ error: 'Invalid task ID.' });
    if (!submitted_evidence || submitted_evidence.trim() === '') {
      return res.status(400).json({ error: 'Evidence cannot be empty.' });
    }

    // Mark previous submissions as not latest
    await prisma.taskSubmission.updateMany({
      where: { task_id: taskId, user_id: userId, is_latest: true },
      data: { is_latest: false }
    });

    // Create new submission
    const submission = await prisma.taskSubmission.create({
      data: {
        task_id: taskId,
        user_id: userId,
        submitted_evidence,
        is_latest: true,
        submitted_at: new Date(),
        status: 'Submitted'
      }
    });

    res.status(201).json({ success: true, submission });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Failed to upload submission.' });
  }
});

// GET /api/tasks/:taskId/submissions/latest
app.get('/api/tasks/:taskId/submissions/latest', authenticateToken, async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const userId = req.user.user_id;

  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const latestSubmission = await prisma.taskSubmission.findFirst({
      where: {
        task_id: taskId,
        user_id: userId,
        is_latest: true,
      },
      orderBy: { submitted_at: 'desc' },
    });

    if (!latestSubmission) {
      return res.status(404).json({ error: 'No submission found' });
    }

    res.json(latestSubmission);
  } catch (err) {
    console.error(`Error fetching latest submission for task ${taskId}`, err);
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
});

// GET /api/admin/tasks - Admin only
// This route fetches all tasks for admin review.
app.get('/api/admin/tasks', async (req, res) => {
  const legacyFilter = req.query.legacy || 'All';
  const statusFilter = req.query.status || 'All';

  try {
    const tasks = await prisma.taskSubmission.findMany({
      where: {
        ...(statusFilter !== 'All' && { status: statusFilter }),
        user: {
          ...(legacyFilter !== 'All' && {
            legacy: {
              name: legacyFilter
            }
          })
        }
      },
      include: {
        user: {
          select: {
            full_name: true,
            legacy: {
              select: { name: true }
            }
          }
        },
        task: true
      },
      orderBy: { submitted_at: 'desc' }
    });

    const result = tasks.map((entry) => ({
      taskID: entry.task_id,
      taskName: entry.task.title,
      submissionDate: new Date(entry.submitted_at).toISOString().split('T')[0],
      studentName: entry.user.full_name,
      legacyName: entry.user.legacy?.name || '—',
      evidence: entry.submitted_evidence || '',
      points: entry.task.points_on_approval,
      status: entry.status === 'Submitted' ? 'Needs Approval' : entry.status,
      userId: entry.user_id,
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching admin task submissions:', err);
    res.status(500).json({ error: 'Failed to fetch admin task data' });
  }
});


// GET /api/admin/tasks/:taskId/evidence - Admin only
// This route fetches the evidence for a specific task submission.
app.get('/api/admin/tasks/:taskId/evidence', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const taskId = parseInt(req.params.taskId, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid taskId' });
  }

  try {
    // Get the latest submission for that task from *any* user
    const userId = parseInt(req.query.userId, 10);
    if (isNaN(taskId) || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid taskId or userId' });
    }

    const submission = await prisma.taskSubmission.findFirst({
      where: {
        task_id: taskId,
        user_id: userId,
        is_latest: true
      },
      orderBy: { submitted_at: 'desc' }
    });

    if (!submission) {
      return res.status(404).json({ error: 'No submission found' });
    }

    res.json({
      submitted_evidence: submission.submitted_evidence,
      reviewer_comment: submission.reviewer_comment || null,
    });
  } catch (err) {
    console.error('Error fetching admin evidence:', err);
    res.status(500).json({ error: 'Server error while fetching evidence' });
  }
});



// --- Start Server ---
// Starts the Express server listening on the configured PORT.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// --- Graceful Shutdown Handling ---
// Ensures Prisma client disconnects properly when the server process is stopped.
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