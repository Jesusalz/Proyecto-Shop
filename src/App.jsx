import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavBar, Footer } from '@/components/layout';
import { LandingPage } from '@/components/features/landingpage';
import { selectIsAuthenticated } from '@/store/authSlice';
import { Cart, CartPage } from '@/components/cart';
import { ProfilePage } from '@/components/features/users';
import { FavoritesPage } from '@/components/features/favorites';
import { CheckoutPage } from '@/components/checkout';
import {
  ProductPage,
  ProductDetailPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  CategoryPage,
  SearchResultsPage
} from '@/pages';

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="min-h-screen flex flex-col">
      {!isLandingPage && <NavBar />}
      <main className="flex-grow">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResultsPage />} />

          {/* Rutas protegidas */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;