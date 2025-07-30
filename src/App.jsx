import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/common/Header';
import PaymentFailed from './components/payment/PaymentFailed';
import EmailVerificationPage from './components/auth/EmailVerification';
import HostelReviews from './components/hostel/HostelReviews';
import './index.css';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLandingPage from './pages/MainLandingPage';
import TestInput from './pages/TestInput';
import HostelDetails from './components/hostel/HostelDetails';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingPage from './pages/BookingPage';
import HostRoomPage from './pages/HostRoomPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950">
          <Header />

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<MainLandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/booking/:id" element={<BookingPage />} />

              <Route path="/test" element={<TestInput />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/verify-email" element={<EmailVerificationPage />} />

              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/hostel/:id"
                element={
                  <ProtectedRoute>
                    <HostelDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <MyBookingsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/booking-page"
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/host-room"
                element={
                  <ProtectedRoute>
                    <HostRoomPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Admpage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;