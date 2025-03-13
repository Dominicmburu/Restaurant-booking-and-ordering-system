import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { format } from 'date-fns';
import { useBooking } from '../../hooks/useBooking';

const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30'
];

const restaurants = ['Burger House', 'Sushiteria', 'Happy Grill'];

const BookingForm = ({ selectedDate, selectedTime, onTimeChange, guestCount, onGuestCountChange, selectedTable }) => {
  const { createBooking } = useBooking();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', specialRequests: '', restaurant: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !selectedTable || !formData.restaurant) {
      setError('Please select a date, time, and table before booking');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await createBooking({
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        guests: guestCount,
        tableId: selectedTable,
        ...formData
      });

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', specialRequests: '', restaurant: '' });
    } catch (err) {
      setError('Unable to complete booking. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Your booking has been confirmed! Check your email for details.</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Select Restaurant</Form.Label>
        <Form.Select name="restaurant" value={formData.restaurant} onChange={handleChange} required>
          <option value="">Choose a restaurant</option>
          {restaurants.map((restaurant, index) => (
            <option key={index} value={restaurant}>{restaurant}</option>
          ))}
        </Form.Select>
      </Form.Group>
      
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Preferred Time</Form.Label>
            <Form.Select value={selectedTime} onChange={(e) => onTimeChange(e.target.value)} required>
              <option value="">Select a time</option>
              {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Number of Guests</Form.Label>
            <Form.Select value={guestCount} onChange={(e) => onGuestCountChange(parseInt(e.target.value))} required>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Special Requests</Form.Label>
        <Form.Control as="textarea" rows={3} name="specialRequests" value={formData.specialRequests} onChange={handleChange} />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">Confirm Reservation</Button>
    </Form>
  );
};

export default BookingForm;
