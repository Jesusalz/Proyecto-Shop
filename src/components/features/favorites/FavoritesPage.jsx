import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectFavorites, clearFavorites } from '@/store/favoritesSlice';
import { ProductList } from '@/components/products';
import { Button } from '@/components/common';
import { HeartIcon, TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { FavoriteProductItem } from '@/components/features/favorites';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavorites);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <HeartIcon className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">
            Mis Favoritos ({favoriteProducts.length})
          </h1>
        </div>

        <div className="flex gap-4">
          {favoriteProducts.length > 0 && (
            <Button
              variant="outline"
              onClick={() => dispatch(clearFavorites())}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Limpiar favoritos
            </Button>
          )}
          
          <Link to="/products">
            <Button
              variant="primary"
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Seguir comprando
            </Button>
          </Link>
        </div>
      </div>
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteProducts.map(product => (
              <FavoriteProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No tienes favoritos
            </h3>
            <p className="mt-1 text-gray-500">
              Explora nuestros productos y guarda tus favoritos
            </p>
            <Link to="/products">
              <Button
                variant="primary"
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Ver productos
              </Button>
            </Link>
          </div>
        )}
      </div>
  );
};

export default FavoritesPage;

