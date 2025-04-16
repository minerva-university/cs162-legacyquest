const API_BASE_URL = import.meta.env.VITE_API_URL;

// Adds token and content headers for authenticated requests
const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const TaskApi = {
  /**
   * Fetches and formats task data for the dashboard.
   * Assumes backend returns tasks with most recent submission included.
   */
  getAllTasks: async (token) => {
    if (!token) throw new Error('Authentication token is required for getAllTasks.');

    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch tasks: ${res.status} ${res.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const rawTasks = await res.json();

      // Map backend structure to frontend-friendly task format
      const formattedTasks = rawTasks.map((task) => {
        const latest = task.submissions?.[0];

        return {
          taskID: task.task_id,
          name: task.title,
          description: task.description || '',
          status: latest?.status || 'Not Submitted',
          dueDate: task.due_date
            ? new Date(task.due_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            : 'N/A',
          points_on_approval: task.points_on_approval,
          latest_submission: latest || null,
        };
      });

      return formattedTasks;
    } catch (err) {
      throw err;
    }
  },

  // Uploads evidence for a specific task
  uploadEvidence: async (taskID, evidence, token) => {
    if (!token) throw new Error('Authentication token is required for uploading evidence.');
  
    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks/${taskID}/submissions`, {
        method: 'POST',
        headers: getAuthHeader(token),
        body: JSON.stringify({ submitted_evidence: evidence }), // 👈 schema field match
      });
  
      const result = await res.json();
  
      if (!res.ok) throw new Error(result.error || 'Upload failed.');
      return result;
    } catch (err) {
      console.error('Error in TaskApi.uploadEvidence:', err);
      return { success: false, message: err.message };
    }
  },
  

  // Fetch user's latest submitted evidence for a task
  getTaskEvidence: async (taskID, token) => {
    console.log(`Fetching evidence for task ID: ${taskID}`);
    if (!token) throw new Error('Token required');
    const res = await fetch(`${API_BASE_URL}/api/tasks/${taskID}/submissions/latest`, {
      method: 'GET',
      headers: getAuthHeader(token),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to fetch evidence.');
    return result.submitted_evidence || '';
  },

  // Fetch reviewer comment for the latest submission of a task
  getTaskComments: async (taskID, token) => {
    if (!token) throw new Error('Token required');
    const res = await fetch(`${API_BASE_URL}/api/tasks/${taskID}/submissions/latest`, {
      method: 'GET',
      headers: getAuthHeader(token),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to fetch reviewer comment.');
    return result.reviewer_comment || '';
  },

  // Returns the URL for the user's legacy's Google drive submission folder
  // Merxon's note: I assume the url can be hardcoded somewhere or be stored in the session? So I did not make it an async function.
  // Please let me know if backend decide to make this async so I will update the frontend to handle this change!
  getSubmissionFolderUrl() {
    // Dummy url
    const url = 'https://drive.google.com/drive/folders/1gdMTa1UiJvnBwFdIVnsiVc0AQ-HYjic5';

    return url
  }
};

export default TaskApi;