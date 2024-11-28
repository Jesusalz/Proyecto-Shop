import React from 'react';
import clsx from 'clsx';

const Card = ({ 
  children, 
  className,
  padding = 'normal',
  hover = false,
  ...props 
}) => {
  const paddings = {
    small: 'p-3',
    normal: 'p-4',
    large: 'p-6'
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-sm',
        paddings[padding],
        hover && 'transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;