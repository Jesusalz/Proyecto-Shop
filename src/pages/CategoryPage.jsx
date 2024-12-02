import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '@/store/productSlice';
import { ProductList } from '@/components/products';
import { Button, Card } from '@/components/common';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.user.favorites) || new Set();

  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [dispatch, category]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = (productId) => {
    // Implementar lógica de favoritos
    dispatch(toggleFavorite(productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="m-4 p-6 bg-red-50 border-red-100">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-800">
            Error al cargar productos
          </h2>
          <p className="mt-2 text-red-600">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={handleGoBack}
          >
            Volver atrás
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Regresar
          </Button>

          <div className="flex items-center space-x-4">
            <select
              className="form-select rounded-lg border-gray-300"
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Ordenar por</option>
              <option value="price_asc">Precio: Menor a Mayor</option>
              <option value="price_desc">Precio: Mayor a Menor</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <p className="mt-2 text-gray-600">
          {products.length} productos encontrados
        </p>
      </div>

      {/* Filtros y Productos */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar con filtros */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-4">
            <h2 className="font-semibold text-lg mb-4">Filtros</h2>
            {/* Aquí puedes agregar tus filtros */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Precio</h3>
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max="1000"
                  // onChange={handlePriceChange}
                />
              </div>
              {/* Más filtros aquí */}
            </div>
          </Card>
        </div>

        {/* Lista de productos */}
        <div className="lg:col-span-3">
          <ProductList
            products={products}
            onFavoriteToggle={handleFavoriteToggle}
            favorites={favorites}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
//Visita mi GitHub: https://github.com/Jesusalz