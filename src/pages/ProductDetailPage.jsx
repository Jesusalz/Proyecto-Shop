import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, fetchRelatedProducts, selectRelatedProducts } from '@/store/productSlice';
import { addToCart } from '@/store/cartSlice';
import { Button } from '@/components/common';
import { FavoriteButton } from '@/components/features/favorites';
import { RelatedProductsCarousel } from '@/components/common/Carousel';
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  ShareIcon,
  StarIcon,
  TruckIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector(state => state.products);
  const relatedProducts = useSelector(selectRelatedProducts);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.category) {
      dispatch(fetchRelatedProducts({
        category: product.category,
        currentProductId: product.id
      }));
    }
  }, [dispatch, product?.category, product?.id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    // Opcional: Añadir feedback visual o redirección
    navigate('/cart');
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
        console.error('Error sharing:', err);
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-[300px] object-contain"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-gray-800' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-[60px] object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Reviews section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Opiniones de clientes</h3>
            <div className="grid grid-cols-2 gap-3">
              {(product.reviews || []).slice(0, 4).map((review, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm border">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-1">{review.reviewerName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="mt-2 text-sm text-gray-500">SKU: {product.id}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">${product.price}</p>
              {product.discountPercentage > 0 && (
                <p className="text-sm font-semibold text-red-600">
                  ¡{product.discountPercentage}% de descuento!
                </p>
              )}
            </div>
          </div>

          <div className="py-4">
            <h2 className="text-lg font-semibold mb-2">Descripción del producto</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4 max-w-[600px]">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="flex-1 max-w-[200px] border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors rounded-full py-2"
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Añadir al carrito
              </Button>
              <FavoriteButton product={product} />
              <Button variant="outline" className="rounded-full" onClick={handleShare}>
                <ShareIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <TruckIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-600 text-sm">Envío disponible</p>
                  <p className="text-xs text-green-700">Entrega estimada: 2-4 días</p>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <div className="p-1.5 bg-green-500 rounded-full flex-shrink-0">
                    <CurrencyDollarIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-2">
                    <p className="font-semibold text-green-700 text-sm">30% off en efectivo</p>
                    <p className="text-xs text-green-600">Final: ${(product.price * 0.7).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Métodos de pago disponibles</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <CreditCardIcon className="h-8 w-8 text-gray-600" />
                <span className="ml-3 text-sm font-medium">Tarjeta de crédito</span>
              </div>
              <div className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <BanknotesIcon className="h-8 w-8 text-gray-600" />
                <span className="ml-3 text-sm font-medium">Tarjeta de débito</span>
              </div>
              <div className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <BuildingLibraryIcon className="h-8 w-8 text-gray-600" />
                <span className="ml-3 text-sm font-medium">Transferencia bancaria</span>
              </div>
              <div className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <QrCodeIcon className="h-8 w-8 text-gray-600" />
                <span className="ml-3 text-sm font-medium">Pago con QR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-16 space-y-12">
        {relatedProducts && relatedProducts.length > 0 ? (
          <RelatedProductsCarousel products={relatedProducts} />
        ) : (
          <div className="text-center text-gray-500">
            Cargando productos relacionados...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
//Visita mi GitHub: https://github.com/Jesusalz