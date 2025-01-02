import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cartSlice';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Redirigir a la página de confirmación del pedido después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/pedido-confirmado'); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-6">¡Pago Confirmado!</h1>
      <p className="text-gray-600 mb-8">Estamos procesando tu pedido...</p>

      {/* Resumen del Pedido */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded-lg mr-3"
                />
                <div>
                  <h3 className="text-base font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">x {item.quantity}</p>
                </div>
              </div>
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
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

      <p className="mt-8 text-gray-500">Serás redirigido a la confirmación del pedido en 5 segundos...</p>
    </div>
  );
};

export default CheckoutSuccess;