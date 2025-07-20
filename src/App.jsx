import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingConfirmation from './components/BookingConfirmation';
import BookingHistory from './components/BookingHistory';
import RoomSelector from './components/RoomSelector';
import HostelList from './components/HostelList';
import HostelDetails from './components/HostelDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<RoomSelector />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />
          <Route path="/booking/history" element={<BookingHistory />} />
          <Route path="/hostels" element={<HostelList />} />
          <Route path="/hostels/:id" element={<HostelDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
