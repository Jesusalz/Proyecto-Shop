import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '@/store/cartSlice';

const CheckoutSummary = ({ items }) => {
  const total = useSelector(selectCartTotal);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Resumen del Pedido</h2>

      {/* Productos */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-12 h-12 object-cover rounded-lg mr-3"
              />
              <div>
                <h3 className="text-base font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Desglose de Costos */}
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span>${(total - (total * 0.21)).toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">IVA (21%)</span>
          <span>${(total * 0.21).toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">Envío</span>
          <span>Gratis</span>
        </div>
        <div className="flex justify-between mt-4 text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz