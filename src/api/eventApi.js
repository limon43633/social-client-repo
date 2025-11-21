// src/api/eventApi.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const eventApi = {
  // Create new event
  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  // Get all upcoming events with filters
  getUpcomingEvents: async (filters = {}) => {
    const response = await api.get('/events/upcoming', { 
      params: filters 
    });
    return response.data;
  },

  // Get single event by ID
  getEventById: async (eventId) => {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  },

  // Join event
  joinEvent: async (eventId, userData) => {
    const response = await api.post(`/events/${eventId}/join`, userData);
    return response.data;
  },

  // Get user's created events
  getUserCreatedEvents: async () => {
    const response = await api.get('/events/user/created');
    return response.data;
  },

  // Get user's joined events
  getUserJoinedEvents: async () => {
    const response = await api.get('/events/user/joined');
    return response.data;
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    const response = await api.put(`/events/${eventId}`, eventData);
    return response.data;
  },

  // Delete event
  deleteEvent: async (eventId) => {
    const response = await api.delete(`/events/${eventId}`);
    return response.data;
  },
};

export default eventApi;