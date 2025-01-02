import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Carousel = ({ 
  items, 
  renderItem, 
  itemsPerView = 4, 
  autoplayTime = 4000,
  title 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [responsiveItemsPerView, setResponsiveItemsPerView] = useState(itemsPerView);

  // Ajustar itemsPerView según el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setResponsiveItemsPerView(1); // 1 item en móviles
      } else if (window.innerWidth < 1024) {
        setResponsiveItemsPerView(2); // 2 items en tablets
      } else {
        setResponsiveItemsPerView(itemsPerView); // itemsPerView en desktop
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamar al inicio para establecer el valor inicial
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex + responsiveItemsPerView >= items.length ? 0 : prevIndex + 1
    );
  }, [items.length, responsiveItemsPerView]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, items.length - responsiveItemsPerView) : prevIndex - 1
    );
  }, [items.length, responsiveItemsPerView]);

  // Autoplay
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, autoplayTime);
      return () => clearInterval(interval);
    }
  }, [isHovered, autoplayTime, nextSlide]);

  // Calcular el ancho de cada item
  const itemWidth = useMemo(() => `${100 / responsiveItemsPerView}%`, [responsiveItemsPerView]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div className="overflow-hidden relative rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / responsiveItemsPerView)}%)` }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex-none"
              style={{ width: itemWidth }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Controles de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
      >
        <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
      >
        <ArrowRightIcon className="h-6 w-6 text-gray-600" />
      </button>

      {/* Indicadores de página */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: Math.ceil(items.length / responsiveItemsPerView) }).map((_, idx) => (
          <button
            key={idx}
            className={`h-2 rounded-full transition-all ${
              Math.floor(currentIndex / responsiveItemsPerView) === idx 
                ? 'w-4 bg-indigo-600' 
                : 'w-2 bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(idx * responsiveItemsPerView)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz