import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { XCircleIcon, ArrowLeftIcon, RefreshCcwIcon, PhoneIcon } from 'lucide-react'

export default function PaymentFailed() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [countdown, setCountdown] = useState(10)
  
  // Get failure reason from URL params
  const reason = searchParams.get('reason') || 'Unknown error occurred'
  const checkoutRequestId = searchParams.get('checkout_request_id')
  const amount = searchParams.get('amount')
  const phone = searchParams.get('phone')

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/payment')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  const handleRetryPayment = () => {
    // Navigate back to payment form with pre-filled data
    navigate('/payment', { 
      state: { 
        prefill: { 
          phone, 
          amount,
          paymentMethod: 'mpesa' 
        } 
      } 
    })
  }

  const handleBackToBooking = () => {
    navigate('/booking')
  }

  const handleContactSupport = () => {
    // You can integrate with your support system
    window.open('mailto:support@makeja.com?subject=Payment Failed - Help Needed', '_blank')
  }

  // Common failure reasons and their user-friendly messages
  const getFailureMessage = (reason) => {
    const messages = {
      'cancelled': 'You cancelled the payment on your phone',
      'timeout': 'Payment request timed out. Please try again',
      'insufficient_funds': 'Insufficient M-Pesa balance. Please top up and try again',
      'invalid_phone': 'Invalid phone number format',
      'network_error': 'Network connection issue. Please check your internet',
      'rate_limit': 'Too many requests. Please wait a moment and try again',
      'system_error': 'M-Pesa system temporarily unavailable'
    }
    return messages[reason.toLowerCase()] || reason
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Failure Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-900/20 rounded-full mb-4">
            <XCircleIcon className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment Failed</h1>
          <p className="text-gray-400">Don't worry, no money was deducted</p>
        </div>

        {/* Error Details Card */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-4">
            {/* Failure Reason */}
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
              <h3 className="text-red-400 font-semibold mb-2">What happened?</h3>
              <p className="text-gray-300 text-sm">{getFailureMessage(reason)}</p>
            </div>

            {/* Payment Details */}
            {(amount || phone) && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Payment Details</h3>
                <div className="space-y-2 text-sm">
                  {amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">KES {amount}</span>
                    </div>
                  )}
                  {phone && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-white">{phone}</span>
                    </div>
                  )}
                  {checkoutRequestId && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reference:</span>
                      <span className="text-white text-xs font-mono">
                        {checkoutRequestId.slice(-8)}...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Common Solutions */}
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">Quick Fixes</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Check your M-Pesa balance</li>
                <li>• Ensure you have network connection</li>
                <li>• Try a different phone number</li>
                <li>• Wait a few minutes before retrying</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Retry Payment */}
          <button
            onClick={handleRetryPayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCcwIcon className="w-5 h-5" />
            Try Payment Again
          </button>

          {/* Back to Booking */}
          <button
            onClick={handleBackToBooking}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Booking
          </button>

          {/* Contact Support */}
          <button
            onClick={handleContactSupport}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <PhoneIcon className="w-5 h-5" />
            Contact Support
          </button>
        </div>

        {/* Auto Redirect Notice */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Redirecting to payment page in {countdown} seconds
          </p>
          <button
            onClick={() => setCountdown(0)}
            className="text-blue-400 hover:text-blue-300 text-sm underline mt-1"
          >
            Cancel auto-redirect
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Need Help?</h4>
            <p className="text-gray-400 text-sm mb-3">
              If you continue experiencing issues, our support team is here to help.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <a href="tel:+254700000000" className="text-blue-400 hover:text-blue-300">
                Call Support
              </a>
              <span className="text-gray-500">•</span>
              <a href="mailto:support@makeja.com" className="text-blue-400 hover:text-blue-300">
                Email Us
              </a>
              <span className="text-gray-500">•</span>
              <a href="/help" className="text-blue-400 hover:text-blue-300">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}