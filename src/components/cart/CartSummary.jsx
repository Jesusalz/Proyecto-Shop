import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartTotal, selectCartItems } from '@/store/cartSlice';
import { Button } from '@/components/common';

const CartSummary = () => {
  const total = useSelector(selectCartTotal);
  const items = useSelector(selectCartItems);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Productos ({items.length})</p>
          <p className="text-sm font-medium text-gray-900">${total.toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Envío</p>
          <p className="text-sm font-medium text-gray-900">Gratis</p>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-gray-900">Total</p>
            <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <Button
        className="w-full mt-6"
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        {items.length === 0 ? 'Carrito vacío' : 'Proceder al pago'}
      </Button>
    </div>
  );
};

export default CartSummary;