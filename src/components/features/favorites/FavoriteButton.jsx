import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { toggleFavoriteWithValidation, selectIsFavorite } from '@/store/favoritesSlice';

const FavoriteButton = ({ product }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(product.id));

  const handleToggleFavorite = async (e) => {
    e.preventDefault(); // Para evitar navegación si está dentro de un enlace
    const result = await dispatch(toggleFavoriteWithValidation(product));
    
    // Aquí podrías mostrar una notificación con el resultado
    if (result.success) {
      // toast.success(result.message);
      console.log(result.message);
    } else {
      // toast.error(result.message);
      console.error(result.message);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-colors duration-200
                ${isFavorite 
                  ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
      aria-label={isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
    >
      {isFavorite ? (
        <HeartSolidIcon className="h-5 w-5" />
      ) : (
        <HeartIcon className="h-5 w-5" />
      )}
    </button>
  );
};

export default FavoriteButton;