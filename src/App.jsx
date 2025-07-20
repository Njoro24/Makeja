import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingConfirmation from "./components/booking/BookingConfirmation";
import BookingHistory from "./components/booking/BookingHistory";
import RoomSelector from "./components/booking/RoomSelector";
import HostelDetails from "./components/hostel/HostelDetails";
import HostelImages from "./components/hostel/HostelImages";
import HostelAmenities from "./components/hostel/HostelAmenities";
import HostelReviews from "./components/hostel/HostelReviews";
import NotFound from "./components/common/NotFound"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        <Route path="/booking/history" element={<BookingHistory />} />
        <Route path="/booking/room-selector" element={<RoomSelector />} />
        <Route path="/hostel/details" element={<HostelDetails />} />
        <Route path="/hostel/images" element={<HostelImages />} />
        <Route path="/hostel/amenities" element={<HostelAmenities />} />
        <Route path="/hostel/reviews" element={<HostelReviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
