import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Acción asíncrona para obtener todos los productos
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${API_URL}/products?limit=20&skip=1`);
  return response.data.products;
});

// Acción asíncrona para obtener un producto por su ID
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) => {
  const response = await axios.get(`${API_URL}/products/${productId}`);
  return response.data;
});

// Otra acción asíncrona para obtener categorías
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get(`${API_URL}/products/category-list`);
  return response.data; 
});

// Nueva acción asíncrona para obtener productos por categoría
export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (category) => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  return response.data.products; 
});

// Slice de productos
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],            // Lista de productos
    selectedProduct: null, // Producto seleccionado
    categories: [],        // Lista de categorías
    loading: false,        // Estado de carga
    error: null,           // Error x si ocurre
  },
  extraReducers: (builder) => {
    builder
      // Reducer para obtener la lista de productos
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Reducer para obtener un producto por el ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload; 
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Reducer para obtener categorías
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; 
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Reducer para obtener productos por categoría
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; 
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
