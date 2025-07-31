import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookingPage from './pages/BookingPage'
import LoginPage from './pages/LoginPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import PaymentSuccess from './components/payment/PaymentSuccess.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  )
}

export default App;
