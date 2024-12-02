import axios from 'axios';
import { API_URL, authConfig } from './config';

const userService = {
  // Obtener todos los usuarios
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, authConfig());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un usuario por ID
  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`, authConfig());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(
        `${API_URL}/users/${userId}`, 
        userData, 
        authConfig()
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar usuario
  deleteUser: async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`, authConfig());
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar rol de usuario (solo admin)
  updateUserRole: async (userId, role) => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/${userId}/role`,
        { role },
        authConfig()
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener perfil del usuario actual
  getCurrentUserProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, authConfig());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar perfil del usuario actual
  updateProfile: async (profileData) => {
    try {
      const response = await axios.put(
        `${API_URL}/users/profile`,
        profileData,
        authConfig()
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;