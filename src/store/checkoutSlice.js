import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: null,
  paymentMethod: null,
  orderStatus: null,
  loading: false,
  error: null
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    // ... reducers para el checkout
  }
});
