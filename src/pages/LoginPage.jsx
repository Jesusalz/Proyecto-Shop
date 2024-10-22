import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        <LoginForm />
        <p className="text-center mt-4 text-gray-600">
          ¿No tienes una cuenta? 
          <a href="/register" className="text-blue-500 hover:underline"> Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
