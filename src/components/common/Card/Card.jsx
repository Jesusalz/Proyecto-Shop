import React from 'react';
import clsx from 'clsx';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={clsx("bg-white shadow rounded-lg p-4", className)} {...props}>
      {children}
    </div>
  );
};

export default Card;