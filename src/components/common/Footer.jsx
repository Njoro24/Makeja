import React from 'react';
import { Home } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950/90 backdrop-blur-xl border-t border-purple-500/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 p-2 rounded-2xl shadow-2xl shadow-purple-500/40">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
                Makeja
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner in finding quality student accommodation in Nairobi. 
              Safe, secure, and community-focused living spaces.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">Home</a></li>
              <li><a href="#hostels" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">Browse Hostels</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-500/20 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Makeja. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;