import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '@/components/common';

const ShippingForm = ({ onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Aquí guardaríamos los datos de envío
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Información de Envío</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nombre completo"
          {...register('fullName', { required: 'Este campo es requerido' })}
          error={errors.fullName?.message}
        />
        
        <Input
          label="Dirección"
          {...register('address', { required: 'Este campo es requerido' })}
          error={errors.address?.message}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Ciudad"
            {...register('city', { required: 'Este campo es requerido' })}
            error={errors.city?.message}
          />
          
          <Input
            label="Código Postal"
            {...register('zipCode', { required: 'Este campo es requerido' })}
            error={errors.zipCode?.message}
          />
        </div>
        
        <Input
          label="Teléfono"
          type="tel"
          {...register('phone', { required: 'Este campo es requerido' })}
          error={errors.phone?.message}
        />
        
        <Button type="submit" className="w-full">
          Continuar con el pago
        </Button>
      </form>
    </div>
  );
};

export default ShippingForm;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz
