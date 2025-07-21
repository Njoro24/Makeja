// src/components/common/Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-navy text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
