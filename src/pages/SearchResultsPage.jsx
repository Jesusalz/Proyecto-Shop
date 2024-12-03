import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { productService } from '@/services';
import { ProductList } from '@/components/products';
import { Button, Card } from '@/components/common';
import { 
  ArrowLeftIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchQuery = new URLSearchParams(location.search).get('q') || location.state?.query;
  const initialResults = location.state?.results || [];
  const totalResults = location.state?.total || 0;

  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery && (!initialResults || initialResults.length === 0)) {
        setLoading(true);
        try {
          const searchResults = await productService.searchProducts(searchQuery);
          
          // Asegurar que results sea un array
          const productsArray = Array.isArray(searchResults) 
            ? searchResults 
            : (searchResults.products || []);
          
          setResults(productsArray);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      } else {
        setResults(initialResults);
      }
    };

    fetchSearchResults();
  }, [searchQuery, initialResults]);

  // Filtrar y ordenar resultados
  const filteredResults = (Array.isArray(results) ? results : [])
    .filter(product => 
      product.price >= priceRange.min && 
      product.price <= priceRange.max
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  if (loading) return <div>Cargando resultados...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header de resultados de búsqueda */}
      <div className="mb-8">
        {/* Botón para volver atrás */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Volver
        </Button>

        {/* Información de resultados y opciones de ordenamiento */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Resultados de búsqueda
            </h1>
            <p className="mt-1 text-gray-600">
              {filteredResults.length} de {totalResults} resultados para "{searchQuery}"
            </p>
          </div>

          {/* Selector de ordenamiento */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select rounded-lg border-gray-300"
            >
              <option value="relevance">Más relevantes</option>
              <option value="price_asc">Precio: Menor a Mayor</option>
              <option value="price_desc">Precio: Mayor a Menor</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resto del código permanece igual */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar con filtros de precio */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-4 p-4 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Filtros</h3>
              {/* Filtro de rango de precio */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rango de precio
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({
                      ...prev,
                      min: Number(e.target.value)
                    }))}
                    className="form-input w-full rounded-lg"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({
                      ...prev,
                      max: Number(e.target.value)
                    }))}
                    className="form-input w-full rounded-lg"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Botón para limpiar filtros */}
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange({ min: 0, max: 1000 });
                  setSortBy('relevance');
                }}
                className="w-full mt-4"
              >
                Limpiar filtros
              </Button>
            </div>
          </Card>
        </aside>

        {/* Lista de resultados */}
        <div className="lg:col-span-3">
          {filteredResults.length > 0 ? (
            <ProductList products={filteredResults} />
          ) : (
            // Mensaje cuando no hay resultados
            <Card className="p-8 text-center">
              <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No se encontraron resultados
              </h3>
              <p className="mt-2 text-gray-500">
                Intenta con otros términos de búsqueda o{' '}
                <Link to="/" className="text-blue-600 hover:text-blue-500">
                  explora nuestros productos
                </Link>
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;

