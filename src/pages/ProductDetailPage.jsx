import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '@/store/productSlice';
import { addToCart } from '@/store/cartSlice';
import { Button, Card } from '@/components/common';
import { 
  ArrowLeftIcon,
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector(state => state.products);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    // Opcional: Mostrar notificación de éxito
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error compartiendo:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="m-4 p-6 bg-red-50">
        <div className="text-center text-red-600">
          <h2 className="text-lg font-semibold">Error al cargar el producto</h2>
          <p className="mt-2">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate(-1)}
          >
            Volver atrás
          </Button>
        </div>
      </Card>
    );
  }

  if (!product) {
    return (
      <Card className="m-4 p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Producto no encontrado</h2>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate(-1)}
          >
            Volver atrás
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Botón Volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-center object-cover"
            />
          </div>
          
          {/* Miniaturas */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden
                          ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-center object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Categoría: {product.category}
            </p>
          </div>

          {/* Precio y calificación */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              {product.discount && (
                <p className="text-sm text-green-600 font-medium">
                  {product.discount}% de descuento
                </p>
              )}
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < (product.rating || 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Descripción
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cantidad
            </label>
            <div className="mt-1 flex items-center space-x-3">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 rounded-md border hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-lg font-medium w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 rounded-md border hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Añadir al carrito
            </Button>
            <Button
              variant="outline"
              onClick={() => {/* Toggle favorito */}}
            >
              <HeartIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
            >
              <ShareIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Información adicional */}
          <div className="border-t pt-6 space-y-4">
            {product.features?.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;