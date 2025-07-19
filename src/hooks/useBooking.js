import { useState, useEffect } from 'react'
import { createBooking, checkAvailability, calculateTotalPrice } from '../services/booking'
import dayjs from 'dayjs'

export function useBooking() {
  const [bookingData, setBookingData] = useState({
    propertyId: '',
    userId: '',
    startDate: '',
    endDate: '',
    guests: 1,
    notes: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [unavailableDates, setUnavailableDates] = useState([])

  const handleChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const fetchUnavailableDates = async (propertyId) => {
    try {
      const dates = await checkAvailability(propertyId)
      setUnavailableDates(dates.map(date => new Date(date)))
    } catch (err) {
      console.error('Failed to fetch unavailable dates', err)
    }
  }

  const calculatePrice = async () => {
    try {
      const formattedData = {
        ...bookingData,
        startDate: dayjs(bookingData.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(bookingData.endDate).format('YYYY-MM-DD'),
      }
      const price = await calculateTotalPrice(formattedData)
      setTotalPrice(price)
    } catch (err) {
      console.error('Price calculation failed', err)
    }
  }

  useEffect(() => {
    if (bookingData.propertyId) {
      fetchUnavailableDates(bookingData.propertyId)
    }
  }, [bookingData.propertyId])

  useEffect(() => {
    if (bookingData.propertyId && bookingData.startDate && bookingData.endDate) {
      calculatePrice()
    }
  }, [bookingData.propertyId, bookingData.startDate, bookingData.endDate])

  const submitBooking = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const payload = {
        ...bookingData,
        startDate: dayjs(bookingData.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(bookingData.endDate).format('YYYY-MM-DD'),
      }

      const response = await createBooking(payload)

      if (response.status === 201 || response.status === 200) {
        setSuccess(true)
        // Optional: reset booking state
        setBookingData({
          propertyId: '',
          userId: '',
          startDate: '',
          endDate: '',
          guests: 1,
          notes: ''
        })
        return response.data
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return {
    bookingData,
    handleChange,
    submitBooking,
    loading,
    error,
    success,
    totalPrice,
    unavailableDates,
    fetchUnavailableDates
  }
}
