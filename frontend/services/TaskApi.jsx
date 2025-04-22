import { API_BASE_URL, getAuthHeader } from './apiConfig';

/**
 * TaskApi - Service for task-related API calls
 */
export const TaskApi = {
  /**
   * Get all tasks available to the current user
   * @param {string} token - User's auth token
   * @returns {Promise<Array>} - Array of tasks
   */
  getTasks: async (token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/tasks` : '/api/tasks';
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
   * Get a specific task by ID
   * @param {string} token - User's auth token
   * @param {string} taskId - ID of the task to fetch
   * @returns {Promise<Object>} - Task details
   */
  getTaskById: async (token, taskId) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/tasks/${taskId}` : `/api/tasks/${taskId}`;
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch task');
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching task ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Submit evidence for a task
   * @param {string} token - User's auth token
   * @param {string} taskId - ID of the task
   * @param {FormData} formData - Form data including evidence files
   * @returns {Promise<Object>} - Submission result
   */
  submitTaskEvidence: async (token, taskId, formData) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/tasks/${taskId}/submit` : `/api/tasks/${taskId}/submit`;
      
      // Special headers for form data (no Content-Type)
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit task evidence');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting task evidence:', error);
      throw error;
    }
  },

  /**
   * Submit evidence for a task
   * @param {string} taskId - ID of the task
   * @param {Object} evidence - Evidence data including description and files
   * @param {string} token - User's auth token
   * @returns {Promise<Object>} - Submission result
   */
  uploadEvidence: async (taskId, evidence, token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/tasks/${taskId}/submit` : `/api/tasks/${taskId}/submit`;
      
      // Create FormData object to handle file uploads
      const formData = new FormData();
      
      // Add description to form data
      if (evidence.description) {
        formData.append('description', evidence.description);
      }
      
      // Add files to form data if they exist
      if (evidence.files && evidence.files.length > 0) {
        for (let i = 0; i < evidence.files.length; i++) {
          formData.append('files', evidence.files[i]);
        }
      }
      
      // Special headers for form data (no Content-Type)
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload evidence');
      }

      return { success: true, message: 'Evidence uploaded successfully' };
    } catch (error) {
      console.error('Error submitting evidence:', error);
      return { success: false, message: error.message || 'Failed to upload evidence' };
    }
  }
};

export default TaskApi;