import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cartSlice';
import { clearCart } from '@/store/cartSlice';

const OrderConfirmedPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Redirigir a la página de productos después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearCart()); // Vacía el carrito después de mostrar los productos
      navigate('/products'); // Redirige a la página de productos
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, dispatch]);

  // Si no hay productos en el carrito, muestra un mensaje
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-8">No hay productos en el carrito.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pedido Confirmado!</h1>
      <p className="text-gray-600 mb-8">Gracias por tu compra. Tu pedido ha sido procesado con éxito.</p>

      {/* Resumen del Pedido */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img
                src={item.thumbnail || '/placeholder-image.jpg'} // Usa un placeholder si no hay imagen
                alt={item.title || 'Producto sin nombre'} // Usa un texto alternativo si no hay nombre
                className="w-12 h-12 object-cover rounded-lg mr-3"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg'; // Muestra un placeholder si la imagen no se carga
                }}
              />
              <div>
                <h3 className="text-base font-medium">
                  {item.title || 'Producto sin nombre'}
                </h3>
                <p className="text-sm text-gray-500">x {item.quantity}</p>
              </div>
            </div>
            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="font-semibold">Total:</span> ${total.toFixed(2)}
        </div>
      </div>

      <p className="mt-8 text-gray-500">Serás redirigido a la página de productos en 5 segundos...</p>
    </div>
  );
};

export default OrderConfirmedPage;