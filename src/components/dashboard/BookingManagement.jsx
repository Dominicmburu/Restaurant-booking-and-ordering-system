import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap';
import { useBooking } from '../../hooks/useBooking';

const BookingManagement = () => {
  const { fetchBookings } = useBooking();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      const data = await fetchBookings();
      setBookings(data);
      setLoading(false);
    };
    loadBookings();
  }, []);

  return (
    <Card className="shadow-sm p-3">
      <h5 className="fw-bold mb-3">Booking Management</h5>

      {loading ? (
        <div className="d-flex justify-content-center p-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <ListGroup>
          {bookings.map((booking) => (
            <ListGroup.Item key={booking.id}>
              <strong>Table {booking.tableId} - {booking.guests} Guests</strong>
              <br />
              <small className="text-muted">{booking.date} at {booking.time}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Card>
  );
};

export default BookingManagement;
