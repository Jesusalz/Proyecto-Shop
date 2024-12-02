import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectCategoryProducts,
  selectSelectedCategory 
} from '@/store/categorySlice';
import { ProductList } from '@/components/products';

const CategoryProducts = () => {
  const selectedCategory = useSelector(selectSelectedCategory);
  const products = useSelector(selectCategoryProducts(selectedCategory));

  if (!selectedCategory) {
    return (
      <div className="text-center text-gray-500 p-8">
        Selecciona una categoría para ver los productos
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {selectedCategory}
      </h2>
      <ProductList products={products} />
    </div>
  );
};

export default CategoryProducts;
