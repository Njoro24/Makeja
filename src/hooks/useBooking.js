import { useState } from 'react'
import toast from 'react-hot-toast'
import { createBooking } from '../services/booking'

export function useBooking() {
  const [bookingData, setBookingData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  
  const saveBooking = async ({ checkIn, checkOut, guests, roomId  }) => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await createBooking({
        check_in: checkIn.toISOString(),
        check_out: checkOut.toISOString(),
        guests,
        room_id: roomId,            
        // property_id: propertyId, 
      })

      setBookingData(data)
      toast.success('Booking successful')
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Booking failed'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return { bookingData, loading, error, saveBooking }
}
