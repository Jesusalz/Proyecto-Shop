import { useState, useEffect } from 'react';

/**
 * Hook para detectar la posición del scroll
 * @returns {Object} Objeto con las coordenadas del scroll
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    };

    window.addEventListener('scroll', updatePosition);

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};