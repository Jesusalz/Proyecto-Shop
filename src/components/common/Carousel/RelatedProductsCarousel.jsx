import { useState, useEffect } from 'react';
import { RelatedProductItem } from '@/components/products';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const RelatedProductsCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + productsPerView >= products.length ? 0 : prevIndex + productsPerView
      );
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / productsPerView)}%)` }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-1/4 px-2"
            >
              <RelatedProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
        <button 
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - productsPerView))}
          className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button 
          onClick={() => setCurrentIndex(prev => 
            prev + productsPerView >= products.length ? 0 : prev + productsPerView
          )}
          className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;