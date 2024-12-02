import React from 'react';
import { useDispatch } from 'react-redux';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { addToCart } from '@/store/cartSlice';

const CartButton = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
    >
      <ShoppingCartIcon className="h-5 w-5 mr-2" />
      Añadir al carrito
    </button>
  );
};

export default CartButton;