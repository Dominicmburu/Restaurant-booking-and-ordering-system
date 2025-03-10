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
      <h2 className="text-center fw-bold mb-4">Reserve Your Table</h2>
      
      <Row className="gy-4">
        <Col md={7}>
          <Card className="shadow-sm p-3">
            <h5 className="fw-bold mb-3">Select Date & Time</h5>
            <BookingCalendar 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
            
            <div className="mt-4">
              <h5 className="fw-bold">Available Tables</h5>
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

        {/* Reservation Form */}
        <Col md={5}>
          <Card className="shadow-sm p-3">
            <h5 className="fw-bold mb-3">Complete Your Reservation</h5>
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
