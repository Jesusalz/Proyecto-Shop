import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { ProductSearch } from '@/components/products';
import {
  ShoppingCartIcon,
  UserCircleIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
// Añadir el selector de favoritos
import { selectFavorites } from '@/store/favoritesSlice';
import { selectCartItems } from '@/store/cartSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Añadir el selector
  const favorites = useSelector(selectFavorites);
  const cartItems = useSelector(selectCartItems);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBagIcon className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">SHOP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center px-8">
            <ProductSearch />
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/favorites" className="text-gray-600 hover:text-indigo-600 transition-colors relative">
              <HeartIcon className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>            {user ? (              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 hover:text-indigo-600">
                  <UserCircleIcon className="h-6 w-6 text-gray-600" />
                  <span className="text-gray-700">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full text-sm font-medium transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <ProductSearch />
              <div className="flex flex-col space-y-4 mt-4">
                <Link to="/favorites" className="flex items-center space-x-2 text-gray-600">
                  <HeartIcon className="h-6 w-6" />
                  <span>Favoritos</span>
                </Link>
                <Link to="/cart" className="flex items-center space-x-2 text-gray-600">
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span>Carrito</span>
                </Link>
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <UserCircleIcon className="h-6 w-6" />
                      <span>{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors text-center"
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;