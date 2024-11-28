import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { ProductSearch } from '@/components/products';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <ShoppingCartIcon className="h-8 w-8 text-white" />
              <span className="ml-2 text-white font-bold text-xl">
                Tienda
              </span>
            </Link>
          </div>

          {/* Product Search */}
          <div className="flex-1 hidden md:block">
            <ProductSearch />
          </div>

          {/* User Actions */}
          <div className="ml-4 flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white hidden sm:block">
                  Hola, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-lg transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;