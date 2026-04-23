import apiClient from './client';

export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};

export const eventsApi = {
  getAll: async () => {
    const response = await apiClient.get('/admin/events');
    return response.data;
  },

  approve: async (eventId) => {
    const response = await apiClient.put(`/admin/events/${eventId}/approve`);
    return response.data;
  },

  reject: async (eventId) => {
    const response = await apiClient.put(`/admin/events/${eventId}/reject`);
    return response.data;
  },
};

export const usersApi = {
  getAll: async () => {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },
};

export const reportsApi = {
  get: async () => {
    const response = await apiClient.get('/admin/reports');
    return response.data;
  },
};
