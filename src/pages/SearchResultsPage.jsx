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
  // Utilizo hooks de navegación para manejar la interacción del usuario
  const location = useLocation();
  const navigate = useNavigate();

  // Gestiono el estado de los resultados de búsqueda
  // Controlo la carga, los resultados y posibles errores
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extraigo el término de búsqueda de la URL o del estado de navegación
  // Me permite manejar búsquedas desde diferentes puntos de la aplicación
  const searchQuery = new URLSearchParams(location.search).get('q') || location.state?.query;
  const initialResults = location.state?.results || [];
  const totalResults = location.state?.total || 0;

  // Configuro estados para gestionar filtros y ordenamiento
  // Me dan flexibilidad para personalizar la visualización de resultados
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Utilizo un efecto para cargar los resultados de búsqueda
  // Recupero productos cuando no hay resultados iniciales
  useEffect(() => {
    const fetchSearchResults = async () => {
      // Verifico si necesito realizar una búsqueda
      if (searchQuery && (!initialResults || initialResults.length === 0)) {
        setLoading(true);
        try {
          // Invoco al servicio de búsqueda de productos
          const searchResults = await productService.searchProducts(searchQuery);
          
          // Me aseguro de que los resultados sean un array
          const productsArray = Array.isArray(searchResults) 
            ? searchResults 
            : (searchResults.products || []);
          
          // Actualizo el estado con los resultados obtenidos
          setResults(productsArray);
          setLoading(false);
        } catch (err) {
          // Manejo cualquier error que ocurra durante la búsqueda
          setError(err.message);
          setLoading(false);
        }
      } else {
        // Si ya tengo resultados, los establezco directamente
        setResults(initialResults);
      }
    };

    fetchSearchResults();
  }, [searchQuery, initialResults]);

  // Filtro y ordeno los resultados
  // Aplico filtros de precio y criterios de ordenamiento según mis necesidades
  const filteredResults = (Array.isArray(results) ? results : [])
    .filter(product => 
      // Filtro los productos por rango de precio
      product.price >= priceRange.min && 
      product.price <= priceRange.max
    )
    .sort((a, b) => {
      // Ordeno los resultados según el criterio seleccionado
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

  // Renderizado condicional de estados de carga y error
  if (loading) return <div>Cargando resultados...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Encabezado de resultados de búsqueda */}
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

      {/* Contenido principal de resultados */}
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
