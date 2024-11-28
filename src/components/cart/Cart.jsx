import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, toggleCart } from '@/store/cartSlice';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Carrito de Compras</h2>
          <button 
            onClick={() => dispatch(toggleCart())}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-180px)] p-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">El carrito está vacío</p>
        ) : (
          items.map(item => (
            <CartItem key={item.id} item={item} />
          ))
        )}
      </div>

      <CartSummary />
    </div>
  );
};

export default Cart;