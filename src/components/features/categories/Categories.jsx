import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@/components/common';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { 
  fetchCategories,
  setSelectedCategory,
  selectCategories,
  selectSelectedCategory,
  selectCategoriesLoading 
} from '@/store/categorySlice';

const Categories = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const loading = useSelector(selectCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-left
                 hover:bg-gray-50 rounded-lg transition-colors duration-150"
      >
        <h2 className="text-xl font-bold text-gray-800">
          {selectedCategory || 'Categorías'}
        </h2>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <Card className="absolute z-10 w-full mt-2 py-1">
          <ul className="max-h-60 overflow-auto">
            <li
              className={`px-4 py-2 cursor-pointer transition-colors duration-150
                        ${!selectedCategory ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              onClick={() => handleCategorySelect(null)}
            >
              Todas las categorías
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={`px-4 py-2 cursor-pointer transition-colors duration-150
                          ${selectedCategory === category 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'hover:bg-gray-50'
                          }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default Categories;