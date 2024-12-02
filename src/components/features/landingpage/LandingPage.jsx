import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Hero, Features } from './components';
import { Footer } from '@/components/layout';

const LandingPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Redirigir a /home si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Sección adicional de testimonios o estadísticas (opcional) */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                ¿Por qué elegirnos?
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div 
                    key={stat.label} 
                    className="p-6 bg-gray-50 rounded-lg"
                  >
                    <dt className="text-4xl font-bold text-blue-600">
                      {stat.value}
                    </dt>
                    <dd className="mt-2 text-gray-600">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section (opcional) */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                ¿Listo para empezar?
              </h2>
              <p className="mt-4 text-xl text-blue-100">
                Únete a nuestra comunidad de compradores satisfechos
              </p>
              <div className="mt-8">
                <button
                  onClick={() => navigate('/register')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg
                           font-semibold hover:bg-blue-50 transition-colors"
                >
                  Crear cuenta gratis
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Datos estáticos
const stats = [
  { value: '10K+', label: 'Clientes activos' },
  { value: '50K+', label: 'Productos vendidos' },
  { value: '24/7', label: 'Soporte al cliente' },
  { value: '99%', label: 'Satisfacción' },
];

export default LandingPage;