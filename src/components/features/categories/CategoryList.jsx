import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCategories,
  fetchProductsByCategory,
  setSelectedCategory,
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
  selectSelectedCategory
} from '@/store/categorySlice';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const selectedCategory = useSelector(selectSelectedCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(fetchProductsByCategory(category));
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="h-10 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`
            w-full px-4 py-2 text-left rounded-lg transition-colors
            ${selectedCategory === category 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-100'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
