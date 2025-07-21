// src/components/payment/PaymentSuccess.jsx
import { Link } from 'react-router-dom'

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Payment Successful</h1>
      <p className="mb-6">Your booking has been confirmed. A receipt has been sent to your email.</p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded text-white font-semibold"
      >
        Return to Home
      </Link>
    </div>
  )
}
