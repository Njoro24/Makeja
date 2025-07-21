
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { processPayment } from '../../services/payment'
import { useBooking } from '../../hooks/useBooking'

export default function PaymentForm() {
  const { bookingData } = useBooking()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: 'card',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await processPayment({ ...formData, booking: bookingData })
      navigate('/payment-success')
    } catch (err) {
      setError('Payment failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
      {error && <p className="text-red-400">{error}</p>}
      <div>
        <label className="block text-sm font-semibold mb-1">Name on Payment</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-gray-900 p-2 rounded border border-gray-600"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-900 p-2 rounded border border-gray-600"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full bg-gray-900 p-2 rounded border border-gray-600"
        >
          <option value="card">Credit/Debit Card</option>
          <option value="mpesa">M-PESA</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white font-semibold"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  )
}
