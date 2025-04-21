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
// Initializes Firebase Admin using the service account key from environment variable.
// The service account key is stored as a Base64 encoded string in FIREBASE_ADMIN_SDK_BASE64.
let serviceAccount;

try {
  // Check if the environment variable exists
  const encodedServiceAccount = process.env.FIREBASE_ADMIN_SDK_BASE64;
  
  if (!encodedServiceAccount) {
    console.error('FATAL ERROR: FIREBASE_ADMIN_SDK_BASE64 environment variable is not set.');
    // Fall back to local file if in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Falling back to local firebase-admin-sdk-key.json file for development.');
      serviceAccount = require('./firebase-admin-sdk-key.json');
    } else {
      // Exit if in production and no key provided
      process.exit(1);
    }
  } else {
    // Decode the Base64 string back into a JSON string
    const decodedJsonString = Buffer.from(encodedServiceAccount, 'base64').toString('utf-8');
    
    // Parse the JSON string into an object
    serviceAccount = JSON.parse(decodedJsonString);
    console.log('Firebase Admin SDK credentials loaded from environment variable.');
  }
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
  process.exit(1);
}

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


// NEW endpoint connecting members with the same Legacy Name
app.get('/api/legacy/byname/:baseLegacyName/members', authenticateToken, async (req, res) => {
  try {
    const baseLegacyName = req.params.baseLegacyName;
    
    if (!baseLegacyName) {
      return res.status(400).json({ error: 'Invalid legacy name' });
    }
    
    console.log(`Looking for legacy members with base name: ${baseLegacyName}`);
    
    // Fetch all users whose related legacy name starts with the base name in a single query
    const legacyMembers = await prisma.user.findMany({
      where: {
        legacy: { // Filter directly on the related legacy record
          name: {
            startsWith: baseLegacyName,
            mode: 'insensitive' // Optional: Add if case-insensitive matching is desired
          }
        }
      },
      include: {
        cohort: true, // Include cohort details
        legacy: true  // Include legacy details (name, location_filter, etc.)
      },
      orderBy: { // Optional: Add sorting if needed, e.g., by name
        full_name: 'asc' 
      }
    });
    
    // Format the response (remains the same)
    const formattedMembers = legacyMembers.map(member => ({
      name: member.full_name,
      profile_picture_url: member.profile_picture_url || "https://img.icons8.com/?size=100&id=u4U9G3tGGHu1&format=png&color=737373",
      cohort: member.cohort?.name || "Unknown Cohort",
    }));
    
    res.json(formattedMembers);
  } catch (error) {
    console.error('Error fetching legacy members by name:', error);
    res.status(500).json({ error: 'Failed to retrieve legacy members' });
  }
});

// NEW endpoint for fetching members of a specific legacy AND cohort
app.get('/api/legacy/:legacyId/cohort/:cohortId/members', authenticateToken, async (req, res) => {
  try {
    const legacyId = parseInt(req.params.legacyId, 10);
    const cohortId = parseInt(req.params.cohortId, 10);

    if (isNaN(legacyId) || isNaN(cohortId)) {
      return res.status(400).json({ error: 'Invalid Legacy or Cohort ID' });
    }

    // Optional: Add authorization check if needed, e.g.
    // if (req.user.legacy_id !== legacyId || req.user.cohort_id !== cohortId) {
    //   return res.status(403).json({ error: 'Unauthorized access' });
    // }

    console.log(`Fetching members for legacy ${legacyId} and cohort ${cohortId}`);

    const cohortLegacyMembers = await prisma.user.findMany({
      where: {
        legacy_id: legacyId,
        cohort_id: cohortId,
      },
      include: {
        cohort: true, // Needed for cohort name
      },
      orderBy: { // Optional: Consistent sorting
        full_name: 'asc'
      }
    });

    // Format the response (minimal payload)
    const formattedMembers = cohortLegacyMembers.map(member => ({
      name: member.full_name,
      profile_picture_url: member.profile_picture_url || "https://img.icons8.com/?size=100&id=u4U9G3tGGHu1&format=png&color=737373",
      cohort: member.cohort?.name || "Unknown Cohort",
    }));

    res.json(formattedMembers);

  } catch (error) {
    console.error('Error fetching specific cohort legacy members:', error);
    res.status(500).json({ error: 'Failed to retrieve cohort legacy members' });
  }
});

// GET /api/tasks - Fetch all tasks for current user
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;

    // Fetch user's legacy to get their location_filter
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        legacy: true // access legacy.location_filter
      }
    });

    const userLocation = user.legacy?.location_filter;

    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { location: null }, // Global tasks with no location
          { location: userLocation } // Tasks matching user's legacy location
        ]
      },
      include: {
        submissions: {
          where: { user_id: userId },
          orderBy: { submitted_at: 'desc' },
          take: 1
        }
      },
      orderBy: { due_date: 'asc' }
    });

    res.json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
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
        is_latest: true,
        ...(statusFilter !== 'All' && { status: statusFilter }),
        user: {
          ...(legacyFilter !== 'All' && {
            legacy_id: parseInt(legacyFilter)
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
      submissionId: entry.submission_id // Add this line to include the submission ID
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching admin task submissions:', err);
    res.status(500).json({ error: 'Failed to fetch admin task data' });
  }
});

