// src/components/common/Navigation.jsx

import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-primary text-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">MakejaHostels</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {/* Future links like Bookings, Profile, etc. */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
