import React from 'react';

const Features = () => {
  return (
    <section className="p-10">
      <h2 className="text-3xl font-semibold text-center">Características</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold">Variedad de Productos</h3>
          <p>Encuentra todo lo que necesitas en un solo lugar.</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold">Ofertas Especiales</h3>
          <p>Descubre descuentos exclusivos y promociones.</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold">Envío Rápido</h3>
          <p>Recibe tus productos en la puerta de tu casa rápidamente.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
