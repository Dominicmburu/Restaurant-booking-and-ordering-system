import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className="text-center p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <FaCheckCircle className="text-success mb-3" size={80} />
        
        <h3 className="fw-bold">Thank You for Your Order!</h3>
        
        <p className="text-muted">
          Your order has been placed successfully. We will notify you once it is ready.
        </p>
        
        <Button variant="primary" onClick={() => navigate('/menu')}>
          Back to Menu
        </Button>
      </Card>
    </Container>
  );
};

export default OrderConfirmation;
