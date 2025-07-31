

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://makejabe-1.onrender.com/api';

export const getHostels = async () => {
  const res = await fetch(`${API_BASE_URL}/hostels`);
  if (!res.ok) throw new Error('Failed to fetch hostels');
  return res.json(); 
};

export const getHostelById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/hostels/${id}`);
  if (!res.ok) throw new Error('Failed to fetch hostel');
  return res.json();
};
