import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  isOpen: false,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    setCartError: (state, action) => {
      state.error = action.payload;
    },

    setCartLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => 
    total + (item.price * item.quantity), 0);

export const selectCartItemsCount = (state) => 
  state.cart.items.reduce((count, item) => 
    count + item.quantity, 0);

export const selectCartIsOpen = (state) => 
  state.cart.isOpen;

export const selectItemQuantity = (id) => (state) => {
  const item = state.cart.items.find(item => item.id === id);
  return item ? item.quantity : 0;
};

// Thunk para añadir al carrito con validación de stock
export const addToCartWithValidation = (product, quantity = 1) => 
  async (dispatch, getState) => {
    try {
      dispatch(setCartLoading(true));
      
      // Aquí podrías hacer una llamada a la API para verificar el stock
      // const stockResponse = await checkProductStock(product.id);
      
      const currentQuantity = selectItemQuantity(product.id)(getState());
      const newQuantity = currentQuantity + quantity;
      
      if (newQuantity > product.stock) {
        dispatch(setCartError('No hay suficiente stock disponible'));
        return false;
      }
      
      dispatch(addToCart({ ...product, quantity }));
      return true;
    } catch (error) {
      dispatch(setCartError('Error al añadir al carrito'));
      return false;
    } finally {
      dispatch(setCartLoading(false));
    }
  };

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartError,
  setCartLoading
} = cartSlice.actions;

export default cartSlice.reducer;