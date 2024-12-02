import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCategories, fetchProductsByCategory, fetchProducts } from '@/store/productSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useSelector(state => state.products.categories) || [];
  const currentCategory = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    if (category) {
      navigate(`/products?category=${category}`);
      dispatch(fetchProductsByCategory(category));
    } else {
      navigate('/products');
      dispatch(fetchProducts({ limit: 12, skip: 0 }));
    }
  };

  return (
    <aside className="w-64 bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Categorías</h2>
      <ul className="space-y-2">
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
          <li key={category.name || category}>
            <button
              onClick={() => handleCategoryClick(category.name || category)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100
                ${currentCategory === (category.name || category) ? 'bg-indigo-50 text-indigo-600' : ''}`}
            >
              {category.name || category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;