// POST /api/admin/tasks - Admin only
// Create a new task
app.post('/api/admin/tasks', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { title, description, due_date, location, points_on_approval } = req.body;

  if (!title || !due_date || !points_on_approval) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        due_date: new Date(due_date),
        location,
        points_on_approval: parseInt(points_on_approval, 10),
      }
    });

    res.status(201).json(task);
  } catch (err) {
    console.error('Failed to create task:', err);
    res.status(500).json({ error: 'Failed to create task' });
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

// GET /api/admin/submissions/:submissionId - Admin only 
// This route fetches a specific submission by ID
app.get('/api/admin/submissions/:submissionId', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const submissionId = parseInt(req.params.submissionId, 10);

  if (isNaN(submissionId)) {
    return res.status(400).json({ error: 'Invalid submission ID' });
  }

  try {
    const submission = await prisma.taskSubmission.findUnique({
      where: { submission_id: submissionId },
      include: {
        user: {
          select: {
            full_name: true,
            legacy: { select: { name: true } }
          }
        },
        task: true
      }
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({
      submitted_evidence: submission.submitted_evidence,
      reviewer_comment: submission.reviewer_comment || null,
      status: submission.status,
      submitted_at: submission.submitted_at
    });
  } catch (err) {
    console.error('Error fetching submission:', err);
    res.status(500).json({ error: 'Server error while fetching submission' });
  }
});

// PATCH /api/admin/tasks/:taskId/review - Admin-only 
// Route to approve or reject a task
app.patch('/api/admin/tasks/:taskId/review', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const taskId = parseInt(req.params.taskId, 10);
  const { userId, action, comment } = req.body;

  if (isNaN(taskId) || isNaN(userId) || !['approve', 'reject'].includes(action)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const latestSubmission = await prisma.taskSubmission.findFirst({
      where: {
        task_id: taskId,
        user_id: userId,
        is_latest: true
      }
    });

    if (!latestSubmission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    const updated = await prisma.taskSubmission.update({
      where: { submission_id: latestSubmission.submission_id },
      data: {
        status: action === 'approve' ? 'Approved' : 'Rejected',
        reviewed_by_user_id: req.user.user_id,
        reviewed_at: new Date(),
        reviewer_comment: comment || '',
      }
    });

    res.json({
      success: true,
      message: `Task ${action}d successfully`,
      newStatus: updated.status
    });
  } catch (err) {
    console.error('Error reviewing task:', err);
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

// GET /api/admin/legacies - Admin Only
// List all legacies
app.get('/api/admin/legacies', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const legacies = await prisma.legacy.findMany({
      select: {
        legacy_id: true,
        name: true
      },
      orderBy: { name: 'asc' }
    });
    res.json(legacies);
  } catch (err) {
    console.error('Error fetching legacies:', err);
    res.status(500).json({ error: 'Failed to fetch legacies' });
  }
});

// GET /api/admin/status-options - Admin Only
// Fetches the available status options for task submissions.
app.get('/api/admin/status-options', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const statusOptions = ['Submitted', 'Approved', 'Rejected'];
    res.json(statusOptions);
  } catch (err) {
    console.error('Error fetching status options:', err);
    res.status(500).json({ error: 'Failed to fetch status options' });
  }
});
// GET /api/legacies/rankings/global - Get global legacy rankings with aggregation
app.get('/api/legacies/rankings/global', async (req, res) => {
  try {
    // Fetch all legacies from the database
    const allLegacies = await prisma.legacy.findMany({
      select: {
        name: true,
        points: true
      }
    });

    // Group legacies by their base name (before space) and sum their points
    const aggregatedLegacies = {};
    
    allLegacies.forEach(legacy => {
      // Extract the base name (e.g., "Ocean SF" -> "Ocean")
      const baseName = legacy.name.split(' ')[0];
      
      // Initialize or add to the base name's total points
      if (!aggregatedLegacies[baseName]) {
        aggregatedLegacies[baseName] = {
          name: baseName,
          points: 0,
          subLegacies: []
        };
      }
      
      // Add points from this legacy to the base name's total
      aggregatedLegacies[baseName].points += legacy.points;
      
      // Store original legacy details for reference
      aggregatedLegacies[baseName].subLegacies.push({
        name: legacy.name,
        points: legacy.points
      });
    });
    
    // Convert the grouped object to an array and sort by points
    const result = Object.values(aggregatedLegacies)
      .sort((a, b) => b.points - a.points)
      .map(({ name, points }) => ({ name, points }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching global legacy rankings:', error);
    res.status(500).json({ error: 'Failed to retrieve global legacy rankings' });
  }
});

// GET /api/legacies/rankings/local/:location - Get local legacy rankings by location
app.get('/api/legacies/rankings/local/:location', async (req, res) => {
  try {
    const location = req.params.location;
    
    // Fetch all legacies for the specified location
    const legacies = await prisma.legacy.findMany({
      where: {
        location_filter: location
      },
      select: {
        name: true,
        points: true
      },
      orderBy: {
        points: 'desc'
      }
    });

    res.json(legacies);
  } catch (error) {
    console.error('Error fetching local legacy rankings:', error);
    res.status(500).json({ error: 'Failed to retrieve local legacy rankings' });
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