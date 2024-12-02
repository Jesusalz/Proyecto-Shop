import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters, selectActiveFilters, selectFilteredProducts } from '@/store/productSlice';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

const FilterBar = () => {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  const filteredProducts = useSelector(selectFilteredProducts);

  const handleSortChange = (e) => {
    dispatch(setFilters({ sortBy: e.target.value }));
  };

  const handlePriceChange = (type, value) => {
    dispatch(setFilters({
      priceRange: {
        ...activeFilters.priceRange,
        [type]: value ? Number(value) : type === 'min' ? 0 : Infinity
      }
    }));
  };

  const clearFilter = (filterType) => {
    if (filterType === 'price') {
      dispatch(setFilters({ priceRange: { min: 0, max: Infinity } }));
    } else if (filterType === 'sort') {
      dispatch(setFilters({ sortBy: '' }));
    }
  };

  const handleClearAllFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">
            {filteredProducts.length} resultados encontrados
          </span>
        </div>
        
        <div className="flex gap-4">
          <select 
            value={activeFilters.sortBy}
            onChange={handleSortChange}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Ordenar por</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Precio mínimo"
              value={activeFilters.priceRange.min || ''}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-28 border rounded-lg px-3 py-2"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Precio máximo"
              value={activeFilters.priceRange.max === Infinity ? '' : activeFilters.priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-28 border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Botón de limpiar todos los filtros */}
        {(activeFilters.sortBy || activeFilters.priceRange.min > 0 || activeFilters.priceRange.max < Infinity) && (
          <button
            onClick={handleClearAllFilters}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Filtros activos */}
      <div className="flex gap-2 flex-wrap">
        {activeFilters.sortBy && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
            {activeFilters.sortBy}
            <button onClick={() => clearFilter('sort')} className="hover:text-indigo-600">
              <XMarkIcon className="h-4 w-4" />
            </button>
          </span>
        )}
        {(activeFilters.priceRange.min > 0 || activeFilters.priceRange.max < Infinity) && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
            Precio: ${activeFilters.priceRange.min} - ${activeFilters.priceRange.max === Infinity ? '∞' : activeFilters.priceRange.max}
            <button onClick={() => clearFilter('price')} className="hover:text-indigo-600">
              <XMarkIcon className="h-4 w-4" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterBar;