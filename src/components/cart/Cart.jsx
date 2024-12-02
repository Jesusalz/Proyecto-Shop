import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '@/store/cartSlice';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);

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
        <CartSummary />
      </div>
    </div>
  );
};

export default Cart;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz