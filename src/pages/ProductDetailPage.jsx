import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/productSlice'; 
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  
  if (!selectedProduct) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={selectedProduct.images[0]}
          alt={selectedProduct.title}
          className="w-full h-auto object-contain"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.title}</h1>
          <p className="text-xl text-gray-700 mb-2">${selectedProduct.price.toFixed(2)}</p>
          <p className="text-lg text-gray-600 mb-6">{selectedProduct.description}</p>

          <div className="mt-auto">
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
