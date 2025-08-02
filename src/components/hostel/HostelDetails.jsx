import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HostelImages from './HostelImages';
import HostelReviews from './HostelReviews';
import HostelAmenities from './HostelAmenities';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const HostelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for development - same as in Home component
  const mockHostels = [
    {
      id: 1,
      name: "Sunrise Student Lodge",
      location: "Nairobi",
      price: 8000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      gender: "mixed",
      rooms: 2,
      amenities: ["WiFi", "Security", "Parking", "24/7 Water", "Study Room", "Kitchen"],
      description: "A modern student lodge located in the heart of Nairobi, offering comfortable accommodation with excellent amenities. Perfect for students looking for a convenient location with easy access to universities and colleges.",
      images: [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
      ],
      reviews: [
        {
          id: 1,
          user: "John Kamotho",
          rating: 5,
          comment: "Excellent hostel with great facilities. The staff is very helpful and the location is perfect.",
          date: "2024-01-15"
        },
        {
          id: 2,
          user: "Jane Wanjiru",
          rating: 4,
          comment: "Good value for money. Clean rooms and reliable WiFi. Highly recommended for students.",
          date: "2024-01-10"
        }
      ],
      contact: {
        phone: "+254 700 123 456",
        email: "info@sunriselodge.co.ke",
        address: "Riverside Drive, Nairobi"
      }
    },
    {
      id: 2,
      name: "Queens Hostel",
      location: "Mombasa",
      price: 6500,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      gender: "female",
      rooms: 1,
      amenities: ["WiFi", "Kitchen", "Laundry", "Security", "Study Area", "Common Room"],
      description: "A safe and comfortable hostel exclusively for female students in Mombasa. Features modern amenities and a supportive community environment.",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
      ],
      reviews: [
        {
          id: 1,
          user: "Mary Kamum",
          rating: 5,
          comment: "Safe and clean environment. Great for female students. The management is very caring.",
          date: "2024-01-12"
        }
      ],
      contact: {
        phone: "+254 700 234 567",
        email: "info@queenshostel.co.ke",
        address: "Nyali, Mombasa"
      }
    },
    {
      id: 3,
      name: "Campus View Hostel",
      location: "Kisumu",
      price: 5500,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      gender: "male",
      rooms: 3,
      amenities: ["WiFi", "Study Room", "Security", "Parking", "Kitchen", "Recreation Area"],
      description: "Affordable accommodation for male students in Kisumu. Close to major universities with excellent study facilities.",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
      ],
      reviews: [
        {
          id: 1,
          user: "Peter Ochieng",
          rating: 4,
          comment: "Good location and affordable rates. The study room is very helpful during exams.",
          date: "2024-01-08"
        }
      ],
      contact: {
        phone: "+254 700 345 678",
        email: "info@campusview.co.ke",
        address: "Milimani, Kisumu"
      }
    },
    {
      id: 4,
      name: "Modern Living Hostel",
      location: "Nakuru",
      price: 7200,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      gender: "mixed",
      rooms: 2,
      amenities: ["WiFi", "Gym", "Parking", "Kitchen", "Laundry", "24/7 Security", "Study Area"],
      description: "Modern hostel with premium amenities including a gym and spacious common areas. Perfect for students who value comfort and convenience.",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop"
      ],
      reviews: [
        {
          id: 1,
          user: "Sarah Wanjiku",
          rating: 5,
          comment: "Love the gym facilities! The hostel is very clean and modern. Highly recommend.",
          date: "2024-01-14"
        },
        {
          id: 2,
          user: "David Kiprop",
          rating: 4,
          comment: "Great facilities and good management. The location is convenient for students.",
          date: "2024-01-11"
        }
      ],
      contact: {
        phone: "+254 700 456 789",
        email: "info@modernliving.co.ke",
        address: "Section 58, Nakuru"
      }
    }
  ];

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        setLoading(true);
        setError(null);

        // Find in mock data
        const mockHostel = mockHostels.find(h => h.id === parseInt(id));
        
        if (mockHostel) {
          setHostel(mockHostel);
        } else {
          throw new Error('Hostel not found');
        }
        
      } catch (err) {
        console.error('Error fetching hostel:', err);
        setError(err.message || 'Failed to load hostel details.');
        toast.error(err.message || 'Failed to load hostel details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHostel();
    }
  }, [id]);

  // Transform images for HostelImages component
  const transformedImages = hostel?.images?.map(img => ({
    thumbnail: img.replace('w=800&h=600', 'w=200&h=150'),
    full: img
  })) || [];

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-6 min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-white">Loading hostel details...</p>
      </div>
    </div>
  );
     
  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-slate-950 min-h-screen">
      <div className="bg-red-900/50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-200">{error}</p>
          </div>
        </div>
      </div>
      <button 
        onClick={() => navigate(-1)}
        className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeft className="mr-2" /> Back to hostels
      </button>
    </div>
  );
     
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-slate-950 min-h-screen">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeft className="mr-2" /> Back to hostels
      </button>
             
      {hostel && (
        <div className="space-y-8">
          {/* Hostel Details */}
          <div className="bg-slate-900 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-white mb-4">{hostel.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-300 mb-4">{hostel.description}</p>
                <div className="space-y-2">
                  <p className="text-white"><span className="font-semibold">Location:</span> {hostel.location}</p>
                  <p className="text-white"><span className="font-semibold">Price:</span> KES {hostel.price}/month</p>
                  <p className="text-white"><span className="font-semibold">Gender:</span> {hostel.gender}</p>
                  <p className="text-white"><span className="font-semibold">Rooms:</span> {hostel.rooms}</p>
                  <p className="text-white"><span className="font-semibold">Rating:</span> {hostel.rating}/5</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-slate-300">Phone: {hostel.contact.phone}</p>
                  <p className="text-slate-300">Email: {hostel.contact.email}</p>
                  <p className="text-slate-300">Address: {hostel.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        
          {/* Images */}
          <div className="bg-slate-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
            <HostelImages images={transformedImages} />
          </div>

          {/* Amenities */}
          <div className="bg-slate-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Amenities</h2>
            <HostelAmenities amenities={hostel.amenities} />
          </div>

          {/* Reviews */}
          <div className="bg-slate-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Reviews</h2>
            <HostelReviews 
              reviews={hostel.reviews}
              hostelId={hostel.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelDetail;