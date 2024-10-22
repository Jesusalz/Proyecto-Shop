import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;  


export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    
    if (response && response.data) {
      return response.data; 
    } else {
      throw new Error('Formato inesperado de respuesta al obtener los productos');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error al obtener los productos');
  }
};


export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Formato inesperado de respuesta al obtener el producto');
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Error al obtener el producto');
  }
};


export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response && response.data) {
      return response.data; 
    } else {
      throw new Error('Error inesperado al iniciar sesión');
    }
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message 
      ? error.response.data.message 
      : 'Error al iniciar sesión';
    throw new Error(message);
  }
};


export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    if (response && response.data) {
      return response.data; 
    } else {
      throw new Error('Error inesperado al obtener los usuarios');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error al obtener los usuarios');
  }
};


export const fetchCategoryList = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/category-list`);
    if (response && response.data) {
      return response.data; 
    } else {
      throw new Error('Error inesperado al obtener la lista de categorías');
    }
  } catch (error) {
    console.error('Error fetching category list:', error);
    throw new Error('Error al obtener la lista de categorías');
  }
};


export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    if (response && response.data) {
      return response.data; 
    } else {
      throw new Error('Error inesperado al obtener productos de la categoría');
    }
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Error al obtener productos de la categoría');
  }
};


export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/products/search`, { params: { search: query } });
    if (response && response.data) {
      return response.data.products;  
    } else {
      throw new Error('Error inesperado al buscar productos');
    }
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Error al buscar productos');
  }
};
