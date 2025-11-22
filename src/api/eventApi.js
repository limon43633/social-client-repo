import axios from 'axios';

// ✅ API Base URL - environment variable থেকে নিবে
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS with credentials
});

// Request interceptor - Add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging (remove in production)
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    // Log successful response (remove in production)
    console.log(`API Response: ${response.config.method.toUpperCase()} ${response.config.url} - Success`);
    return response;
  },
  (error) => {
    // Log error response
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - maybe redirect to login
      console.log('Unauthorized - Token might be invalid');
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Event API methods
export const eventApi = {
  // Create new event
  createEvent: async (eventData) => {
    const response = await api.post('/api/events', eventData);
    return response.data;
  },

  // Get all upcoming events with filters
  getUpcomingEvents: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.eventType && filters.eventType !== 'all') {
      params.append('eventType', filters.eventType);
    }
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const response = await api.get(`/api/events/upcoming?${params.toString()}`);
    return response.data;
  },

  // Get single event by ID
  getEventById: async (eventId) => {
    const response = await api.get(`/api/events/${eventId}`);
    return response.data;
  },

  // Join event
  joinEvent: async (eventId, userData) => {
    const response = await api.post(`/api/events/${eventId}/join`, userData);
    return response.data;
  },

  // Get user's created events
  getUserCreatedEvents: async () => {
    const response = await api.get('/api/events/user/created');
    return response.data;
  },

  // Get user's joined events
  getUserJoinedEvents: async () => {
    const response = await api.get('/api/events/user/joined');
    return response.data;
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    const response = await api.put(`/api/events/${eventId}`, eventData);
    return response.data;
  },

  // Delete event
  deleteEvent: async (eventId) => {
    const response = await api.delete(`/api/events/${eventId}`);
    return response.data;
  },
};

export default eventApi;