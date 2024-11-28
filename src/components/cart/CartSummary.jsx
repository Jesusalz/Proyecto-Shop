import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '@/store/cartSlice';

const CartSummary = () => {
  const total = useSelector(selectCartTotal);
  
  return (
    <div className="p-4 border-t bg-white">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Envío</span>
          <span>Calculado al finalizar</span>
        </div>
        
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button 
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg 
                   hover:bg-blue-700 transition-colors"
        disabled={total === 0}
      >
        Proceder al pago
      </button>
    </div>
  );
};

export default CartSummary;