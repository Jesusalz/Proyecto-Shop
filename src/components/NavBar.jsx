import React from 'react';
import { Link } from 'react-router-dom';
import ProductSearch from './ProductSearch'; 
import { SearchIcon } from '@heroicons/react/outline'; 

const NavBar = () => {
  return (
    <nav className="bg-[#FE7225] p-4 flex justify-between items-center">
      <Link to="/">
        <img src="ruta/a/tu/logo.png" alt="Logo" className="h-8" />
      </Link>
      <div className="flex items-center">
        <ProductSearch />
        <Link to="/login" className="text-white ml-4">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;
