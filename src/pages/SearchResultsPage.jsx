import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
  const location = useLocation();
  const results = location.state?.results || []; 

  return (
    <div>
      <h1>Resultados de Búsqueda</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((product) => (
            <li key={product.id}>
              <a href={`/products/${product.id}`}>{product.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
