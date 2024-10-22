import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { searchProducts } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300); 
  const navigate = useNavigate(); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (debouncedSearchTerm) { 
      try {
        const results = await searchProducts(debouncedSearchTerm); 
        navigate('/search', { state: { results } }); 
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
