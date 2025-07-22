import React from 'react';
import { Home } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log(`Section with ID "${sectionId}" not found`);
    }
  };

  return (
    <header className="bg-slate-950/90 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-purple-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 p-2 rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/40 hover:shadow-purple-400/50">
              <Home className="h-6 w-6 text-white drop-shadow-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
              Makeja
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-purple-200 transition-all duration-300 hover:scale-110 relative group hover:drop-shadow-lg">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full shadow-lg shadow-purple-500/50"></span>
            </Link>
            <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-purple-200 transition-all duration-300 hover:scale-110 relative group hover:drop-shadow-lg">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full shadow-lg shadow-purple-500/50"></span>
            </button>
            <button onClick={() => scrollToSection('featured-hostels')} className="text-gray-300 hover:text-purple-200 transition-all duration-300 hover:scale-110 relative group hover:drop-shadow-lg">
              <span className="bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent font-medium">Browse Hostels</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full shadow-lg shadow-purple-500/50"></span>
            </button>
            <button onClick={() => scrollToSection('contact-section')} className="text-gray-300 hover:text-purple-200 transition-all duration-300 hover:scale-110 relative group hover:drop-shadow-lg">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full shadow-lg shadow-purple-500/50"></span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-slate-800/80 backdrop-blur-sm text-white rounded-xl hover:bg-slate-700/80 transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-purple-500/20 border border-purple-500/30 hover:border-purple-400/50"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 text-white rounded-xl hover:from-purple-500 hover:via-violet-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-purple-500/40"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;