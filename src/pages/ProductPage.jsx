import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories } from '../store/productSlice'; 
import { Link } from 'react-router-dom';

function ProductPage() {
  const dispatch = useDispatch();
  const { items, loading, error, categories } = useSelector((state) => state.products);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories()); 
  }, [dispatch]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setShowCategories((prev) => !prev)} 
          className="bg-gray-200 p-2 rounded">
          Categorías
        </button>
      </div>

      {showCategories && (
        <ul className="border border-gray-300 mt-2 p-2">
          {categories.length === 0 ? (
            <li>No hay categorías disponibles.</li>
          ) : (
            categories.map((category) => (
              <li key={category.slug} className="p-1 hover:bg-gray-100">
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            ))
          )}
        </ul>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          items.map((product) => (
            <div key={product.id} className="product-card bg-white rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out hover:scale-105">
              <img
                src={product.images[0]} 
                alt={product.title}
                className="product-image h-48 w-full object-contain"
              />
              <h2 className="product-title text-lg font-semibold mt-2">{product.title}</h2>
              <p className="product-price text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
              <Link to={`/products/${product.id}`}>
                <button className="product-button bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">
                  Ver Detalles
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductPage;
