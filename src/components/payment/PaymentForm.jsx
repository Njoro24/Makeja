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
    phone: '', // For M-Pesa
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mpesaResult, setMpesaResult] = useState(null)
  const [checkoutRequestId, setCheckoutRequestId] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // M-Pesa Payment Function
  const handleMpesaPayment = async () => {
    if (!formData.phone) {
      setError('Phone number is required for M-Pesa')
      return
    }

    setLoading(true)
    setError(null)
    setMpesaResult(null)

    try {
      const mpesaData = {
        phone: formData.phone,
        amount: bookingData?.totalAmount || 1, // Use booking amount or default to 1
        account_reference: bookingData?.bookingId || 'BOOKING',
        description: `Payment for ${bookingData?.hostelName || 'Hostel Booking'}`
      }

      const response = await fetch('http://localhost:5000/api/mpesa/stk-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mpesaData)
      })

      const result = await response.json()
      setMpesaResult(result)

      if (result.success && result.data.CheckoutRequestID) {
        setCheckoutRequestId(result.data.CheckoutRequestID)
        // You can automatically check status after a delay
        setTimeout(() => checkMpesaStatus(result.data.CheckoutRequestID), 10000)
      } else {
        setError(result.message || 'M-Pesa payment failed')
      }
    } catch (err) {
      setError('M-Pesa payment failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  // Check M-Pesa Payment Status
  const checkMpesaStatus = async (requestId = checkoutRequestId) => {
    if (!requestId) return

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/mpesa/stk-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkout_request_id: requestId
        })
      })

      const result = await response.json()
      setMpesaResult(result)

      // If payment is successful, redirect to success page
      if (result.success && result.data.ResultCode === '0') {
        // Payment successful
        navigate('/payment-success')
      } else if (result.data?.ResultCode === '1032') {
        setError('Payment was cancelled by user')
      } else {
        setError('Payment failed or is still pending')
      }
    } catch (err) {
      setError('Failed to check payment status')
    } finally {
      setLoading(false)
    }
  }

  // Original Card Payment Function
  const handleCardPayment = async () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.paymentMethod === 'mpesa') {
      await handleMpesaPayment()
    } else {
      await handleCardPayment()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
      {error && <p className="text-red-400 bg-red-900/20 p-3 rounded border border-red-600">{error}</p>}
      
      {/* M-Pesa Success/Progress */}
      {mpesaResult && (
        <div className={`p-4 rounded ${mpesaResult.success ? 'bg-green-900/20 border border-green-600' : 'bg-red-900/20 border border-red-600'}`}>
          <h3 className={`font-medium ${mpesaResult.success ? 'text-green-400' : 'text-red-400'}`}>
            {mpesaResult.success ? 'M-Pesa Request Sent' : 'M-Pesa Error'}
          </h3>
          <p className="text-sm text-gray-300 mt-1">
            {mpesaResult.success 
              ? mpesaResult.data?.CustomerMessage || 'Check your phone for M-Pesa prompt'
              : mpesaResult.message
            }
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-1 text-white">Name on Payment</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-gray-900 p-2 rounded border border-gray-600 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-white">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-900 p-2 rounded border border-gray-600 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-white">Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full bg-gray-900 p-2 rounded border border-gray-600 text-white"
        >
          <option value="card">Credit/Debit Card</option>
          <option value="mpesa">M-PESA</option>
        </select>
      </div>

      {/* M-Pesa Phone Number Field */}
      {formData.paymentMethod === 'mpesa' && (
        <div>
          <label className="block text-sm font-semibold mb-1 text-white">Phone Number</label>
          <input
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="254708374149"
            className="w-full bg-gray-900 p-2 rounded border border-gray-600 text-white"
          />
          <p className="text-xs text-gray-400 mt-1">Format: 254XXXXXXXXX</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white font-semibold disabled:opacity-50"
        >
          {loading ? 'Processing...' : 
           formData.paymentMethod === 'mpesa' ? 'Pay with M-Pesa' : 'Pay Now'}
        </button>

        {/* Check Status Button for M-Pesa */}
        {checkoutRequestId && formData.paymentMethod === 'mpesa' && (
          <button
            type="button"
            onClick={() => checkMpesaStatus()}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded text-white font-semibold disabled:opacity-50"
          >
            Check Status
          </button>
        )}
      </div>

      {/* M-Pesa Instructions */}
      {formData.paymentMethod === 'mpesa' && (
        <div className="bg-gray-700 p-3 rounded text-sm text-gray-300">
          <h4 className="font-semibold text-green-400 mb-2">M-Pesa Payment Steps:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click "Pay with M-Pesa"</li>
            <li>Check your phone for M-Pesa prompt</li>
            <li>Enter your M-Pesa PIN</li>
            <li>Click "Check Status" to confirm payment</li>
          </ol>
        </div>
      )}
    </form>
  )
}