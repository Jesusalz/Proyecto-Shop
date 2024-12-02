import { useState, useEffect } from 'react';
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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerView >= items.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, items.length - itemsPerView) : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, autoplayTime);
      return () => clearInterval(interval);
    }
  }, [isHovered, autoplayTime]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden relative rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex-none"
              style={{ width: `${100 / itemsPerView}%` }}
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
        {Array.from({ length: Math.ceil(items.length / itemsPerView) }).map((_, idx) => (
          <button
            key={idx}
            className={`h-2 rounded-full transition-all ${
              Math.floor(currentIndex / itemsPerView) === idx 
                ? 'w-4 bg-indigo-600' 
                : 'w-2 bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(idx * itemsPerView)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;