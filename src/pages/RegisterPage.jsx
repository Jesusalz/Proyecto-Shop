import React, { useState } from "react";
import { Navigate, useSelector } from "react-router-dom";
import { RegisterForm } from "@/components/auth"; // Importar el componente RegisterForm
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const RegisterPage = () => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Logo */}
      <div className="pt-8 text-center">
        <Link to="/" className="inline-flex items-center space-x-2">
          <ShoppingBagIcon className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-900">
            Mi Tienda
          </span>
        </Link>
      </div>

      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Crear una cuenta
            </h1>
            <p className="mt-2 text-gray-600">
              ¡Únete a nuestra comunidad!
            </p>
          </div>

          {/* Aquí usas el RegisterForm que contiene la lógica del formulario */}
          <RegisterForm />

          <div className="mt-6 text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-500 font-medium"
            >
              Inicia sesión
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500">
            Al registrarte, aceptas nuestros{' '}
            <Link
              to="/terms"
              className="text-purple-600 hover:text-purple-500"
            >
              Términos y Condiciones
            </Link>
            {' '}y{' '}
            <Link
              to="/privacy"
              className="text-purple-600 hover:text-purple-500"
            >
              Política de Privacidad
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
//Visita mi GitHub: https://github.com/Jesusalz
