import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../store/productSlice';
import '../styles/Button.css'; 

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(category)); 
  }, [dispatch, category]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;

  return (
    <div>
      <button onClick={handleGoBack} className="button"> 
        Regresar
      </button>
      
      <h1>Productos en la categoría: {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.length === 0 ? (
          <p>No hay productos disponibles en esta categoría.</p>
        ) : (
          items.map((product) => (
            <div key={product.id} className="product-card bg-white rounded-lg shadow-md p-4">
              <img src={product.images[0]} alt={product.title} className="product-image h-48 w-full object-contain" />
              <h2 className="product-title text-lg font-semibold mt-2">{product.title}</h2>
              <p className="product-price text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
