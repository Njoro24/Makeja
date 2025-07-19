import { useBooking } from '../../hooks/useBooking'
import { format } from 'date-fns'

export default function BookingSummary() {
  const { bookingData } = useBooking()

  if (!bookingData?.checkIn || !bookingData?.checkOut) {
    return (
      <div className="bg-zinc-800 text-gray-300 p-6 rounded-xl shadow-md">
        <p className="text-sm italic">No booking information available yet.</p>
      </div>
    )
  }

  const formattedCheckIn = format(bookingData.checkIn, 'MMM dd, yyyy')
  const formattedCheckOut = format(bookingData.checkOut, 'MMM dd, yyyy')

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl space-y-3">
      <h2 className="text-xl font-bold">Booking Summary</h2>

      <div className="flex justify-between">
        <span className="text-gray-400">Check-In:</span>
        <span>{formattedCheckIn}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">Check-Out:</span>
        <span>{formattedCheckOut}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">Guests:</span>
        <span>{bookingData.guests}</span>
      </div>

      <div className="flex justify-between border-t border-gray-700 pt-3">
        <span className="font-semibold text-gray-200">Total Price:</span>
        <span className="font-semibold text-green-400">
          Ksh {bookingData.totalPrice?.toLocaleString() || '0'}
        </span>
      </div>
    </div>
  )
}
