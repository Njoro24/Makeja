
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-navy p-4">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-navy">Welcome to Kejani</h1>
        <p className="text-lg mt-2 text-gray-700">
          Find and book affordable student hostels near you
        </p>
        <Link
          to="/search"
          className="mt-6 inline-block bg-navy text-white py-2 px-6 rounded-full hover:bg-blue-900 transition"
        >
          Search Hostels
        </Link>
      </header>

      <section className="grid md:grid-cols-2 gap-6 py-10">
        <div>
          <img
            src="/images/hero-bg.jpg"
            alt="Hostel"
            className="rounded-2xl shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-navy mb-4">Why Kejani?</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Verified Hostels</li>
            <li>Secure Online Booking</li>
            <li>Affordable Prices</li>
            <li>Easy Payments</li>
          </ul>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-4">
        &copy; {new Date().getFullYear()} Kejani. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
