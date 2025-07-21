import { useState } from 'react'
import DatePicker from '../booking/DatePicker'
import { useBooking } from '../../hooks/useBooking'
import toast from 'react-hot-toast'

const unavailableDates = [
  new Date('2025-07-20'),
  new Date('2025-07-22'),
  new Date('2025-07-25'),
]

const BookingForm = () => {
  const { saveBooking } = useBooking()
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!checkIn || !checkOut || checkOut <= checkIn) {
      toast.error('Invalid date range selected')
      return
    }

    saveBooking({ checkIn, checkOut, guests })
    toast.success('Booking details saved')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-gray-800 space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">Book Your Stay</h2>

        <div className="space-y-4">
          <DatePicker
            label="Check-In"
            selectedDate={checkIn}
            onChange={setCheckIn}
            blockedDates={unavailableDates}
            minDate={new Date()}
            placeholder="Pick check-in date"
          />

          <DatePicker
            label="Check-Out"
            selectedDate={checkOut}
            onChange={setCheckOut}
            blockedDates={unavailableDates}
            minDate={checkIn || new Date()}
            placeholder="Pick check-out date"
          />

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-300">Guests</label>
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  )
}

export default BookingForm
