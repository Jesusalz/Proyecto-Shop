import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cartSlice';
import { clearCart } from '@/store/cartSlice';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Guardar una copia del carrito antes de vaciarlo
  const [cartSnapshot, setCartSnapshot] = useState([]);

  useEffect(() => {
    // Captura el estado actual del carrito
    setCartSnapshot(cartItems);

    const timer = setTimeout(() => {
      dispatch(clearCart()); // Vacía el carrito
      navigate('/products'); // Redirige a la página de productos
    }, 30000); // 30 segundos

    return () => clearTimeout(timer);
  }, [cartItems, navigate, dispatch]);

  // Si no hay productos en el carrito y no hay snapshot, muestra un mensaje
  if (cartSnapshot.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-6">¡Pedido Confirmado!</h1>
          <p className="text-gray-600">No hay productos en el carrito.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">¡Pedido Confirmado!</h1>
        
        {/* Resumen del Pedido */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
          <div className="space-y-4">
            {cartSnapshot.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={item.thumbnail || '/placeholder-image.jpg'}
                    alt={item.title || 'Producto sin nombre'}
                    className="w-12 h-12 object-cover rounded-lg mr-3"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
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
          </div>
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

        {/* Mensaje de Confirmación */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Gracias por tu compra. Pronto recibirás un correo con los detalles de tu pedido.
          </p>
          <button
            onClick={() => {
              dispatch(clearCart());
              navigate('/products');
            }}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Volver a Productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;