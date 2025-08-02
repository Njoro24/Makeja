import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MapPin, DollarSign, Users, Calendar } from 'lucide-react';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/api/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        toast.error('Failed to load room details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  if (!room) return <div className="text-white">Room not found</div>;

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl max-w-4xl mx-auto">
      <img
        src={room.imageUrl || 'https://via.placeholder.com/800x400'}
        alt={room.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h1 className="text-3xl font-bold mb-2">{room.title}</h1>

      <div className="flex items-center gap-4 text-sm text-slate-300 mb-4">
        <span className="flex items-center gap-1"><MapPin size={16} /> {room.location}</span>
        <span className="flex items-center gap-1"><DollarSign size={16} /> KES {room.price}</span>
        <span className="flex items-center gap-1"><Users size={16} /> {room.capacity || 1} person(s)</span>
      </div>

      <p className="mb-6">{room.description || 'No description provided.'}</p>

      <button
        onClick={handleBookNow}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default RoomDetailsPage;
