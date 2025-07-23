// src/pages/PaymentPage.jsx
import PaymentForm from '../components/payment/PaymentForm'
import BookingSummary from '../components/booking/BookingSummary'
import { useBooking } from '../hooks/useBooking'
import { useNavigate } from 'react-router-dom'

export default function PaymentPage() {
  const { bookingData } = useBooking()
  const navigate = useNavigate()

  if (!bookingData) {
    navigate('/book') 
    return null
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/3">
        <h2 className="text-3xl font-bold mb-4">Payment</h2>
        <PaymentForm />
      </div>
      <div className="w-full md:w-1/3">
        <BookingSummary />
      </div>
    </div>
  )
}