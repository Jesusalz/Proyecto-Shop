import { useDispatch, useSelector } from 'react-redux';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { toggleFavorite, selectIsFavorite } from '@/store/favoritesSlice';

const FavoriteButton = ({ product }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => selectIsFavorite(state, product.id));

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
      aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      {isFavorite ? (
        <HeartSolidIcon className="h-5 w-5 text-red-500" />
      ) : (
        <HeartIcon className="h-5 w-5 text-gray-400" />
      )}
    </button>
  );
};

export default FavoriteButton;