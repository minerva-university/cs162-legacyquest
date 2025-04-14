const API_BASE_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const TaskApi = {
  /**
   * Fetches tasks from the backend and formats them for the frontend dashboard.
   * Assumes each task includes its latest submission (if any).
   * @param {string} token - Firebase ID token
   * @returns {Promise<Array<Object>>}
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
      console.log('📦 Raw tasks from backend:', rawTasks);

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

      console.log('🧾 Formatted tasks for dashboard:', formattedTasks);
      return formattedTasks;
    } catch (err) {
      console.error('❌ Error in TaskApi.getAllTasks:', err);
      throw err;
    }
  },

  // --- Placeholder functions to be implemented later ---
  uploadEvidence: async () => {
    throw new Error('uploadEvidence is not implemented yet');
  },

  getTaskEvidence: async () => {
    throw new Error('getTaskEvidence is not implemented yet');
  },

  getTaskComments: async () => {
    throw new Error('getTaskComments is not implemented yet');
  },
};

export default TaskApi;
