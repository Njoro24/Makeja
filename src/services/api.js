import axios from 'axios';
import { toast } from 'react-toastify';
import { getItem, removeItem, STORAGE_KEYS } from '../utils/localStorage';

// Create axios instance with base configuration
const api = axios.create({
  // For Vite - use import.meta.env with VITE_ prefix
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://makejabe-1.onrender.com/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    // Log request in development
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data
      });
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      const duration = new Date() - response.config.metadata?.startTime;
      console.log('✅ API Response:', {
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        status: response.status,
        duration: `${duration}ms`,
        data: response.data
      });
    }
    
    return response;
  },
  (error) => {
    // Log error in development
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.error('API Error:', {
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        response: error.response?.data
      });
    }

    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          handleUnauthorizedError();
          break;
        case 403:
          // Forbidden - insufficient permissions
          toast.error('Access denied. You do not have permission to perform this action.');
          break;
        case 404:
          // Not found
          toast.error('Requested resource not found.');
          break;
        case 422:
          // Validation errors
          handleValidationErrors(data);
          break;
        case 429:
          // Rate limit exceeded
          toast.error('Too many requests. Please try again later.');
          break;
        case 500:
          // Server error
          toast.error('Internal server error. Please try again later.');
          break;
        default:
          // Other errors
          const message = data?.message || 'An unexpected error occurred';
          toast.error(message);
      }
    } else if (error.request) {
      // Request made but no response received
      if (error.code === 'ECONNABORTED') {
        toast.error('Request timeout. Please check your internet connection.');
      } else {
        toast.error('Network error. Please check your internet connection.');
      }
    } else {
      // Something else happened
      toast.error('An unexpected error occurred. Please try again.');
    }
    
    return Promise.reject(error);
  }
);

/**
 * Handle unauthorized error (401)
 */
const handleUnauthorizedError = () => {
  // Clear stored auth data
  removeItem(STORAGE_KEYS.AUTH_TOKEN);
  removeItem(STORAGE_KEYS.USER_DATA);
  
  // Show error message
  toast.error('Session expired. Please log in again.');
  
  // Redirect to login page
  window.location.href = '/login';
};

/**
 * Handle validation errors (422)
 * @param {object} data 
 */
const handleValidationErrors = (data) => {
  if (data.errors && typeof data.errors === 'object') {
    // Handle multiple validation errors
    Object.values(data.errors).forEach(errorArray => {
      if (Array.isArray(errorArray)) {
        errorArray.forEach(error => toast.error(error));
      } else {
        toast.error(errorArray);
      }
    });
  } else {
    // Handle single validation error
    const message = data.message || 'Validation failed';
    toast.error(message);
  }
};

/**
 * Generic API request function
 * @param {string} method 
 * @param {string} url 
 * @param {object} data 
 * @param {object} config 
 * @returns {Promise} 
 */
const apiRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config
    });
    
    return {
      success: true,
      data: response.data,
      status: response.status,
      headers: response.headers
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status || 500
    };
  }
};

// HTTP method functions
export const get = (url, config = {}) => apiRequest('GET', url, null, config);
export const post = (url, data, config = {}) => apiRequest('POST', url, data, config);
export const put = (url, data, config = {}) => apiRequest('PUT', url, data, config);
export const patch = (url, data, config = {}) => apiRequest('PATCH', url, data, config);
export const del = (url, config = {}) => apiRequest('DELETE', url, null, config);

// File upload function
export const uploadFile = async (url, file, onUploadProgress = null) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: onUploadProgress ? (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onUploadProgress(percentCompleted);
    } : undefined,
  };
  
  return post(url, formData, config);
};

// API endpoint constants
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  
  // User
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  CHANGE_PASSWORD: '/user/change-password',
  UPLOAD_AVATAR: '/user/avatar',
  
  // Hostels
  HOSTELS: '/hostels',
  HOSTEL_DETAILS: (id) => `/hostels/${id}`,
  SEARCH_HOSTELS: '/hostels/search',
  FEATURED_HOSTELS: '/hostels/featured',
  MY_HOSTELS: '/hostels/my-hostels',
  
  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_DETAILS: (id) => `/bookings/${id}`,
  CREATE_BOOKING: '/bookings',
  CANCEL_BOOKING: (id) => `/bookings/${id}/cancel`,
  MY_BOOKINGS: '/bookings/my-bookings',
  
  // Reviews
  REVIEWS: '/reviews',
  HOSTEL_REVIEWS: (hostelId) => `/reviews/hostel/${hostelId}`,
  CREATE_REVIEW: '/reviews',
  UPDATE_REVIEW: (id) => `/reviews/${id}`,
  DELETE_REVIEW: (id) => `/reviews/${id}`,
  
  // Admin
  ADMIN_USERS: '/admin/users',
  ADMIN_HOSTELS: '/admin/hostels',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_STATS: '/admin/stats',
  
  // Utilities
  LOCATIONS: '/utils/locations',
  UNIVERSITIES: '/utils/universities',
  UPLOAD_IMAGE: '/utils/upload-image'
};

// Helper functions for common API operations
export const apiHelpers = {
  /**
   * Set authentication token
   * @param {string} token 
   */
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },

  /**
   * Clear authentication token
   */
  clearAuthToken: () => {
    delete api.defaults.headers.common['Authorization'];
  },

  /**
   * Get current auth token from headers
   * @returns {string|null} 
   */
  getAuthToken: () => {
    const authHeader = api.defaults.headers.common['Authorization'];
    return authHeader ? authHeader.replace('Bearer ', '') : null;
  },

  /**
   * Build query string from parameters
   * @param {object} params 
   * @returns {string} 
   */
  buildQueryString: (params) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    
    return searchParams.toString();
  },

  /**
   * Make paginated request
   * @param {string} url 
   * @param {object} params
   * @returns {Promise} 
   */
  paginatedRequest: async (url, params = {}) => {
    const queryString = apiHelpers.buildQueryString(params);
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    return get(fullUrl);
  }
};

export default api;