import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const RelatedProductItem = ({ product }) => {
  return (
    <div className="w-48 h-64 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="h-36 p-2">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium truncate">{product.title}</h3>
        <p className="text-lg font-bold text-indigo-600">${product.price}</p>
        <div className="flex justify-end mt-2">
          <Link to={`/products/${product.id}`}>
            <button className="p-1.5 rounded-full bg-indigo-100 hover:bg-indigo-200">
              <MagnifyingGlassIcon className="h-4 w-4 text-indigo-600" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductItem;
//Visita mi GitHub: https://github.com/Jesusalz