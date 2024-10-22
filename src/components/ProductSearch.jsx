import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const ProductSearch = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="bg-white text-gray-800 rounded-md p-2 pl-10 focus:ring focus:ring-blue-300"
      />
      <button type="submit" className="absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>
    </form>
  );
};

export default ProductSearch;
