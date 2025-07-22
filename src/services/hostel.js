// src/services/hostel.js (with fetch)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getHostels = async () => {
  const res = await fetch(`${API_BASE_URL}/hostels`);
  if (!res.ok) throw new Error('Failed to fetch hostels');
  return res.json(); // returns parsed data
};

export const getHostelById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/hostels/${id}`);
  if (!res.ok) throw new Error('Failed to fetch hostel');
  return res.json();
};
