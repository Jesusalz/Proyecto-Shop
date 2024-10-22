import React, { useState } from 'react';

const categoriesList = [
  'Todos',
  'Belleza',
  'Electrónica',
  'Ropa',
  
];

const Categories = ({ onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold cursor-pointer" onClick={toggleDropdown}>
        Categorías
      </h2>
      {isOpen && (
        <ul className="bg-white shadow-md rounded mt-2">
          {categoriesList.map((category) => (
            <li
              key={category}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onSelectCategory(category);
                setIsOpen(false);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
