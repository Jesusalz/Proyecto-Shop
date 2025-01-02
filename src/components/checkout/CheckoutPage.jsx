import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cartSlice';
import ShippingForm from './ShippingForm';
import PaymentMethods from './PaymentMethods';
import CheckoutSummary from './CheckoutSummary';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const navigate = useNavigate(); // Usa useNavigate para redirigir

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setStep(3);
    navigate('/checkout-success'); // Redirige a la página de éxito
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && <ShippingForm onNext={handleShippingSubmit} />}
          {step === 2 && (
            <PaymentMethods 
              onNext={(method) => handlePaymentMethodSelect(method)} 
              onBack={() => setStep(1)} 
            />
          )}
        </div>
        <div>
          <CheckoutSummary 
            items={cartItems} 
            total={total} 
            step={step} 
            shippingData={shippingData}
            paymentMethod={paymentMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;