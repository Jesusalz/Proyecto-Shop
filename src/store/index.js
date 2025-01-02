import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension'; // Importa composeWithDevTools
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
import { combineReducers } from 'redux';

// Importa tus reducers
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';

// Combina los reducers
const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
  products: productReducer,
  categories: categoryReducer,
  cart: cartReducer,
});

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth', 'favorites'], // Estados que deseas persistir
};

// Crea el reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura el store con Redux DevTools
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: composeWithDevTools(), // Habilita Redux DevTools
});

// Crea el persistor para Redux Persist
export const persistor = persistStore(store);