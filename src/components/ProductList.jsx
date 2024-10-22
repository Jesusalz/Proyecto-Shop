import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No hay productos disponibles.</p>; 
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg">
          <h2 className="text-xl">{product.title}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          
          <Link to={`/products/${product.id}`} className="bg-blue-500 text-white p-2 rounded">
            Ver Detalles
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
