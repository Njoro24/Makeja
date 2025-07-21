// src/services/hostel.js

export const getHostels = async () => {
  try {
    const response = await fetch('http://localhost:5000/hostels');
    if (!response.ok) {
      throw new Error('Failed to fetch hostels');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hostels:', error);
    return [];
  }
};
