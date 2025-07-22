import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'; 

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

        
        <div className="mb-8 text-center space-y-2">
          <p>Email: <a href="mailto:support@makeja.com" className="text-blue-400">support@makeja.com</a></p>
          <p>Phone: <a href="tel:+254712345678" className="text-blue-400">+254 712 345 678</a></p>
          <p>Location: Nairobi, Kenya</p>
        </div>

        
        <div className="flex justify-center gap-6 mb-10">
          <div className="hover:text-pink-400 cursor-pointer"><Instagram /></div>
          <div className="hover:text-blue-500 cursor-pointer"><Facebook /></div>
          <div className="hover:text-sky-400 cursor-pointer"><Twitter /></div>
          <div className="hover:text-blue-300 cursor-pointer"><Linkedin /></div>
        </div>

        
        <form className="grid grid-cols-1 gap-6 bg-[#1E293B] p-6 rounded-xl shadow-lg mb-12">
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

        
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Makeja Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.076401242737!2d36.8121!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10eaf268b3e1%3A0x53eec5b620fda17b!2sNairobi!5e0!3m2!1sen!2ske!4v1629306251647!5m2!1sen!2ske"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
