import { useState, useEffect } from 'react';

/**
 * Hook para manejar estado persistente en localStorage
 * @param {string} key - Clave para localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {[any, Function]} Estado y función para actualizarlo
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar nuestro valor
  // Pasa una función a useState para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Retorna una versión envuelta de la función setState de useState
  const setValue = (value) => {
    try {
      // Permite que value sea una función para tener la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};