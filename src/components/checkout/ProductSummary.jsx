import React from 'react';

const ProductSummary = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>{item.name} x {item.quantity}</span> 
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductSummary;