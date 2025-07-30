import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/common/Header';
import PaymentFailed from './components/payment/PaymentFailed';
import './index.css';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLandingPage from './pages/MainLandingPage';
import TestInput from './pages/TestInput';
import HostelDetails from './components/hostel/HostelDetails'; 

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

              <Route
                path="/hostels/:id"
                element={
                  <ProtectedRoute>
                    <HostelDetails />
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
                    <div>Dashboard - Coming Soon</div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <div>Profile - Coming Soon</div>
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
