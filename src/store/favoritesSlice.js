import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: []
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(productId);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    }
  }
});

export const { toggleFavorite, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (state, productId) => state.favorites.items.includes(productId);

export default favoritesSlice.reducer;