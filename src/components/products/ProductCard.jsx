import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="flex-none w-[250px]">
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-[200px] w-full object-contain"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
          <div className="mt-1 flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
//Visita mi GitHub: https://github.com/Jesusalz

