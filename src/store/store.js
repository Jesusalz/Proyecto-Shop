import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    products: productReducer,
    categories: categoryReducer, 
  },
});
