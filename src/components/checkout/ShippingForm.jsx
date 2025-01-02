import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '@/components/common';

const ShippingForm = ({ onNext }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Información de Envío</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nombre completo"
          {...register('fullName', { 
            required: 'Este campo es requerido',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres'
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'El nombre solo puede contener letras y espacios'
            }
          })}
          error={errors.fullName?.message}
        />
        
        <Input
          label="Dirección"
          {...register('address', { 
            required: 'Este campo es requerido',
            minLength: {
              value: 5,
              message: 'La dirección debe tener al menos 5 caracteres'
            }
          })}
          error={errors.address?.message}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Ciudad"
            {...register('city', { 
              required: 'Este campo es requerido',
              minLength: {
                value: 2,
                message: 'La ciudad debe tener al menos 2 caracteres'
              }
            })}
            error={errors.city?.message}
          />
          
          <Input
            label="Código Postal"
            {...register('zipCode', { 
              required: 'Código Postal es requerido',
              pattern: {
                value: /^[A-Z]?\d{4}[A-Z]{0,3}$/,
                message: 'Código Postal inválido'
              }
            })}
            error={errors.zipCode?.message}
          />
        </div>
        
        <Input
          label="Teléfono"
          type="tel"
          {...register('phone', { 
            required: 'Número de teléfono es requerido',
            pattern: {
              value: /^(\+?54|0)?(?:9?\d{10})$/,
              message: 'Número de teléfono argentino inválido'
            },
            validate: (value) => {
              const cleanPhone = value.replace(/[\s\-()]/g, '');
              return (
                (cleanPhone.length >= 10 && cleanPhone.length <= 13) || 
                'El teléfono debe tener entre 10 y 13 dígitos'
              );
            }
          })}
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