// utils/formatters.js

// Formats a number as Kenyan Shillings currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
};

// Formats a rating to one decimal place
export const formatRating = (rating) => {
  return rating.toFixed(1);
};
