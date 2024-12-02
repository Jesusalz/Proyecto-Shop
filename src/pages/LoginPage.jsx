import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginForm } from '@/components/auth';
import { Card } from '@/components/common';
import { 
  ShoppingBagIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const LoginPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Logo y nombre de la app */}
      <div className="pt-8 text-center">
        <Link to="/" className="inline-flex items-center space-x-2">
          <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">
            Mi Tienda
          </span>
        </Link>
      </div>

      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Bienvenido de nuevo
            </h1>
            <p className="mt-2 text-gray-600">
              Inicia sesión para continuar
            </p>
          </div>

          {/* Formulario de login */}
          <LoginForm />

          {/* Enlaces adicionales */}
          <div className="mt-6 space-y-4">
            <div className="text-center text-sm">
              <Link 
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-500"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  ¿No tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center text-blue-600 
                         hover:text-blue-500 font-medium"
              >
                Crear cuenta nueva
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Términos y condiciones */}
          <p className="mt-8 text-center text-xs text-gray-500">
            Al iniciar sesión, aceptas nuestros{' '}
            <Link 
              to="/terms" 
              className="text-blue-600 hover:text-blue-500"
            >
              Términos y Condiciones
            </Link>
            {' '}y{' '}
            <Link 
              to="/privacy" 
              className="text-blue-600 hover:text-blue-500"
            >
              Política de Privacidad
            </Link>
          </p>
        </Card>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados Jesus Alz.
      </footer>
    </div>
  );
};

export default LoginPage;
//Visita mi GitHub: https://github.com/Jesusalz