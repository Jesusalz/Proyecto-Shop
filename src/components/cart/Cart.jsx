import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '@/store/cartSlice';
import { selectIsAuthenticated } from '@/store/authSlice';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common';
import { CreditCardIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout'); // Redirige al checkout
  };

  const handleLogin = () => {
    navigate('/login'); // Redirige al login
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">Tu carrito está vacío</h2>
        <p className="mt-2 text-gray-500">
          Agrega algunos productos a tu carrito para continuar comprando.
        </p>
        <Link 
          to="/products" 
          className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div>
        <CartSummary cartItems={cartItems} /> {/* Pasa cartItems al resumen */}
        {isAuthenticated ? ( // Mostrar "Proceder al Pago" solo si está logueado
          <Button
            onClick={handleCheckout}
            className="w-full mt-6 flex items-center justify-center"
          >
            <CreditCardIcon className="h-5 w-5 mr-2" />
            Proceder al Pago
          </Button>
        ) : ( // Mostrar "Iniciar Sesión para Pagar" si no está logueado
          <Button
            onClick={handleLogin}
            className="w-full mt-6 flex items-center justify-center"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
            Iniciar Sesión para Pagar
          </Button>
        )}
        <Link
          to="/products"
          className="w-full mt-4 inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 text-center"
        >
          Continuar Comprando
        </Link>
        {!isAuthenticated && ( // Mostrar el enlace de registro solo si no está logueado
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz