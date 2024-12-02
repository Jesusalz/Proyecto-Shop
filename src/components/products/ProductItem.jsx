import PropTypes from 'prop-types';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '@/components/features/favorites';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const defaultImage = 'https://via.placeholder.com/300x200?text=Producto';

  const handleImageError = (e) => {
    e.target.src = defaultImage;
    e.target.onerror = null;
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col h-full shadow-lg rounded-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img
          src={product.thumbnail || product.images?.[0] || defaultImage}
          alt={product.title}
          className="h-full w-full object-cover object-center"
          onError={handleImageError}
        />
      </div>
      
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <div className="flex gap-2">
            <FavoriteButton product={product} />
            <Link to={`/products/${product.id}`}>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
              </button>
            </Link>
            <button 
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    discountPercentage: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

FavoriteButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // Add other relevant product properties here
  }).isRequired
};

export default ProductItem;
