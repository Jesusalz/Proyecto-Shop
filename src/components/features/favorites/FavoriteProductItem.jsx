import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FavoriteButton } from '@/components/features/favorites';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { addToCart } from '@/store/cartSlice';
import { removeFromFavorites } from '@/store/favoritesSlice';

const FavoriteProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    // remover de favoritos al agregar al carrito
    // dispatch(removeFromFavorites(product.id));
  };

  return (
    <div className="flex flex-col h-[280px] shadow-sm rounded-lg hover:shadow-md transition-shadow">
      <div className="relative h-36 w-full overflow-hidden rounded-t-lg">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
    
      <div className="flex flex-col p-3 flex-grow">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-1 mt-1">{product.description}</p>
      
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <div className="flex gap-2">
            <FavoriteButton product={product} />
            <Link to={`/products/${product.id}`}>
              <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-600" />
              </button>
            </Link>
            <button 
              onClick={handleAddToCart}
              className="p-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <ShoppingCartIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FavoriteProductItem;