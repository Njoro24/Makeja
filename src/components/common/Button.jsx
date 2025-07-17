import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

 
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      onClick={onClick}
      
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props} t
    >
      {children} {}
    </button>
  );
};

export default Button;
