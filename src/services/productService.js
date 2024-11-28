import api from './config';

export const productService = {
  async getAll(params = {}) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async getByCategory(category) {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  async search(query) {
    const response = await api.get('/products/search', {
      params: { search: query }
    });
    return response.data.products;
  },

  async create(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  async update(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/products/category-list');
    return response.data;
  }
};