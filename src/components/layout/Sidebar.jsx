import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  fetchCategories, 
  fetchProductsByCategory, 
  fetchProducts, 
  setFilters 
} from '@/store/productSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para categorías y filtros
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('');

  // Obtener categorías desde Redux
  const categories = useSelector(state => state.products.categories) || [];
  const currentCategory = new URLSearchParams(location.search).get('category');

  // Opciones de ordenamiento
  const sortOptions = [
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'rating-desc', label: 'Mejor Valorados' },
    { value: 'name-asc', label: 'Nombre A-Z' }
  ];

  // Cargar categorías al montar el componente
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    dispatch(setFilters({
      categories: selectedCategories,
      priceRange,
      sortBy
    }));
  }, [selectedCategories, priceRange, sortBy, dispatch]);

  // Manejar clic en categoría
  const handleCategoryClick = (category) => {
    if (category) {
      navigate(`/products?category=${category}`);
      dispatch(fetchProductsByCategory(category));
    } else {
      navigate('/products');
      dispatch(fetchProducts({ limit: 12, skip: 0 }));
    }
  };

  // Manejar selección de categorías
  const handleCategorySelect = (categorySlug) => {
    setSelectedCategories(prev =>
      prev.includes(categorySlug)
        ? prev.filter(c => c !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  return (
    <aside className="w-64 bg-white p-4 rounded-lg shadow-lg">
      {/* Sección de Categorías */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Categorías</h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          <li key="all">
            <button 
              onClick={() => handleCategoryClick(null)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 
                ${!currentCategory ? 'bg-indigo-50 text-indigo-600' : ''}`}
            >
              Todos los productos
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.slug} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onChange={() => handleCategorySelect(category.slug)}
                className="mr-2 rounded text-indigo-600"
              />
              <button
                onClick={() => handleCategoryClick(category.slug)}
                className={`flex-grow text-left px-3 py-2 rounded hover:bg-gray-100
                  ${currentCategory === category.slug ? 'bg-indigo-50 text-indigo-600' : ''}`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Sección de Precio */}
      <section className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Precio</h3>
        <div className="space-y-2">
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </section>

      {/* Sección de Ordenamiento */}
      <section className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Ordenar por</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Seleccionar...</option>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>
    </aside>
  );
};

export default Sidebar;

//Visita mi GitHub: https://github.com/Jesusalz
