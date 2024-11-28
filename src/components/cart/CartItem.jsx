import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4 p-2 border rounded-lg">
      <img 
        src={item.images[0]} 
        alt={item.title}
        className="w-20 h-20 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-gray-600">${item.price}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          
          <span className="w-8 text-center">{item.quantity}</span>
          
          <button
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="ml-auto text-red-500 hover:text-red-700 p-1 rounded"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;