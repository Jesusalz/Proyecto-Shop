import { useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '@/store/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, title, price, thumbnail, quantity } = item;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center py-4 border-b"
    >
      {/* Imagen del Producto */}
      <div className="flex-shrink-0 w-24 h-24">
        <img
          src={thumbnail || '/placeholder-image.jpg'} // Usa un placeholder si no hay imagen
          alt={title || 'Producto sin nombre'} // Usa un texto alternativo si no hay nombre
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg'; // Muestra un placeholder si la imagen no se carga
          }}
        />
      </div>
    
      {/* Información del Producto */}
      <div className="ml-4 flex-1">
        <h3 className="text-base font-medium text-gray-900">
          {title || 'Producto sin nombre'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">${price}</p>
      
        {/* Selector de Cantidad */}
        <div className="mt-2 flex items-center">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            -
          </button>
          <span className="mx-2 min-w-[2rem] text-center">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
    
      {/* Precio Total y Botón de Eliminar */}
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">
          ${(price * quantity).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="mt-2 text-sm text-red-600 hover:text-red-500 flex items-center"
        >
          <TrashIcon className="h-4 w-4 mr-1" />
          Eliminar
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz