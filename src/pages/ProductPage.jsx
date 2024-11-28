import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '@/store/productSlice';
import { ProductList } from '@/components/products';
import { Button, Card } from '@/components/common';
import { 
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

const ProductPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items: products, loading, error, categories } = useSelector(state => state.products);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Actualizar URL cuando cambien los filtros
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy) params.set('sort', sortBy);
    setSearchParams(params);
  }, [selectedCategory, sortBy, setSearchParams]);

  const filteredProducts = products
    .filter(product => 
      (!selectedCategory || product.category === selectedCategory) &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'name': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

  if (error) {
    return (
      <Card className="m-4 p-6 bg-red-50">
        <div className="text-center text-red-600">
          <h2 className="text-lg font-semibold">Error al cargar productos</h2>
          <p className="mt-2">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => dispatch(fetchProducts())}
          >
            Reintentar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Nuestros Productos
          </h1>
          <p className="mt-2 text-gray-600">
            {filteredProducts.length} productos encontrados
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            {showFilters ? (
              <XMarkIcon className="h-5 w-5 mr-2" />
            ) : (
              <FunnelIcon className="h-5 w-5 mr-2" />
            )}
            Filtros
          </Button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select rounded-lg border-gray-300"
          >
            <option value="">Ordenar por</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
            <option value="name">Nombre</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar con filtros */}
        {showFilters && (
          <aside className="lg:col-span-1">
            <Card className="sticky top-4 space-y-6 p-4">
              {/* Categorías */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Categorías
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left px-2 py-1.5 rounded
                              ${!selectedCategory ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                  >
                    Todas
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`block w-full text-left px-2 py-1.5 rounded
                                ${selectedCategory === category.slug ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rango de precio */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Precio
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="form-input w-full rounded-lg"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="form-input w-full rounded-lg"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Botón limpiar filtros */}
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange({ min: 0, max: 1000 });
                  setSortBy('');
                }}
                className="w-full"
              >
                Limpiar filtros
              </Button>
            </Card>
          </aside>
        )}

        {/* Lista de productos */}
        <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
          ) : (
            <ProductList products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
