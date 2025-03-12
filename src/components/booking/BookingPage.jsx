import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BookingForm from './BookingForm';
import BookingCalendar from './BookingCalendar';
import TableLayout from './TableLayout';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [guestCount, setGuestCount] = useState(2);

  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-4 text-warning">Book a Table at AlDiner</h2>
      <p className="text-center text-muted">Reserve a table at your favorite restaurant in London and enjoy a hassle-free dining experience.</p>
      
      <Row className="gy-4">
        <Col md={7}>
          <Card className="shadow-sm p-3 border-warning">
            <h5 className="fw-bold mb-3 text-dark">Select Date & Time</h5>
            <BookingCalendar 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
            
            <div className="mt-4">
              <h5 className="fw-bold text-dark">Available Tables</h5>
              <TableLayout 
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                guestCount={guestCount}
                selectedTable={selectedTable}
                onTableSelect={setSelectedTable}
              />
            </div>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow-sm p-3 border-warning">
            <h5 className="fw-bold mb-3 text-dark">Complete Your Reservation</h5>
            <BookingForm 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onTimeChange={setSelectedTime}
              guestCount={guestCount}
              onGuestCountChange={setGuestCount}
              selectedTable={selectedTable}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;
