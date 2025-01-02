import React from 'react';

const Input = React.forwardRef((props, ref) => {
  const { label, type = 'text', placeholder, value, onChange, error, ...rest } = props;

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref} // Pasa la ref al elemento input
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default Input;
//Visita mi GitHub: https://github.com/Jesusalz
