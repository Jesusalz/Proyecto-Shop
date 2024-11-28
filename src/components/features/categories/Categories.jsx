import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/components/common';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const Categories = ({ onSelectCategory, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useSelector(state => state.categories.list) || [
    'Todos',
    'Belleza',
    'Electrónica',
    'Ropa',
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between p-3 text-left
                 hover:bg-gray-50 rounded-lg transition-colors duration-150"
      >
        <h2 className="text-xl font-bold text-gray-800">
          Categorías
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
            {categories.map((category) => (
              <li
                key={category}
                className={`px-4 py-2 cursor-pointer transition-colors duration-150
                          ${selectedCategory === category 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'hover:bg-gray-50'
                          }`}
                onClick={() => {
                  onSelectCategory(category);
                  setIsOpen(false);
                }}
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
