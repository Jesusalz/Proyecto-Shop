import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { searchProducts } from '@/services/api';
import { Input } from '@/components/common';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchProducts(debouncedSearchTerm);
        setSuggestions(results.slice(0, 5)); // Limitamos a 5 sugerencias
      } catch (error) {
        console.error('Error al buscar sugerencias:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const results = await searchProducts(searchTerm);
      navigate('/search', { 
        state: { results, searchTerm } 
      });
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setShowSuggestions(false);
    navigate(`/products/${suggestion.id}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-w-xl w-full">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     bg-white/90 backdrop-blur-sm"
          />
          <MagnifyingGlassIcon 
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>

      {/* Sugerencias */}
      {showSuggestions && (searchTerm.length > 1) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg 
                      border border-gray-200 max-h-96 overflow-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Buscando...
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center">
                    {suggestion.image && (
                      <img
                        src={suggestion.image}
                        alt={suggestion.title}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                    )}
                    <div>
                      <p className="font-medium">{suggestion.title}</p>
                      <p className="text-sm text-gray-500">
                        ${suggestion.price}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;