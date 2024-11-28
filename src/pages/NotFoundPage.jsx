import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common';
import { 
  HomeIcon, 
  ArrowLeftIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          {/* Icono y código de error */}
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <div className="flex items-center">
                <ExclamationTriangleIcon 
                  className="h-12 w-12 text-yellow-500" 
                  aria-hidden="true" 
                />
                <h1 className="ml-3 text-4xl font-extrabold text-gray-900 
                             tracking-tight sm:text-5xl">
                  404
                </h1>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Página no encontrada
                </h2>
                <p className="mt-3 text-base text-gray-500">
                  Lo sentimos, no pudimos encontrar la página que estás buscando.
                </p>
                <div className="mt-10 flex space-x-3">
                  {/* Botón para ir al inicio */}
                  <Link to="/">
                    <Button 
                      variant="primary"
                      className="inline-flex items-center"
                    >
                      <HomeIcon className="h-5 w-5 mr-2" />
                      Ir al inicio
                    </Button>
                  </Link>

                  {/* Botón para volver atrás */}
                  <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center"
                  >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Volver atrás
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Sugerencias */}
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900">
            Enlaces populares
          </h3>
          <ul className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
            {popularLinks.map((link) => (
              <li key={link.name} className="py-3">
                <Link
                  to={link.href}
                  className="flex items-center justify-between hover:text-blue-600"
                >
                  <span className="text-base text-gray-700 hover:text-blue-600">
                    {link.name}
                  </span>
                  <span className="ml-2">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Soporte */}
        <div className="mt-8 text-sm text-gray-500 text-center">
          ¿Necesitas ayuda?{' '}
          <Link 
            to="/contact" 
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Contacta con soporte
          </Link>
        </div>
      </div>
    </div>
  );
};

// Enlaces populares
const popularLinks = [
  { name: 'Productos destacados', href: '/featured' },
  { name: 'Ofertas especiales', href: '/offers' },
  { name: 'Categorías', href: '/categories' },
  { name: 'Servicio al cliente', href: '/support' },
];

export default NotFoundPage;