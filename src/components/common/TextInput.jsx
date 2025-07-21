// src/components/common/TextInput.jsx
import React from 'react';

const TextInput = ({ label, value, onChange, name, type = 'text', placeholder }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-navy font-semibold mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-navy"
      />
    </div>
  );
};

export default TextInput;
