import { useSelector } from 'react-redux';
import { selectCartItems } from '@/store/cartSlice';
import { Cart } from '@/components/cart';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <ShoppingBagIcon className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Mi Carrito ({cartItems.length})</h1>
        </div>
        
        <Link
          to="/products"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Seguir comprando
        </Link>
      </div>

      <Cart />
    </div>
  );
};

export default CartPage;