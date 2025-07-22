import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import ReviewForm from './components/reviews/ReviewForm';
import ReviewList from './components/reviews/ReviewList';
import ReviewCard from './components/reviews/ReviewCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FAQ />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className="min-h-screen bg-[#1E1E2F] text-white px-4 py-8 font-sans">
        <section className="my-10 space-y-12 max-w-3xl mx-auto">
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
    </Router>
  );
}

export default App;
