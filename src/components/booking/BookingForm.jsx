import { useState } from 'react'
import DatePicker from '../booking/DatePicker'
import { useBooking } from '../../hooks/useBooking'
import toast from 'react-hot-toast'

const unavailableDates = [
  new Date('2025-07-20'),
  new Date('2025-07-22'),
  new Date('2025-07-25'),
]

const BookingForm = ({ roomId }) => {
  const { saveBooking } = useBooking()
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!checkIn || !checkOut) {
      toast.error("Both dates are required.")
      return
    }

    if (checkOut <= checkIn) {
      toast.error("Check-out must be after check-in.")
      return
    }

    if (!roomId) {
      toast.error("Room ID is missing.")
      return
    }

    saveBooking({ checkIn, checkOut, guests, roomId })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 transition-all"
      >
        <h2 className="text-2xl font-bold text-center">Book Your Stay</h2>

        <DatePicker
          label="Check-In Date"
          selectedDate={checkIn}
          onChange={setCheckIn}
          blockedDates={unavailableDates}
          minDate={new Date()}
          placeholder="Pick a check-in date"
        />

        <DatePicker
          label="Check-Out Date"
          selectedDate={checkOut}
          onChange={setCheckOut}
          blockedDates={unavailableDates}
          minDate={checkIn || new Date()}
          placeholder="Pick a check-out date"
        />

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-300">Number of Guests</label>
          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 py-3 rounded-lg font-semibold transition transform duration-150"
        >
          Save Booking Details
        </button>
      </form>
    </div>
  )
}

export default BookingForm
