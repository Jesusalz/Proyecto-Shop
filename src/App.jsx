import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavBar, Footer } from '@/components/layout';
import { LandingPage } from '@/components/features/landingpage';
import { selectIsAuthenticated } from '@/store/authSlice';
import { CartPage } from '@/components/cart';
import { ProfilePage } from '@/components/features/users';
import { FavoritesPage } from '@/components/features/favorites';
import { CheckoutPage, CheckoutSuccess } from '@/components/checkout';
import {
  ProductPage,
  ProductDetailPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  CategoryPage,
  SearchResultsPage,
  OrderConfirmedPage,
} from '@/pages';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Rutas públicas
const publicRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/products', element: <ProductPage /> },
  { path: '/products/:id', element: <ProductDetailPage /> },
  { path: '/categories/:category', element: <CategoryPage /> },
  { path: '/categories/all', element: <CategoryPage /> }, // Nueva ruta para "Ver todas"
  { path: '/search', element: <SearchResultsPage /> },
  { path: '/cart', element: <CartPage /> },
];

// Rutas protegidas
const protectedRoutes = [
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/checkout-success', element: <CheckoutSuccess /> },
  { path: '/pedido-confirmado', element: <OrderConfirmedPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '/profile', element: <ProfilePage /> },
];

// Rutas donde no se debe mostrar el Footer
const noFooterRoutes = ['/']; // Solo ocultar el Footer en la página de inicio

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Verificar si la ruta actual está en la lista de rutas sin Footer
  const shouldShowFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isLandingPage && <NavBar />}
      <main className="flex-grow">
        <Routes>
          {/* Rutas públicas */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Rutas protegidas */}
          {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ))}

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />} {/* Mostrar Footer solo si la ruta no está en noFooterRoutes */}
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