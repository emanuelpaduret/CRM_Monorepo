import axios from 'axios';

// Temporary token for non-persistent sessions
let tempToken = null;

export const setTempToken = (token) => {
  tempToken = token;
};

// Create axios instance with base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://crm-3ems.onrender.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || tempToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 unauthorized, clear token and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      tempToken = null;
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (email, password) => API.post('/api/auth/login', { email, password }),
  getMe: () => API.get('/api/auth/me')
};

// Submission endpoints
export const submissions = {
  getAll: (params) => API.get('/api/submissions', { params }),
  getById: (id) => API.get(`/api/submissions/${id}`),
  update: (id, data) => API.put(`/api/submissions/${id}`, data),
  updateStatus: (id, data) => API.patch(`/api/submissions/${id}/status`, data),
  delete: (id) => API.delete(`/api/submissions/${id}`),
  getStats: () => API.get('/api/submissions/stats/dashboard')
};

export default API;