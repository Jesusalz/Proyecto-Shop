import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common';
import { 
  ShoppingCartIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product, onFavoriteToggle, isFavorite }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Card className="flex flex-col h-full">
      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => onFavoriteToggle(product.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 
                   hover:bg-white transition-colors"
        >
          {isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Contenido del producto */}
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h2>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.discount && (
            <span className="text-sm font-medium text-green-600">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Botones de acción */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex items-center justify-center px-4 py-2 
                     bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors"
          >
            Ver Detalles
          </Link>
          <button
            className="flex items-center justify-center px-4 py-2 
                     border border-gray-300 rounded-lg hover:bg-gray-50 
                     transition-colors"
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};

const ProductList = ({ 
  products, 
  onFavoriteToggle, 
  favorites = new Set() 
}) => {
  if (!products?.length) {
    return (
      <Card className="p-8 text-center">
        <div className="text-gray-500">
          <p className="text-xl font-semibold">
            No hay productos disponibles
          </p>
          <p className="mt-2">
            Intenta ajustar los filtros o vuelve más tarde
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onFavoriteToggle={onFavoriteToggle}
          isFavorite={favorites.has(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;