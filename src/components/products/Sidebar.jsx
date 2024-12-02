import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { productService } from '@/services';
import { setFilters } from '@/store/productSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('');

  const sortOptions = [
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'rating-desc', label: 'Mejor Valorados' },
    { value: 'name-asc', label: 'Nombre A-Z' }
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, priceRange, sortBy]);

  const loadCategories = async () => {
    const categoryList = await productService.getCategoryList();
    setCategories(categoryList);
  };

  const applyFilters = () => {
    dispatch(setFilters({
      categories: selectedCategories,
      priceRange,
      sortBy
    }));
  };

  return (
    <div className="w-64 bg-white p-4 shadow-lg min-h-screen">
      {/* Categorías */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Categorías</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map(category => (
            <label key={category.slug} className="flex items-center space-x-2 hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.slug)}
                onChange={() => {
                  setSelectedCategories(prev =>
                    prev.includes(category.slug)
                      ? prev.filter(c => c !== category.slug)
                      : [...prev, category.slug]
                  );
                }}
                className="rounded text-indigo-600"
              />
              <span className="text-sm text-gray-600">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div className="mb-6">
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
      </div>

      {/* Ordenamiento */}
      <div className="mb-6">
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
      </div>
    </div>
  );
};

export default Sidebar;
//Visita mi GitHub: https://github.com/Jesusalz