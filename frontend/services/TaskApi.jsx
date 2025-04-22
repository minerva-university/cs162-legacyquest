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
  },

  /**
   * Get evidence for a specific task
   * @param {string} taskId - ID of the task
   * @param {string} token - User's auth token
   * @returns {Promise<string>} - Task evidence
   */
  getTaskEvidence: async (taskId, token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/tasks/${taskId}/evidence` : `/api/tasks/${taskId}/evidence`;
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch task evidence');
      }

      const data = await response.json();
      return data.evidence || '';
    } catch (error) {
      console.error(`Error fetching task evidence:`, error);
      return '';
    }
  },

  /**
   * Get admin comments for a specific task
   * @param {string} taskId - ID of the task
   * @param {string} token - User's auth token
   * @returns {Promise<string>} - Admin comments
   */
  getTaskComments: async (taskId, token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/tasks/${taskId}/comments` : `/api/tasks/${taskId}/comments`;
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch task comments');
      }

      const data = await response.json();
      return data.comments || '';
    } catch (error) {
      console.error(`Error fetching task comments:`, error);
      return '';
    }
  },

  /**
   * Get Google Drive folder URL for uploading task evidence
   * @param {string} legacyName - The name of the user's legacy
   * @returns {string} - Google Drive folder URL
   */
  getSubmissionFolderUrl: (legacyName) => {
    // Map legacy names to specific Google Drive folders
    const folderUrls = {
      'Vista': 'https://drive.google.com/drive/folders/1g4PCN0NwmvKZwVHMtZC8ynDxLkVBsXQ5?usp=sharing',
      'Ocean': 'https://drive.google.com/drive/folders/1H2n3df8JK-NBmvQyaW51QRhYLXo34Vux?usp=sharing',
      'Nova': 'https://drive.google.com/drive/folders/1P9ckRJmY5YZx7NfwHjDzExLbcQM2LwEo?usp=sharing',
      'Terra': 'https://drive.google.com/drive/folders/1ag4MNgmRSJN1WhJkDPs4G723gQKVFej8?usp=sharing',
      'Aurora': 'https://drive.google.com/drive/folders/1-5hN3cxdQZ9TVG9wF4Xxh_kJySxtqfMH?usp=sharing',
      'Orion': 'https://drive.google.com/drive/folders/1HDmzno1cJ48A_XRGYYYQJnTVrWB4tzWo?usp=sharing',
      'Astra': 'https://drive.google.com/drive/folders/17EM9cIei8tFlPKXK6rmI9q52OFY4vSXy?usp=sharing',
      // Add more legacies as needed
    };

    // Try to match the legacy name (even partial match)
    const matchingLegacy = Object.keys(folderUrls).find(
      name => legacyName && legacyName.toLowerCase().includes(name.toLowerCase())
    );

    // Return the matching URL or a default URL
    return matchingLegacy ? folderUrls[matchingLegacy] : 
      'https://drive.google.com/drive/folders/1bpL4UfP-L61RpCafPu1AwQfSSdrI7N6Q?usp=sharing'; // Default folder
  }
};

export default TaskApi;