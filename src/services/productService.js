import api from './api';

const productService = {
  getAll: async (params = { limit: 12, skip: 0 }) => {
    try {
      const response = await api.get('/products', { 
        params: {
          limit: params.limit,
          skip: params.skip
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al cargar los productos');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al cargar el producto');
    }
  },

  getByCategory: async (category, params = { limit: 12, skip: 0 }) => {
    try {
      const response = await api.get(`/products/category/${category}`, {
        params: {
          limit: params.limit,
          skip: params.skip
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al cargar los productos de la categoría');
    }
  },  searchProducts: async (query) => {
    try {
      if (!query?.trim()) {
        throw new Error('Término de búsqueda no válido');
      }
      console.log('Searching products with query:', query);
      const response = await api.get(`/products/search?q=${query}`);
      console.log('Search results received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Error en la búsqueda de productos');
    }
  },

  create: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear el producto');
    }
  },

  update: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar el producto');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar el producto');
    }
  },

  getCategoryList: async () => {
    try {
      const response = await api.get('/products/category-list');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al cargar las categorías');
    }
  }
};

export default productService;