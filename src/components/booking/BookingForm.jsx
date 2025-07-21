import { useState } from 'react'
import DatePicker from '../booking/DatePicker' 
import { useBooking } from '../../hooks/useBooking'

// Hardcoded for now — should eventually come from backen
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
      alert("Please select a valid date range.")
      return
    }

    saveBooking({ checkIn, checkOut, guests })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
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
          <label className="text-sm">Number of Guests</label>
          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="p-3 rounded bg-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold"
        >
          Save Booking Details
        </button>
      </form>
    </div>
  )
}

export default BookingForm
