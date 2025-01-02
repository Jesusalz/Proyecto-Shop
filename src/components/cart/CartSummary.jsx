import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '@/store/cartSlice';

const CartSummary = ({ cartItems = [] }) => { // Valor predeterminado para cartItems
  const total = useSelector(selectCartTotal);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Resumen del Pedido</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span className="text-gray-600">
              {item.title} x {item.quantity}
            </span>
            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="font-medium">
              ${(total - (total * 0.21)).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">IVA (21%)</span>
            <span className="font-medium">
              ${(total * 0.21).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">Envío</span>
            <span className="font-medium">Gratis</span>
          </div>
          <div className="flex justify-between mt-4 text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz