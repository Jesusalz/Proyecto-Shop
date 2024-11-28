import api from './config';

export const userService = {
  async getAll(params = {}) {
    const response = await api.get('/users', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async create(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  async update(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async updateRole(id, role) {
    const response = await api.put(`/users/${id}/role`, { role });
    return response.data;
  },

  async toggleStatus(id) {
    const response = await api.put(`/users/${id}/toggle-status`);
    return response.data;
  }
};