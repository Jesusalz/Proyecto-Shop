import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-white via-blue-100 to-indigo-200">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Las mejores ofertas en</span>{' '}
                <span className="block text-indigo-600 xl:inline">productos exclusivos</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Descubre nuestra selección de productos de alta calidad a los mejores precios.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/products">
                    <Button className="w-full flex items-center justify-center px-8 py-3">
                      Comenzar a comprar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
              <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/3 flex items-center justify-center p-8">
                <img
                  className="w-96 h-auto object-contain drop-shadow-2xl filter hover:scale-105 hover:rotate-2 transition-all duration-500 ease-in-out"
                  src="https://pixabay.com/get/g6399cbd5df899eb522c68f741bd65ac80dd912af34684b936e88513b6c2731a7c00de54aa48a612b73754f6945b6844c_640.png"
                  alt="Hero banner"
                />
              </div>
            </div>
  );
};

export default Hero;
