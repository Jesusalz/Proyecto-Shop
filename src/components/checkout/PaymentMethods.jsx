import React, { useState } from 'react';
import { Button } from '@/components/common';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  QrCodeIcon 
} from '@heroicons/react/24/outline';

const PaymentMethods = ({ onNext, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Tarjeta de Crédito',
      icon: CreditCardIcon,
    },
    {
      id: 'cash',
      name: 'Efectivo',
      icon: BanknotesIcon,
    },
    {
      id: 'qr',
      name: 'Pago con QR',
      icon: QrCodeIcon,
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Método de Pago</h2>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMethod === method.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'hover:border-gray-400'
            }`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="flex items-center">
              <method.icon className="h-6 w-6 text-gray-600" />
              <span className="ml-3 font-medium">{method.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Volver
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedMethod}
          className="flex-1"
        >
          Confirmar pedido
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;
