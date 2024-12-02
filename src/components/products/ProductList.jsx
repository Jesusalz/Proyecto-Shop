import React from 'react';
import { Card } from '@/components/common';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <Card key={`${product._id || product.id}-${index}`} className="h-full">
          <ProductItem product={product} />
        </Card>
      ))}
    </div>
  );
};

export default ProductList;