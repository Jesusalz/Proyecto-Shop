import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Validación de datos
      if (!newItem.id || !newItem.price) {
        console.error('El producto no tiene las propiedades requeridas');
        return;
      }

      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ 
          ...newItem, 
          quantity: 1,
          image: newItem.image || '' // Asegura que la imagen se incluya
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      // Manejo de errores
      if (!item) {
        console.error(`Producto con id ${id} no encontrado en el carrito`);
        return;
      }

      item.quantity = quantity;
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

// Selectores
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

export const selectCartItemCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

// Exportaciones
export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;