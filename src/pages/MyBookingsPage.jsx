import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { CalendarDays, BedDouble, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const { token } = useAuth()

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBookings(res.data)
    } catch (err) {
      toast.error('Could not load bookings')
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className="bg-black min-h-screen px-4 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-gray-400 mb-4 text-lg">You haven't booked anything yet.</p>
            <div className="flex justify-center gap-4">
              <Link
                to="/booking-page"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
              >
                Browse Rooms
              </Link>
              
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <Link
                to="/host-room"
                className="inline-block bg-green-700 hover:bg-green-600 transition text-white px-4 py-2 rounded-md"
              >
                Want to become a host?
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-zinc-900 p-5 rounded-2xl shadow-lg border border-zinc-700 hover:shadow-xl transition flex flex-col"
                >
                  {booking.room?.image && (
                    <img
                      src={booking.room.image}
                      alt={booking.room.name}
                      className="rounded-xl mb-4 h-40 object-cover"
                    />
                  )}

                  <div className="mb-3">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <BedDouble className="w-5 h-5 text-blue-400" />
                      {booking.room?.name || 'Unnamed Room'}
                    </h2>
                  </div>

                  <div className="text-sm text-zinc-300 space-y-2 flex-1">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-green-400" />
                      From: {new Date(booking.start_date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-pink-400" />
                      To: {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                    {booking.room?.location && (
                      <p className="flex items-center gap-2 text-blue-400">
                        <MapPin className="w-4 h-4" />
                        {booking.room.location}
                      </p>
                    )}
                    <p className="text-xs text-zinc-500 mt-2">
                      Booking ID: {booking.id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MyBookingsPage
