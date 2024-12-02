import axios from 'axios';
import { API_URL } from './config';

const cartService = {
  // Obtener el carrito del usuario
  getCart: async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Añadir item al carrito
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${API_URL}/cart/items`, {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar cantidad de un item
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await axios.put(`${API_URL}/cart/items/${itemId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar item del carrito
  removeFromCart: async (itemId) => {
    try {
      await axios.delete(`${API_URL}/cart/items/${itemId}`);
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Limpiar carrito
  clearCart: async () => {
    try {
      await axios.delete(`${API_URL}/cart`);
      return true;
    } catch (error) {
      throw error;
    }
  }
};

export default cartService;
