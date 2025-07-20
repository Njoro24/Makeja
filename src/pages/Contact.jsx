import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'; 

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

        {/* Contact Info */}
        <div className="mb-8 text-center space-y-2">
          <p>Email: <a href="mailto:support@makeja.com" className="text-blue-400">support@makeja.com</a></p>
          <p>Phone: <a href="tel:+254712345678" className="text-blue-400">+254 712 345 678</a></p>
          <p>Location: Nairobi, Kenya</p>
        </div>

        {/* Social Media Icons (non-functional) */}
        <div className="flex justify-center gap-6 mb-10">
          <div className="hover:text-pink-400 cursor-pointer"><Instagram /></div>
          <div className="hover:text-blue-500 cursor-pointer"><Facebook /></div>
          <div className="hover:text-sky-400 cursor-pointer"><Twitter /></div>
          <div className="hover:text-blue-300 cursor-pointer"><Linkedin /></div>
        </div>

        {/* Contact Form */}
        <form className="grid grid-cols-1 gap-6 bg-[#1E293B] p-6 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-md bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-md bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Subject"
            className="p-3 rounded-md bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="p-3 rounded-md bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 px-6 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;


