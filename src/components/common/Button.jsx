// src/components/common/Button.jsx

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ children, type = 'button', onClick, className, variant = 'primary' }) => {
  const baseStyle = 'px-4 py-2 rounded font-medium transition focus:outline-none';

  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-900',
    secondary: 'bg-white text-primary border border-primary hover:bg-neutral',
    accent: 'bg-accent text-white hover:bg-blue-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const buttonClass = classNames(baseStyle, variants[variant], className);

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'danger']),
};

export default Button;
