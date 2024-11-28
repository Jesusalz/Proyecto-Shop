import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { NavBar, Footer } from '@/components/layout';
import { LoadingSpinner } from '@/components/common';
import {ProductPage, ProductDetailPage, LoginPage, RegisterPage, NotFoundPage, UsersPage, CategoryPage,
  SearchResultsPage, ProfilePage, FavoritesPage, CartPage,} from '@/pages';
import { LandingPage } from '@/features/landing';
import { ProtectedRoute } from '@/components/auth';
import { getCurrentUser } from '@/store/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        
        <main className="flex-grow">
          <Routes>
            
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={
                !isAuthenticated 
                  ? <LoginPage /> 
                  : <Navigate to="/products" replace />
              } 
            />
            <Route 
              path="/register" 
              element={
                !isAuthenticated 
                  ? <RegisterPage /> 
                  : <Navigate to="/products" replace />
              } 
            />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            
            
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              {user?.role === 'admin' && (
                <Route path="/users" element={<UsersPage />} />
              )}
            </Route>
            <Route path="/home" element={<Navigate to="/products" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>

      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Router>
  );
}

export default App;