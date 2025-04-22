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
            ? (() => {
                // Parse the ISO date string
                const [datePart] = task.due_date.split('T');
                const [year, monthStr, dayStr] = datePart.split('-');
                
                // Convert to month names and date number
                const month = parseInt(monthStr, 10) - 1;
                const day = parseInt(dayStr, 10);
                
                const months = [
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ];
                
                return `${months[month]} ${day}`;
              })()
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
  getSubmissionFolderUrl(legacyName) {
    

    const mapping = {
      'Cable': 'https://drive.google.com/drive/folders/1YNz4Yp5PMgi1zR9TNGkCV5GDVH5NDHu-?usp=drive_link',
      'Chronicle': 'https://drive.google.com/drive/folders/1Yx0DUAnxmUi8uz9luBnBQ3HuT_oDmA92?usp=drive_link',
      'Circuit': 'https://drive.google.com/drive/folders/1db5YlI1rwpmGKa0G8mzw61ML8oCmolCR?usp=drive_link',
      'Civic': 'https://drive.google.com/drive/folders/13krHEwAk5MQm6bPbs8hH4aYy7m3Pu1gy?usp=drive_link',
      'Eureka': 'https://drive.google.com/drive/folders/1TQ3xA0wESQCniZsPc5rXztCI9nClYng2?usp=drive_link',
      'Field': 'https://drive.google.com/drive/folders/1YbbPpvoIX2OqUw2dcsONGudvTeiI30qc?usp=drive_link',
      'Gate': 'https://drive.google.com/drive/folders/13B9Fs6Nu5KUqk-tks-9cebBDJaPZYLaK?usp=drive_link',
      'Hunter': 'https://drive.google.com/drive/folders/1aZlV5WTUtjeI4e-a6LGDtqhmSFFY0_uY?usp=drive_link',
      'Labyrinth': 'https://drive.google.com/drive/folders/18S8cLQM3nTRZckeOdfVZ_O8wcqdCIXNe?usp=drive_link',
      'Lands': 'https://drive.google.com/drive/folders/1GHZi3T7Y_MgPc3VQpkV9ttAB-f7-LGOV?usp=drive_link',
      'Laurel': 'https://drive.google.com/drive/folders/1yADjTCsNR8b00tg6M45PteFDkdBANb0w?usp=drive_link',
      'Legion': 'https://drive.google.com/drive/folders/1crREsKqCMT5x2Mvy7AfIhYvWtaPuGgQw?usp=drive_link',
      'Liberty': 'https://drive.google.com/drive/folders/1RSBj6sPfV_1G7hmhTlUhuBrwjV-s3nDj?usp=drive_link',
      'Mason': 'https://drive.google.com/drive/folders/1iYoZw3wyfFCJ1Z2o8OvFt_CyDJB3MH5K?usp=drive_link',
      'Mission': 'https://drive.google.com/drive/folders/15T3PWlBj8_KsNr1orfG0BHfLZlIzUbA5?usp=drive_link',
      'North': 'https://drive.google.com/drive/folders/1V4VWrHOKecUq59UZxxdmyed-sIWlRGhW?usp=drive_link',
      'Ocean': 'https://drive.google.com/drive/folders/1mZLOJ0svoBZBoorrsUoAyWSOyMNRMgYM?usp=drive_link',
      'Octagon': 'https://drive.google.com/drive/folders/19eX97F0rbLaVEa2q39XLGlmc94aJmu61?usp=drive_link',
      'Pier': 'https://drive.google.com/drive/folders/1iZZF-FaF8UwMmZSCkmUbV6LZksDNubu5?usp=drive_link',
      'Plaza': 'https://drive.google.com/drive/folders/1XbJcgGfO7dDg-jD0y5x09-3nVpRfGJWn?usp=drive_link',
      'Pyramid': 'https://drive.google.com/drive/folders/15RyfvIj_4JtPDNP4LMH9Roe3mvanWsBG?usp=drive_link',
      'Reserve': 'https://drive.google.com/drive/folders/1YrAJr4IbDt_ZalhgYIV5tb4tj9hsOtZ4?usp=drive_link',
      'Tower': 'https://drive.google.com/drive/folders/1Iut-jGg7EQATE09JUjvBK-kq6yZ4tGpj?usp=drive_link',
      'Union': 'https://drive.google.com/drive/folders/1JzhRdqOeNrJjbB4sMvQcDAvRobW3ZXUn?usp=drive_link',
      'Vista': 'https://drive.google.com/drive/folders/1FkPgvcJufuYEyqxi7PRBJa4mVmBnoKvj?usp=drive_link',
    }

    if (legacyName in mapping) {
      return mapping[legacyName]
    }

    const defaultUrl = 'https://drive.google.com/drive/folders/1gdMTa1UiJvnBwFdIVnsiVc0AQ-HYjic5';
    return defaultUrl
  }
};

export default TaskApi;