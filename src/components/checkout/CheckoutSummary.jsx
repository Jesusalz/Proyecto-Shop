import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '@/store/cartSlice';

const CheckoutSummary = ({ items, step }) => {
  const total = useSelector(selectCartTotal);

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
      <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>
      
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
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
            <span className="font-medium">${total.toFixed(2)}</span>
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

      <div className="mt-6">
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">
            Paso {step} de 2
          </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
