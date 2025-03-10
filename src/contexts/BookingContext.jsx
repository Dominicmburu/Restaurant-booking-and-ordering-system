import React, { createContext, useState, useContext } from 'react';

export const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    return [
      { id: 1, tableId: 3, guests: 4, date: '2025-03-15', time: '19:00' }
    ];
  };

  return (
    <BookingContext.Provider value={{ bookings, fetchBookings }}>
      {children}
    </BookingContext.Provider>
  );
};
