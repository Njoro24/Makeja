import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

export const createBooking = (bookingData) => {
  return axios.post(`${API_BASE_URL}/bookings`, bookingData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
}
