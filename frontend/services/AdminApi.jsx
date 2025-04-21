import { API_BASE_URL, getAuthHeader } from './apiConfig';

/**
 * AdminApi - Service for admin-related API calls
 */
export const AdminApi = {
  /**
   * Get all users for admin management
   * @param {string} token - Admin's auth token
   * @returns {Promise<Array>} - Array of users
   */
  getUsers: async (token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/admin/users` : '/api/admin/users';
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get all tasks for admin management
   * @param {string} token - Admin's auth token
   * @returns {Promise<Array>} - Array of tasks
   */
  getTasks: async (token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/admin/tasks` : '/api/admin/tasks';
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  /**
   * Create a new task
   * @param {string} token - Admin's auth token
   * @param {Object} taskData - Task data
   * @returns {Promise<Object>} - Created task
   */
  createTask: async (token, taskData) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/admin/tasks` : '/api/admin/tasks';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: getAuthHeader(token),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  /**
   * Update an existing task
   * @param {string} token - Admin's auth token
   * @param {string} taskId - ID of task to update
   * @param {Object} taskData - Updated task data
   * @returns {Promise<Object>} - Updated task
   */
  updateTask: async (token, taskId, taskData) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/admin/tasks/${taskId}` : `/api/admin/tasks/${taskId}`;
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: getAuthHeader(token),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  /**
   * Delete a task
   * @param {string} token - Admin's auth token
   * @param {string} taskId - ID of task to delete
   * @returns {Promise<Object>} - Delete confirmation
   */
  deleteTask: async (token, taskId) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/admin/tasks/${taskId}` : `/api/admin/tasks/${taskId}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  /**
   * Get task submissions for review
   * @param {string} token - Admin's auth token
   * @returns {Promise<Array>} - Array of submissions
   */
  getSubmissions: async (token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/admin/submissions` : '/api/admin/submissions';
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }
  },

  /**
   * Review a task submission
   * @param {string} token - Admin's auth token
   * @param {string} submissionId - ID of the submission
   * @param {Object} reviewData - Review data (approval status, feedback)
   * @returns {Promise<Object>} - Updated submission
   */
  reviewSubmission: async (token, submissionId, reviewData) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/admin/submissions/${submissionId}/review` : `/api/admin/submissions/${submissionId}/review`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: getAuthHeader(token),
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to review submission');
      }

      return await response.json();
    } catch (error) {
      console.error('Error reviewing submission:', error);
      throw error;
    }
  }
};

export default AdminApi;
