import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] text-white pt-8 pb-6 mt-0">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
        {/* Social Icons */}
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-pink-400 transition" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-blue-500 transition" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-sky-400 transition" aria-label="Twitter/X">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-blue-300 transition" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Makeja. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
