import React from 'react';
import inside from '../assets/images/inside.jpg';
import keja from '../assets/images/keja.jpg';
import qejani from '../assets/images/qejani.jpg';
import Qhostel from '../assets/images/Qhostel.jpg';
import Qwetu from '../assets/images/Qwetu-Parklands.jpg';

const About = () => {
  return (
    <div className="bg-[#0b1d36] text-white min-h-screen">
      
      <section className="py-16 px-4 md:px-24 text-center">
        <h1 className="text-4xl font-bold mb-4">About Makeja</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Making student housing simple, safe, and affordable across the continent.
        </p>
      </section>

      
      <section className="py-12 px-4 md:px-24">
        <h2 className="text-2xl font-semibold mb-6">About Us</h2>
        <p className="text-gray-300 leading-relaxed">
          We are the leading platform connecting students with verified, affordable hostel accommodation worldwide.
          Our mission is to make quality student housing accessible near campuses and study destinations across the globe.
          We partner exclusively with student–friendly hostels that offer study spaces, flexible schedules, and budget–conscious rates.
          Every listing is verified for safety and quality, ensuring you can focus on your studies while enjoying a comfortable stay.
          Join thousands of students who trust us to find their perfect home away from home during their academic journey.
        </p>
      </section>

      
      <section className="py-12 px-4 md:px-24">
        <h2 className="text-2xl font-semibold mb-6">About Our Hostels</h2>
        <p className="text-gray-300 leading-relaxed">
          Our partner hostels are carefully selected to meet the unique needs of student travelers.
          Each hostel features dedicated study areas with reliable WiFi, quiet zones for focused learning,
          and vibrant common spaces for socializing with fellow students. All accommodations prioritize safety with 24/7 security,
          clean facilities, and female-only dorm options where available.
          Located within walking distance or easy transport access to major universities and colleges,
          our hostels understand academic schedules with flexible check–in times and extended stays.
          From budget–friendly shared dorms to private rooms, every hostel offers authentic local experiences
          while maintaining the comfort and community students need to thrive.
        </p>
      </section>

      
      <section className="py-16 px-4 md:px-24">
        <h2 className="text-2xl font-semibold mb-10 text-center">Featured Hostels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          
          <div className="text-center">
            <img src={inside} alt="Highrise Hostels" className="rounded-xl shadow-md w-full h-56 object-cover" />
            <p className="mt-2">Highrise Hostels</p>
          </div>

          
          <div className="text-center">
            <img src={keja} alt="Kejani Living" className="rounded-xl shadow-md w-full h-56 object-cover" />
            <p className="mt-2">Kejani Living</p>
          </div>

          
          <div className="text-center">
            <img src={qejani} alt="B-Block Living" className="rounded-xl shadow-md w-full h-56 object-cover" />
            <p className="mt-2">B-Block Living</p>
          </div>

          
          <div className="text-center">
            <img src={Qhostel} alt="Green Park Hostel" className="rounded-xl shadow-md w-full h-56 object-cover" />
            <p className="mt-2">Green Park Hostel</p>
          </div>

          
          <div className="text-center">
            <img src={Qwetu} alt="Tranquil Stay" className="rounded-xl shadow-md w-full h-56 object-cover" />
            <p className="mt-2">Tranquil Stay</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
