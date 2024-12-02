import api from './api';

const checkoutService = {
  processOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  // ... más métodos
};
