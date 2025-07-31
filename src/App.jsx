// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/common/Header';
import PaymentFailed from './components/payment/PaymentFailed';
import EmailVerificationPage from './components/auth/EmailVerification';
import './index.css';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLandingPage from './pages/MainLandingPage';
import TestInput from './pages/TestInput';
import HostelDetail from './components/hostel/HostelDetail';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage'; // Add this
import BookingConfirmation from './components/booking/BookingConfirmation'; // Add this

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
              <Route path="/test" element={<TestInput />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/verify-email" element={<EmailVerificationPage />} />
              
              {/* Booking routes */}
              <Route 
                path="/booking/:roomId" 
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/booking-confirmation" 
                element={
                  <ProtectedRoute>
                    <BookingConfirmation />
                  </ProtectedRoute>
                } 
              />

              {/* Hostel routes */}
              <Route
                path="/hostels/:id"
                element={
                  <ProtectedRoute>
                    <HostelDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
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
                    <div>Admin Panel - Coming Soon</div>
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
