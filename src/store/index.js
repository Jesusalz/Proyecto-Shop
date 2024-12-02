import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth', 'favorites'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedFavoritesReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    favorites: persistedFavoritesReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);