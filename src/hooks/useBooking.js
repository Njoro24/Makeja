import { useState } from 'react';

export function useBooking(initialBooking = null) {
  const [booking, setBooking] = useState(initialBooking);
  return [booking, setBooking];
}
