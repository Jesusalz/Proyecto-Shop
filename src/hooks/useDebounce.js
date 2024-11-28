import { useEffect, useState } from 'react';

/**
 * Hook personalizado para debounce de valores
 * @param {any} value - El valor a debouncear
 * @param {number} delay - Tiempo de espera en milisegundos
 * @param {Object} options - Opciones adicionales
 * @param {boolean} options.leading - Si debe ejecutarse al inicio
 * @returns {any} Valor debounceado
 */
export const useDebounce = (value, delay = 500, options = {}) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (options.leading) {
      setDebouncedValue(value);
    }

    const handler = setTimeout(() => {
      if (!options.leading) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, options.leading]);

  return debouncedValue;
};