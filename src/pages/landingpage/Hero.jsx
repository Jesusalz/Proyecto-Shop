import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-blue-500 text-white p-10 text-center">
      <h1 className="text-4xl font-bold">Bienvenido a Nuestro Sitio</h1>
      <p className="mt-4">Explora nuestros productos y ofertas especiales.</p>
      <Link to="/home">
        <button className="bg-white text-blue-500 px-4 py-2 rounded mt-4">
          Comienza a comprar
        </button>
      </Link>
    </section>
  );
};

export default Hero;
