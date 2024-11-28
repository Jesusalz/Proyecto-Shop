import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import { ShoppingBagIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
      
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-24 text-center lg:pt-32 lg:pb-36">
            {/* Contenido principal */}
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Bienvenido a{' '}
                <span className="text-blue-600">
                  Nuestra Tienda
                </span>
              </h1>
              
              <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                Descubre una amplia selección de productos de alta calidad. 
                Ofertas exclusivas y envíos rápidos para hacer tu experiencia 
                de compra única.
              </p>
              
              {/* Botones de acción */}
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/home">
                  <Button 
                    variant="primary"
                    size="lg"
                    className="group"
                  >
                    <span className="flex items-center">
                      Comienza a comprar
                      <ShoppingBagIcon 
                        className="ml-2 h-5 w-5 group-hover:animate-bounce" 
                      />
                    </span>
                  </Button>
                </Link>

                <Link 
                  to="/products"
                  className="flex items-center text-sm font-semibold leading-6 
                           text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Ver catálogo 
                  <ArrowRightIcon 
                    className="ml-1 h-4 w-4 group-hover:translate-x-1 
                             transition-transform" 
                  />
                </Link>
              </div>
              
              {/* Estadísticas o badges */}
              <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  ['1000+', 'Productos'],
                  ['24/7', 'Soporte'],
                  ['100%', 'Garantía'],
                ].map(([stat, label]) => (
                  <div 
                    key={label}
                    className="bg-white/60 backdrop-blur-sm rounded-lg 
                             shadow-sm px-4 py-3"
                  >
                    <dt className="text-2xl font-bold text-blue-600">
                      {stat}
                    </dt>
                    <dd className="text-sm text-gray-600">
                      {label}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decoración de fondo (opcional) */}
      <div className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu 
                    overflow-hidden blur-3xl sm:-bottom-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] 
                      w-[36.125rem] -translate-x-1/2 rotate-[30deg] 
                      bg-gradient-to-tr from-blue-200 to-blue-400 opacity-30 
                      sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};

export default Hero;