import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectFavorites, 
  clearFavorites 
} from '@/store/favoritesSlice';
import { ProductList } from '@/components/products';
import { Button } from '@/components/common';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <HeartIcon className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">
            Mis Favoritos ({favorites.length})
          </h1>
        </div>

        {favorites.length > 0 && (
          <Button
            variant="outline"
            onClick={() => dispatch(clearFavorites())}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Limpiar favoritos
          </Button>
        )}
      </div>

      {favorites.length > 0 ? (
        <ProductList products={favorites} />
      ) : (
        <div className="text-center py-12">
          <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No tienes favoritos
          </h3>
          <p className="mt-1 text-gray-500">
            Explora nuestros productos y guarda tus favoritos
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;