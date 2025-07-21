import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { createBooking } from '../services/booking'

export function useBooking() {
  const [bookingData, setBookingData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const saveBooking = async ({ checkIn, checkOut, guests, propertyId, userId }) => {
    setLoading(true)
    setError(null)

    try {
      const response = await createBooking({
        check_in: checkIn.toISOString(),
        check_out: checkOut.toISOString(),
        guests,
        property_id: propertyId,
        user_id: userId,
      })

      setBookingData(response.data)
      toast.success('Booking successful!')
    } catch (err) {
      console.error('Booking failed:', err)
      setError(err.response?.data?.message || 'Booking failed')
      toast.error('Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { bookingData, loading, error, saveBooking }
}
