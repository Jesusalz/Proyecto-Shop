import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { searchProducts } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Retrasa la búsqueda
  const navigate = useNavigate(); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Actualiza el término de búsqueda
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (debouncedSearchTerm) { // Solo busca si hay un término de búsqueda
      try {
        const results = await searchProducts(debouncedSearchTerm); // Llama a la API de búsqueda
        navigate('/search', { state: { results } }); // Navega a la página de resultados
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar productos..."
        className="p-2 border rounded"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
        Buscar
      </button>
    </form>
  );
};

export default ProductSearch;
