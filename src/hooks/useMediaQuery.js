import { useState, useEffect } from 'react';

/**
 * Hook para detectar media queries
 * @param {string} query - Media query a evaluar
 * @returns {boolean} True si la media query coincide
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};
