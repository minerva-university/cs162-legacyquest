/**
 * API configuration helper to ensure consistent API URL handling across the application
 */

// A function that determines the correct API base URL to use
export const getApiBaseUrl = () => {
  // If explicitly defined in the environment, use that value
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Otherwise, use an empty string, which will make fetch use relative URLs
  // This works because our server.js mounts the API at /api
  return '';
};

// Export the API base URL for use in service modules
export const API_BASE_URL = getApiBaseUrl();

// Helper for creating auth headers
export const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
}); 