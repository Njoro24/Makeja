import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'


import ReviewForm from './components/reviews/ReviewForm'
import ReviewList from './components/reviews/ReviewList'
import StarRating from './components/reviews/StarRating'

import Alert from './components/common/Alert'
import LoadingSpinner from './components/common/LoadingSpinner'


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
        

        <Routes>
          <Route path="/" element={<FAQ />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <section className="my-10 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Star Rating</h2>
            <StarRating rating={4} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Submit a Review</h2>
            <ReviewForm />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
            <ReviewList />
          </div>

          <div className="flex items-center gap-6">
            <Alert type="success" message="Operation completed successfully." />
            <LoadingSpinner />
          </div>
        </section>
      </div>
    </Router>
  )
}

export default App
