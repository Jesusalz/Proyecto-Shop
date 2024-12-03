import api from './api';

const productService = {
  // Método para obtener todos los productos
  // Lo uso cuando necesito cargar la lista completa de productos
  getAll: async (params = { limit: 12, skip: 0 }) => {
    try {
      // Configuro los parámetros de paginación para controlar cuántos productos cargo
      const response = await api.get('/products', { 
        params: {
          limit: params.limit,
          skip: params.skip
        }
      });
      return response.data;
    } catch (error) {
      // Si algo sale mal, lanzo un error descriptivo
      throw new Error(error.response?.data?.message || 'Error al cargar los productos');
    }
  },

  // Método para obtener un producto específico por su ID
  // Lo uso cuando necesito los detalles de un producto en particular
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      // Manejo de errores si no puedo recuperar el producto
      throw new Error(error.response?.data?.message || 'Error al cargar el producto');
    }
  },

  // Método para obtener productos por categoría
  // Útil cuando quiero filtrar productos de una categoría específica
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
      // Manejo de errores si no puedo recuperar los productos de la categoría
      throw new Error(error.response?.data?.message || 'Error al cargar los productos de la categoría');
    }
  },

  // Método principal de búsqueda de productos
  // Lo uso para encontrar productos basándome en un término de búsqueda
  searchProducts: async (query, options = { limit: 20, skip: 0 }) => {
    try {
      // Valido que el término de búsqueda no esté vacío
      // Me aseguro de tener al menos 2 caracteres para hacer una búsqueda significativa
      if (!query?.trim()) {
        throw new Error('Término de búsqueda no válido');
      }

      // Sanitizo el término de búsqueda para evitar caracteres especiales
      // Esto me ayuda a prevenir posibles inyecciones o búsquedas maliciosas
      const sanitizedQuery = query.trim().replace(/[^\w\s]/gi, '');

      // Registro en consola para depuración
      console.log('Buscando productos con el término:', sanitizedQuery);

      // Realizo la búsqueda con parámetros personalizables
      const response = await api.get('/products/search', {
        params: {
          q: sanitizedQuery,
          limit: options.limit,
          skip: options.skip
        }
      });

      // Registro los resultados para depuración
      console.log('Resultados de búsqueda recibidos:', response.data);

      // Devuelvo un objeto estructurado con los resultados
      return {
        products: response.data,
        total: response.data.length,
        query: sanitizedQuery
      };
    } catch (error) {
      // Manejo de errores detallado
      // Me permite identificar exactamente qué salió mal durante la búsqueda
      console.error('Error buscando productos:', error);
      
      if (error.response) {
        // Error de respuesta del servidor
        throw new Error(error.response.data.message || 'Error en la búsqueda de productos');
      } else if (error.request) {
        // Error de conexión
        throw new Error('No se pudo conectar con el servidor');
      } else {
        // Otros errores
        throw new Error(error.message || 'Error desconocido en la búsqueda');
      }
    }
  },

  // Método para crear un nuevo producto
  // Lo uso cuando necesito agregar un producto al catálogo
  create: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      // Manejo de errores si no puedo crear el producto
      throw new Error(error.response?.data?.message || 'Error al crear el producto');
    }
  },

  // Método para actualizar un producto existente
  // Útil cuando necesito modificar la información de un producto
  update: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      // Manejo de errores si no puedo actualizar el producto
      throw new Error(error.response?.data?.message || 'Error al actualizar el producto');
    }
  },

  // Método para eliminar un producto
  // Lo uso cuando necesito remover un producto del catálogo
  delete: async (id) => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      // Manejo de errores si no puedo eliminar el producto
      throw new Error(error.response?.data?.message || 'Error al eliminar el producto');
    }
  },

  // Método para obtener la lista de categorías
  // Útil para poblar menús desplegables o filtros de categoría
  getCategoryList: async () => {
    try {
      const response = await api.get('/products/category-list');
      return response.data;
    } catch (error) {
      // Manejo de errores si no puedo recuperar las categorías
      throw new Error(error.response?.data?.message || 'Error al cargar las categorías');
    }
  }
};

export default productService;
