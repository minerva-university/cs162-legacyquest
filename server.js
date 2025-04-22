const express = require('express');
const path = require('path');

// Assuming backend/server.js now exports the configured Express app
// Note: All middleware (cors, json parsing), routes, etc. 
// are expected to be configured within the exported 'apiApp' instance.
const apiApp = require('./backend/server'); 

const mainApp = express();

// Mount the API app under the /api path
// IMPORTANT: Ensure the routes within apiApp *do not* already include /api
// For example, a route defined as app.get('/me') in backend/server.js 
// will be accessible at /api/me here.
mainApp.use('/api', apiApp);

// --- Static file serving for the frontend ---
const frontendDistPath = path.join(__dirname, 'frontend', 'dist');
console.log(`Serving static files from: ${frontendDistPath}`)

// Serve static files (HTML, CSS, JS) from the frontend build directory
mainApp.use(express.static(frontendDistPath));

// --- SPA Fallback --- 
// For any request that doesn't match a static file or an API route, 
// serve the frontend's index.html file. This allows client-side routing to work.
mainApp.get('*', (req, res) => {
  // Check if the request looks like an API call that wasn't handled
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  // Otherwise, serve the main HTML file for the frontend SPA
  const indexPath = path.join(frontendDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
        console.error("Error sending index.html:", err);
        res.status(500).send(err)
    }
  });
});

// --- Start the main server ---
const PORT = process.env.PORT || 3001; // Kinsta/Sevalla will provide PORT
mainApp.listen(PORT, () => {
  console.log(`Main server (Web Process) running on port ${PORT}`);
  console.log(`API routes mounted under /api`);
  console.log(`Frontend served from ./frontend/dist`);
});

// Optional: Add basic graceful shutdown for the main server if needed
// (Prisma shutdown should happen implicitly when the main process exits)
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing main server.');
    // Perform any cleanup here if necessary before exiting
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing main server.');
    // Perform any cleanup here if necessary before exiting
    process.exit(0);
});

// GET /api/admin/legacies - Admin Only
// List all legacies
app.get('/api/admin/legacies', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const legacies = await prisma.legacy.findMany({
      select: { legacy_id: true, name: true }
    });

    // Group by base name (before the first space)
    const baseLegacyMap = {};
    for (const legacy of legacies) {
      const baseName = legacy.name.split(' ')[0];
      if (!baseLegacyMap[baseName]) {
        baseLegacyMap[baseName] = {
          name: baseName,
          legacy_ids: []
        };
      }
      baseLegacyMap[baseName].legacy_ids.push(legacy.legacy_id);
    }

    // Return base names for filter dropdown
    const baseLegacyList = Object.values(baseLegacyMap);
    res.json(baseLegacyList);
  } catch (err) {
    console.error('Error fetching legacies:', err);
    res.status(500).json({ error: 'Failed to fetch legacies' });
  }
});