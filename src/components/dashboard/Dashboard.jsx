import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BookingManagement from './BookingManagement';
import OrderManagement from './OrderManagement';
import Analytics from './Analytics';

const Dashboard = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-4">Admin Dashboard</h2>

      <Row className="gy-4">
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <BookingManagement />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm p-3">
            <OrderManagement />
          </Card>
        </Col>

        <Col xs={12}>
          <Card className="shadow-sm p-3">
            <Analytics />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
