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
import HostelDetails from './components/hostel/HostelDetails';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import Admpage from "./Admin/Admpage";

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
           
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/verify-email" element={<EmailVerificationPage />} />

              {/* Fixed route - changed from /hostels/:id to /hostel/:id and using HostelDetail */}
              <Route
                path="/hostel/:id"
                element={
                  <ProtectedRoute>
                    <HostelDetails />
                  </ProtectedRoute>
                }
              />

              {/* Optional: Standalone reviews route */}
              <Route
                path="/hostel/:id/reviews"
                element={
                  <ProtectedRoute>
                    <HostelReviews hostelId={window.location.pathname.split('/')[2]} />
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