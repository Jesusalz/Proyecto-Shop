import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@/services';

export const fetchRecentOrders = createAsyncThunk(
  'user/fetchRecentOrders',
  async () => {
    const response = await userService.getRecentOrders();
    return response.data;
  }
);

export const fetchRecentlyViewedProducts = createAsyncThunk(
  'user/fetchRecentlyViewedProducts',
  async () => {
    const response = await userService.getRecentlyViewedProducts();
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    recentOrders: [],
    recentlyViewedProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.recentOrders = action.payload;
      })
      .addCase(fetchRecentOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecentlyViewedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentlyViewedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyViewedProducts = action.payload;
      })
      .addCase(fetchRecentlyViewedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;