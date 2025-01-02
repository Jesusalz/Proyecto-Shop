import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '@/services';

const initialState = {
  items: [],
  filteredItems: [],
  selectedProduct: null,
  categories: [],
  loading: false,
  error: null,
  filters: {
    sortBy: '',
    priceRange: {
      min: 0,
      max: Infinity,
    },
  },
  pagination: {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 12,
    hasMore: true,
  },
};

// Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit = 12, skip = 0 }, { rejectWithValue }) => {
    try {
      const response = await productService.getAll({ limit, skip });
      return {
        products: Array.isArray(response) ? response : response.products,
        total: response.total || (Array.isArray(response) ? response.length : 0),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await productService.getByCategory(category);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getCategoryList();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  'products/fetchRelatedProducts',
  async ({ category, currentProductId }, { rejectWithValue }) => {
    try {
      const categoryProducts = await productService.getByCategory(category);
      const allProducts = await productService.getAll();

      const sameCategoryProducts = categoryProducts.products
        .filter((p) => p.id !== currentProductId)
        .slice(0, 4);

      const otherProducts = allProducts.products
        .filter((p) => p.category !== category && p.id !== currentProductId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      return [...sameCategoryProducts, ...otherProducts];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };

      let filteredItems = [...state.items];

      // Aplicar filtro de precio
      if (state.filters.priceRange) {
        filteredItems = filteredItems.filter(
          (item) =>
            item.price >= state.filters.priceRange.min &&
            item.price <= (state.filters.priceRange.max === Infinity
              ? Number.MAX_SAFE_INTEGER
              : state.filters.priceRange.max)
        );
      }

      // Aplicar ordenamiento
      if (state.filters.sortBy) {
        filteredItems.sort((a, b) => {
          switch (state.filters.sortBy) {
            case 'price-asc':
              return a.price - b.price;
            case 'price-desc':
              return b.price - a.price;
            case 'name-asc':
              return a.title.localeCompare(b.title);
            case 'name-desc':
              return b.title.localeCompare(a.title);
            default:
              return 0;
          }
        });
      }

      state.filteredItems = filteredItems;
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.items;
    },

    // Acción para reiniciar la paginación
    resetPagination: (state) => {
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items =
          state.pagination.currentPage === 0
            ? action.payload.products.slice(0, 12)
            : [...state.items, ...action.payload.products.slice(0, 12)];
        state.filteredItems = state.items;
        state.pagination = {
          ...state.pagination,
          currentPage: state.pagination.currentPage + 1,
          totalItems: action.payload.total,
          hasMore: state.items.length < action.payload.total,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.filteredItems = action.payload.products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Exporta las acciones
export const { setFilters, clearFilters, resetPagination } = productSlice.actions;

// Selectores
export const selectAllProducts = (state) => state.products.items;
export const selectFilteredProducts = (state) => state.products.filteredItems;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectRelatedProducts = (state) => state.products.relatedProducts;
export const selectPagination = (state) => state.products.pagination;
export const selectActiveFilters = (state) => state.products.filters;

// Exporta el reducer
export default productSlice.reducer;