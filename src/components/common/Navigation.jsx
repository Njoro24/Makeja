// components/common/Navigation.jsx
import React, { useContext } from 'react';
import Button from './Button';
import { ThemeContext } from '../../context/ThemeContext.jsx';

const NavItem = ({ children, onClick }) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-200"
  >
    {children}
  </a>
);

const Navigation = ({ onNavigate }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center rounded-b-xl">
      <div
        className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer"
        onClick={() => onNavigate('/hostels')}
      >
        Kejani
      </div>

      <div className="flex items-center space-x-6">
        <NavItem onClick={() => onNavigate('/hostels')}>Hostels</NavItem>
        <NavItem onClick={() => onNavigate('/about')}>About</NavItem>
        <NavItem onClick={() => onNavigate('/contact')}>Contact</NavItem>
        <NavItem onClick={() => onNavigate('/profile')}>Profile</NavItem>

        <Button variant="secondary" onClick={toggleTheme} className="p-2 rounded-full">
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.325 3.325l-.707.707M6.382 6.382l-.707-.707M18.364 5.636l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
            </svg>
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
