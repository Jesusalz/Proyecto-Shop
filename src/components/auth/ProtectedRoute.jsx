import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '@/components/common';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;