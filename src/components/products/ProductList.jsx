import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common';
import { 
  ShoppingCartIcon, 
  HeartIcon,
  StarIcon,
  TagIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ 
  product, 
  onFavoriteToggle, 
  onAddToCart,
  isFavorite,
  loading = false 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-t-lg" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-8 bg-gray-200 rounded" />
        </div>
      </Card>
    );
  }

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <Card className="flex flex-col h-full group">
      {/* Imagen y badges */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 
                   transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-500 
                         text-white rounded-full">
              Nuevo
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-green-500 
                         text-white rounded-full flex items-center">
              <TagIcon className="h-3 w-3 mr-1" />
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Botón favorito */}
        <button
          onClick={() => onFavoriteToggle?.(product.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 
                   hover:bg-white transition-colors"
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Contenido */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Categoría */}
        {product.category && (
          <span className="text-sm text-gray-500 mb-1">
            {product.category}
          </span>
        )}

        {/* Título */}
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h2>
        
        {/* Descripción */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="mt-2 flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">
              ({product.ratingCount || 0})
            </span>
          </div>
        )}

        {/* Precio */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-sm text-orange-600 font-medium">
              ¡Últimas {product.stock} unidades!
            </span>
          )}
        </div>

        {/* Botones */}
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
            onClick={() => onAddToCart?.(product)}
            disabled={product.stock === 0}
            className="flex items-center justify-center px-4 py-2 
                     border border-gray-300 rounded-lg hover:bg-gray-50 
                     transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed"
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};

const ProductList = ({ 
  products = [], 
  onFavoriteToggle, 
  onAddToCart,
  favorites = new Set(),
  loading = false,
  gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
}) => {
  if (loading) {
    return (
      <div className={`grid ${gridCols} gap-6`}>
        {[...Array(6)].map((_, i) => (
          <ProductCard key={i} loading={true} />
        ))}
      </div>
    );
  }

  if (!products.length) {
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
    <div className={`grid ${gridCols} gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onFavoriteToggle={onFavoriteToggle}
          onAddToCart={onAddToCart}
          isFavorite={favorites.has(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;