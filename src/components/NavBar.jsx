import React from 'react';
import { Link } from 'react-router-dom';
import ProductSearch from './ProductSearch'; 

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white">
        <Link to="/">Home</Link>
        {/* Otros enlaces */}
      </div>
      <ProductSearch /> {/* Agrega el buscador aquí */}
    </nav>
  );
};

export default NavBar;
