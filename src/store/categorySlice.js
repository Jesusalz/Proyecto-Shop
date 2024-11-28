import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '@/services';

// Thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await productService.getCategories();
      return categories;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al cargar las categorías');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'categories/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const products = await productService.getByCategory(category);
      return { category, products };
    } catch (error) {
      return rejectWithValue(error.message || 'Error al cargar los productos de la categoría');
    }
  }
);

const initialState = {
  items: [],
  selectedCategory: null,
  categoryProducts: {},
  loading: false,
  error: null,
  lastUpdated: null
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCategoryProducts: (state) => {
      state.categoryProducts = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories cases
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Products by Category cases
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { category, products } = action.payload;
        state.loading = false;
        state.categoryProducts[category] = products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectCategories = (state) => state.categories.items;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;
export const selectSelectedCategory = (state) => state.categories.selectedCategory;
export const selectCategoryProducts = (category) => (state) => 
  state.categories.categoryProducts[category] || [];
export const selectLastUpdated = (state) => state.categories.lastUpdated;

// Actions
export const { 
  setSelectedCategory, 
  clearError, 
  clearCategoryProducts 
} = categorySlice.actions;

export default categorySlice.reducer;
