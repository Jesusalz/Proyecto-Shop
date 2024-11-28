import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('favorites')) || [],
  loading: false,
  error: null
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push(newItem);
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    
    toggleFavorite: (state, action) => {
      const itemId = action.payload.id;
      const existingIndex = state.items.findIndex(item => item.id === itemId);
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }
      
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem('favorites');
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    }
  }
});

// Selectors
export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesCount = (state) => state.favorites.items.length;
export const selectIsFavorite = (productId) => (state) => 
  state.favorites.items.some(item => item.id === productId);
export const selectFavoritesError = (state) => state.favorites.error;

// Actions
export const { 
  addToFavorites, 
  removeFromFavorites, 
  toggleFavorite, 
  clearFavorites,
  setError,
  clearError 
} = favoritesSlice.actions;

// Thunk para manejar favoritos con validación
export const toggleFavoriteWithValidation = (product) => async (dispatch, getState) => {
  try {
    const isFavorite = selectIsFavorite(product.id)(getState());
    
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      return { success: true, message: 'Eliminado de favoritos' };
    } else {
      dispatch(addToFavorites(product));
      return { success: true, message: 'Añadido a favoritos' };
    }
  } catch (error) {
    dispatch(setError('Error al actualizar favoritos'));
    return { success: false, message: 'Error al actualizar favoritos' };
  }
};

export default favoritesSlice.reducer;