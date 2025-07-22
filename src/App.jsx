import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProfilePage from './pages/ProfilePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/common/Footer';

import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import ReviewForm from './components/reviews/ReviewForm';
import ReviewList from './components/reviews/ReviewList';
import StarRating from './components/reviews/StarRating';
import Alert from './components/common/Alert';
import LoadingSpinner from './components/common/LoadingSpinner';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PaymentSuccess from './components/payment/PaymentSuccess.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#1E1E2F] text-white font-sans">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Optional Review Section */}
          <section className="my-10 space-y-12 max-w-3xl mx-auto px-4 py-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Star Rating</h2>
              <StarRating rating={4} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Submit a Review</h2>
              <div className="bg-[#2A2A40] p-6 rounded-xl shadow-md">
                <ReviewForm />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
              <div className="bg-[#2A2A40] p-6 rounded-xl shadow-md">
                <ReviewList />
              </div>
            </div>

            <div className="flex items-center gap-6 mt-12">
              <Alert type="success" message="Operation completed successfully." />
              <LoadingSpinner />
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
