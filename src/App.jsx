import { Routes, Route } from 'react-router-dom';

import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './components/payment/PaymentSuccess';

function App() {
  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      <Routes>
        <Route path="/" element={<FAQ />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
