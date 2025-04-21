/**
 * API configuration helper to ensure consistent API URL handling across the application
 */

// A function that determines the correct API base URL to use
export const getApiBaseUrl = () => {
  // If explicitly defined in the environment, use that value
  if (import.meta.env.VITE_API_URL) {
    // Ensure the URL is well-formed (no trailing slash issues)
    const url = import.meta.env.VITE_API_URL.trim();
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }
  
  // For Vercel deployment, use an empty string for relative URLs
  // This works because the API is available at the same domain
  return '';
};

// Export the API base URL for use in service modules
export const API_BASE_URL = getApiBaseUrl();

// Helper for creating auth headers
export const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});