import api from './api';

const productService = {
  getAll: async (params = { limit: 8, skip: 0 }) => {
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
  },

  searchProducts: async (query, options = { limit: 20, skip: 0 }) => {
    try {
      // Validaciones
      if (!query?.trim()) {
        throw new Error('Término de búsqueda no válido');
      }

      // Validar longitud mínima
      if (query.trim().length < 2) {
        throw new Error('El término de búsqueda debe tener al menos 2 caracteres');
      }

      // Sanitizar consulta
      const sanitizedQuery = query.trim().replace(/[^\w\s]/gi, '');

      // Cambiar el parámetro de búsqueda a 'search'
      const response = await api.get('/products/search', {
        params: {
          search: sanitizedQuery,
          limit: options.limit,
          skip: options.skip
        }
      });

      // Acceder correctamente a la propiedad 'products'
      return {
        products: response.data.products,
        total: response.data.products.length,
        query: sanitizedQuery
      };
    } catch (error) {
      // Manejo de errores detallado
      console.error('Error searching products:', error);
      
      if (error.response) {
        throw new Error(error.response.data.message || 'Error en la búsqueda de productos');
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error(error.message || 'Error desconocido en la búsqueda');
      }
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