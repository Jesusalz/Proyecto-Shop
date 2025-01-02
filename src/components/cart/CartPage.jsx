import { useSelector } from 'react-redux';
import { selectCartItems } from '@/store/cartSlice';
import { Cart } from '@/components/cart';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <ShoppingBagIcon className="h-8 w-8 text-indigo-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">Mi Carrito ({cartItems.length})</h1>
      </div>

      <Cart />
    </div>
  );
};

export default CartPage;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz