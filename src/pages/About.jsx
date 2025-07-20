import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/common/Modal'; 

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#0b1d36] text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Ideal Student Accommodation</h1>
        <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
          Makeja is designed to help students find verified, affordable, and comfortable hostels near their institutions.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-[#0b1d36] font-semibold px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            Talk to Us
          </button>
          <Link to="/register">
            <button className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-2 rounded transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Let's Connect!</h2>
        <p className="text-gray-700">You can reach out to us via email or phone. We’re here to help you find the best accommodation.</p>
        <div className="mt-4 text-right">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-[#1e3a8a] text-white px-4 py-2 rounded hover:bg-[#1e40af]"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* About Us Section */}
      <section className="py-16 px-4 md:px-24">
        <h2 className="text-3xl font-semibold mb-6">About Us</h2>
        <p className="text-base md:text-lg max-w-4xl">
          At Makeja, our mission is to simplify the student housing journey. Whether you're a freshman seeking your first hostel
          or a senior looking for a change, Makeja provides listings with detailed info, verified hosts, and a secure booking system.
        </p>
      </section>

      {/* About Hostels Section */}
      <section className="py-16 px-4 md:px-24 bg-[#112240]">
        <h2 className="text-3xl font-semibold mb-6">About Our Hostels</h2>
        <p className="text-base md:text-lg max-w-4xl">
          We partner with trusted hostel owners and landlords to ensure every listing is safe and student-friendly.
          You can filter by preferences like room type, pricing, amenities, and location.
        </p>
      </section>
    </div>
  );
};

export default About;
