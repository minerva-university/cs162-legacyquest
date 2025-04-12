// =============================================================================
// Task API Service for LegacyQuest Frontend
// =============================================================================
// This service provides functions to interact with the backend API endpoints
// related to tasks and task submissions.
// It handles constructing requests, adding the authorization token, and basic
// response/error handling.
// Assumes the VITE_API_BASE_URL environment variable is set (e.g., in frontend/.env).
// =============================================================================

// Get API base URL from environment variables (defined in frontend/.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to create standard request headers, including Authorization.
const getAuthHeader = (token) => ({
  'Authorization': `Bearer ${token}`, // Sends the Firebase ID token
  'Content-Type': 'application/json' // Default content type
});

const TaskApi = {
  /**
   * Fetches tasks relevant to the authenticated user from the backend.
   * Requires the Firebase ID token for authorization.
   * @param {string} token - The Firebase ID token.
   * @returns {Promise<Array<Object>>} - A promise resolving to an array of task objects from the backend.
   * @throws {Error} - Throws an error if the token is missing or the fetch fails.
   */
  getAllTasks: async (token) => {
    if (!token) throw new Error('Authentication token is required for getAllTasks.');
    try {
      // Calls the backend endpoint (e.g., http://localhost:3001/api/tasks)
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'GET',
        headers: getAuthHeader(token), // Pass token in header
      });
      if (!response.ok) {
        // Attempt to parse error message from backend response
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown API error'}`);
      }
      const tasks = await response.json();

      // --- IMPORTANT: Data Mapping Required ---
      // TODO: The structure of `tasks` received from the backend (based on Prisma schema)
      // might differ from the structure expected by frontend components (e.g., TaskList).
      // Adapt this section to map fields correctly (e.g., task_id -> taskID, title -> name).
      // Example fields expected by frontend: {taskID, name, description, status, dueDate}
      // Check backend response structure (logged below) and update mapping logic.
      console.log("Raw tasks received from backend:", tasks);
      return tasks; // Returning raw backend data for now requires mapping in the component or here.
    } catch (error) {
      console.error("Error in TaskApi.getAllTasks:", error);
      throw error; // Re-throw the error to be handled by the calling component (e.g., DashboardContent)
    }
  },

  /**
   * Uploads submission evidence for a specific task.
   * Requires the Firebase ID token for authorization.
   * @param {number|string} taskID - The ID of the task.
   * @param {string} evidence - The evidence text (adjust if handling files).
   * @param {string} token - The Firebase ID token.
   * @returns {Promise<Object>} - A promise resolving to { success: boolean, message: string }.
   */
  uploadEvidence: async (taskID, evidence, token) => {
    if (!token) throw new Error('Authentication token is required for uploadEvidence.');
    // Basic validation
    if (!taskID || typeof evidence !== 'string') {
      return { success: false, message: 'Task ID and evidence text are required.' };
    }
    try {
      // Assumes backend endpoint POST /api/tasks/:taskId/submissions creates/updates a submission.
      // Assumes evidence is simple text. For file uploads, use FormData and adjust headers.
      const response = await fetch(`${API_BASE_URL}/tasks/${taskID}/submissions`, {
        method: 'POST',
        headers: getAuthHeader(token),
        body: JSON.stringify({ submitted_evidence: evidence }), // Send evidence in request body
      });
      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to upload evidence: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown API error'}`);
      }
      const result = await response.json();
      // Assumes backend returns { success: true, message: '...', submission: {...} } on success.
      return { success: true, message: result.message || 'Evidence submitted successfully!' };
    } catch (error) {
      console.error(`Error in TaskApi.uploadEvidence for task ${taskID}:`, error);
      // Return a consistent error format for the component to handle
      return { success: false, message: error.message || 'Failed to upload evidence. Please try again.' };
    }
  },

  /**
   * Gets the latest submission evidence for a specific task by the authenticated user.
   * Requires the Firebase ID token for authorization.
   * @param {number|string} taskID - The ID of the task.
   * @param {string} token - The Firebase ID token.
   * @returns {Promise<string|null>} - A promise resolving to the evidence text or null if not found.
   * @throws {Error} - Throws an error if the fetch fails (excluding 404).
   */
  getTaskEvidence: async (taskID, token) => {
    if (!token) throw new Error('Authentication token is required for getTaskEvidence.');
    if (!taskID) throw new Error('Task ID is required.');
    try {
      // Assumes backend endpoint GET /api/tasks/:taskId/submissions/latest returns the latest submission.
      const response = await fetch(`${API_BASE_URL}/tasks/${taskID}/submissions/latest`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });
      // 404 is a valid case meaning no submission exists yet.
      if (response.status === 404) {
        console.log(`No evidence found for task ${taskID}.`);
        return null;
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to get evidence: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown API error'}`);
      }
      const submission = await response.json();
      // Return the evidence text if available, otherwise an empty string or null.
      return submission?.submitted_evidence || null;
    } catch (error) {
      console.error(`Error in TaskApi.getTaskEvidence for task ${taskID}:`, error);
      throw error;
    }
  },

  /**
   * Gets the latest submission comments/status for a specific task by the authenticated user.
   * Requires the Firebase ID token for authorization.
   * @param {number|string} taskID - The ID of the task.
   * @param {string} token - The Firebase ID token.
   * @returns {Promise<string|null>} - A promise resolving to formatted comment/status string or null.
   * @throws {Error} - Throws an error if the fetch fails (excluding 404).
   */
  getTaskComments: async (taskID, token) => {
    if (!token) throw new Error('Authentication token is required for getTaskComments.');
    if (!taskID) throw new Error('Task ID is required.');
    try {
      // Assumes backend endpoint GET /api/tasks/:taskId/submissions/latest includes review info.
      // Consider creating a dedicated endpoint if only comments are needed.
      const response = await fetch(`${API_BASE_URL}/tasks/${taskID}/submissions/latest`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });
      // Handle 404: No submission found
      if (response.status === 404) {
          console.log(`No comments/submission found for task ${taskID}.`);
        return null;
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to get comments: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown API error'}`);
      }
      const submission = await response.json();
      // Combine status and reviewer comment into a single string for display.
      let comments = `Status: ${submission?.status || 'N/A'}`;
      if (submission?.reviewer_comment) {
        comments += `\nReviewer Comment: ${submission.reviewer_comment}`;
      }
      return comments;
    } catch (error) {
      console.error(`Error in TaskApi.getTaskComments for task ${taskID}:`, error);
      throw error;
    }
  }
}

export default TaskApi;