import React from 'react';
import { Card } from '@/components/common';
import { 
  ShoppingBagIcon, 
  TagIcon, 
  TruckIcon 
} from '@heroicons/react/24/outline';

const featuresList = [
  {
    title: 'Variedad de Productos',
    description: 'Encuentra todo lo que necesitas en un solo lugar.',
    icon: ShoppingBagIcon,
  },
  {
    title: 'Ofertas Especiales',
    description: 'Descubre descuentos exclusivos y promociones.',
    icon: TagIcon,
  },
  {
    title: 'Envío Rápido',
    description: 'Recibe tus productos en la puerta de tu casa rápidamente.',
    icon: TruckIcon,
  },
];

const FeatureCard = ({ title, description, icon: Icon }) => (
  <Card 
    className="p-6 hover:shadow-lg transition-shadow duration-300"
    hover
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 bg-blue-100 rounded-full">
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  </Card>
);

const Features = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Características Principales
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Descubre por qué somos tu mejor opción
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresList.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;