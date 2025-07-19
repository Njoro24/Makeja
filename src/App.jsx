import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookingPage from './pages/BookingPage' 
import LoginPage from './pages/LoginPage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
