import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/store/productSlice';
import { ProductList } from '@/components/products';
import { Categories } from '@/components/features/categories';
import { Card } from '@/components/common';
import { 
  ArrowPathIcon,
  FunnelIcon 
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.user.favorites) || new Set();
  
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleFavoriteToggle = (productId) => {
    // Implementar lógica de favoritos
    dispatch(toggleFavorite(productId));
  };

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (error) {
    return (
      <Card className="m-4 p-6 bg-red-50">
        <div className="text-center text-red-600">
          <h2 className="text-lg font-semibold">Error al cargar productos</h2>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-4 flex items-center justify-center mx-auto 
                     text-red-600 hover:text-red-700"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Reintentar
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Nuestros Productos
        </h1>
        <p className="mt-2 text-gray-600">
          Descubre nuestra selección de productos de alta calidad
        </p>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {/* Categorías */}
            <Card>
              <Categories
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </Card>

            {/* Filtros */}
            <Card className="p-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full"
              >
                <span className="font-semibold">Filtros</span>
                <FunnelIcon className="h-5 w-5" />
              </button>

              {showFilters && (
                <div className="mt-4 space-y-4">
                  {/* Rango de precio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Precio máximo
                    </label>
                    <input
                      type="range"
                      className="w-full mt-2"
                      min="0"
                      max="1000"
                      // onChange={handlePriceChange}
                    />
                  </div>

                  {/* Ordenar por */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ordenar por
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 
                               shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="newest">Más recientes</option>
                      <option value="price_asc">Precio: Menor a Mayor</option>
                      <option value="price_desc">Precio: Mayor a Menor</option>
                    </select>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </aside>

        {/* Lista de productos */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 
                            border-b-2 border-blue-500" />
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">
                  {filteredProducts.length} productos encontrados
                </p>
              </div>

              <ProductList
                products={filteredProducts}
                onFavoriteToggle={handleFavoriteToggle}
                favorites={favorites}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
//Visita mi GitHub: https://github.com/Jesusalz