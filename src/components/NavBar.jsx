import React from 'react';
import { Link } from 'react-router-dom';
import ProductSearch from './ProductSearch'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white">
        <Link to="/">Home</Link>
        
      </div>
      <ProductSearch />
      <div className="text-white">
        {user ? (
          <>
            <span className="mr-4">Hola, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
