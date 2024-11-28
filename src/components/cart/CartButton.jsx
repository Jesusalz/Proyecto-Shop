import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { toggleCart, selectCartItemsCount } from '@/store/cartSlice';

const CartButton = () => {
  const dispatch = useDispatch();
  const itemsCount = useSelector(selectCartItemsCount);

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      className="relative p-2 text-gray-600 hover:text-gray-900"
    >
      <ShoppingCartIcon className="h-6 w-6" />
      {itemsCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                        text-xs rounded-full h-5 w-5 flex items-center 
                        justify-center">
          {itemsCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;