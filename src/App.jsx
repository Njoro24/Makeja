import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import ReviewForm from './components/reviews/ReviewForm';
import ReviewList from './components/reviews/ReviewList';
import ReviewCard from './components/reviews/ReviewCard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1E1E2F] text-white font-sans">
        <Routes>
          <Route path="/" element={<FAQ />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/reviewform" element={<ReviewForm />} />
          <Route path="/reviewlist" element={<ReviewList />} />
          <Route path="/reviewcard" element={<ReviewCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
