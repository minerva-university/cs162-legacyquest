import { API_BASE_URL, getAuthHeader } from './apiConfig';

const AdminAPI = {
  /**
   * Get all active task submissions with optional filtering.
   */
  getAllTasks: async (legacyFilter = 'All', statusFilter = 'All') => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/tasks?legacy=${legacyFilter}&status=${statusFilter}`);
      if (!res.ok) throw new Error('Failed to fetch admin tasks');
      return await res.json();
    } catch (err) {
      console.error('AdminAPI.getAllTasks failed:', err);
      return [];
    }
  },

  /**
   * Create a new task to be shown to students.
   */
  createTask: async (taskName, description, dueDate, location = null, points, token) => {
    if (!taskName || !description || !dueDate || !points) {
      return { success: false, message: 'Missing required task information' };
    }
    if (isNaN(points) || points <= 0) {
      return { success: false, message: 'Points must be a positive number' };
    }
  
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: taskName,
          description,
          due_date: dueDate,
          location,
          points_on_approval: Number(points)
        })
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create task');
      }
  
      return {
        success: true,
        message: 'Task created successfully',
        task: data
      };
    } catch (err) {
      console.error('AdminAPI.createTask failed:', err);
      return {
        success: false,
        message: err.message
      };
    }
  },
  
  

  /**
   * Review a task submission (approve/reject). 
   */
  reviewTask: async (taskID, userID, action, comment, token) => {
    const res = await fetch(`${API_BASE_URL}/api/admin/tasks/${taskID}/review`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userID, action, comment })
    });
  
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to review task');
    return result;
  },  

  /**
   * Admin-specific function to fetch evidence for a specific submission.
   */
  getTaskSubmissionDetails: async (submissionId, token) => {
    const res = await fetch(`${API_BASE_URL}/api/admin/submissions/${submissionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to fetch submission details');
    return result;
  },

  /**
   * Admin-specific function to fetch latest evidence for a given task.
   */
  getTaskEvidenceForAdmin: async (taskID, userId, token) => {
    const res = await fetch(`${API_BASE_URL}/api/admin/tasks/${taskID}/evidence?userId=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to fetch admin evidence');
    return result;
  },  

  getAllLegacies: async (token) => {
    const res = await fetch(`${API_BASE_URL}/api/admin/legacies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch legacies');
    return data;
  },

  /**
   * Get all status options for tasks.
  */
  getStatusOptions: async (token) => {
    const res = await fetch(`${API_BASE_URL}/api/admin/status-options`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  
    if (!res.ok) throw new Error('Failed to fetch status options');
    return res.json();
  },
  

  /**
   * Get folder link for legacy group.
   */
  getLegacyFolderLink: async (legacyName) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const folderLinks = {
      'Vista': 'https://drive.google.com/drive/folders/vista-legacy-folder',
      'Tower': 'https://drive.google.com/drive/folders/tower-legacy-folder',
      'Bridge': 'https://drive.google.com/drive/folders/bridge-legacy-folder',
      'Chronicle': 'https://drive.google.com/drive/folders/chronicle-legacy-folder',
      'Pulse': 'https://drive.google.com/drive/folders/pulse-legacy-folder',
    };
    return folderLinks[legacyName] || 'https://drive.google.com/drive/folders/default-folder';
  }
};

export default AdminAPI;
