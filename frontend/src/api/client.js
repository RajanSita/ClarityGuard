/**
 * ClarityGuard — API Client
 *
 * Centralized HTTP client for all backend communication.
 * Handles auth tokens, error formatting, and base URL configuration.
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s timeout for LLM calls
});

// Request interceptor — attach auth token if available
apiClient.interceptors.request.use(
  async (config) => {
    // Firebase auth token will be added here in Phase 6
    // const auth = getAuth();
    // const user = auth.currentUser;
    // if (user) {
    //   const token = await user.getIdToken();
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — normalize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Rate limit hit
      if (error.response.status === 429) {
        throw new Error('Rate limit reached. Please wait before scanning again.');
      }
      // Server error
      if (error.response.status >= 500) {
        throw new Error('Server error. Please try again in a moment.');
      }
      // Validation error
      if (error.response.status === 422) {
        const detail = error.response.data?.detail;
        if (Array.isArray(detail)) {
          throw new Error(detail.map(d => d.msg).join(', '));
        }
        throw new Error('Invalid input. Please check your text and try again.');
      }
      throw new Error(error.response.data?.detail || 'An error occurred.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. The analysis is taking too long.');
    }
    throw new Error('Unable to connect to the server. Please check your connection.');
  }
);

/**
 * Scan text for manipulation mechanisms.
 * @param {string} text - The text to analyze
 * @param {"contract" | "message"} type - Type of text
 * @returns {Promise<object>} Scan response with flags
 */
export const scanText = async (text, type) => {
  const response = await apiClient.post('/api/scan', { text, type });
  return response.data;
};

/**
 * Health check — verify backend is running.
 */
export const healthCheck = async () => {
  const response = await apiClient.get('/api/health');
  return response.data;
};

export default apiClient;
