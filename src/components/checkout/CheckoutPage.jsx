import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cartSlice';
import ShippingForm from './ShippingForm';
import PaymentMethods from './PaymentMethods';
import CheckoutSummary from './CheckoutSummary';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && <ShippingForm onNext={() => setStep(2)} />}
          {step === 2 && <PaymentMethods onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        </div>
        <div>
          <CheckoutSummary items={cartItems} total={total} step={step} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz