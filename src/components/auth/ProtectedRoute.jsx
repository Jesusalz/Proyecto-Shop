import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '@/components/common'; // Componente de carga reutilizable

const ProtectedRoute = () => {
  // Obtengo el estado de autenticación y el estado de carga desde Redux
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Mientras el estado de autenticación se carga, muestro un spinner para mejorar la UX
  if (loading) {
    return <LoadingSpinner />;
  }

  // Si el usuario está autenticado, renderizo las rutas protegidas con <Outlet />
  // Si no está autenticado, lo redirijo a la página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
