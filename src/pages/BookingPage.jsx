import { useParams } from 'react-router-dom'
import BookingForm from '../components/booking/BookingForm'

const BookingPage = () => {
  const { roomId } = useParams()

  return (
    <div className="bg-black min-h-screen text-white">
      <BookingForm roomId={roomId} />
    </div>
  )
}

export default BookingPage
