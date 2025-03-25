import React from 'react';
import { Container, Button, Card, Row, Col, ListGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaMotorcycle, FaHome, FaStore, FaClock, FaUtensils, FaTruck } from 'react-icons/fa';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderNumber, orderDetails } = location.state || {};
  
  // Extract order information if available
  const { items = [], summary = {}, customer = {} } = orderDetails || {};
  const { orderType, location: restaurant } = summary || {};
  
  // Estimated delivery time (30-45 minutes for delivery, 15-20 for pickup)
  const getEstimatedTime = () => {
    if (orderType === 'delivery') {
      return '30-45 minutes';
    } else {
      return '15-20 minutes';
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center p-4 shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <FaCheckCircle className="text-success mx-auto mb-3" size={80} />
            
            <h2 className="fw-bold mb-2">Thank You for Your Order!</h2>
            <h5 className="text-muted mb-4">Order #{orderNumber || 'Confirmed'}</h5>
            
            <Card className="mb-4 border-0 bg-light" style={{ borderRadius: '10px' }}>
              <Card.Body className="text-start">
                <h4 className="mb-3">Order Details</h4>
                
                {restaurant && (
                  <div className="d-flex align-items-center mb-3">
                    <FaStore className="text-warning me-2" />
                    <div>
                      <div className="fw-bold">{restaurant.name}</div>
                      <div className="text-muted small">{restaurant.address}</div>
                    </div>
                  </div>
                )}
                
                <div className="d-flex align-items-center mb-3">
                  {orderType === 'delivery' ? (
                    <FaMotorcycle className="text-warning me-2" />
                  ) : (
                    <FaUtensils className="text-warning me-2" />
                  )}
                  <div>
                    <div className="fw-bold">
                      {orderType === 'delivery' ? 'Delivery' : 'Pickup'}
                    </div>
                    <div className="text-muted small">
                      {orderType === 'delivery' 
                        ? `To: ${customer.address}, ${customer.city} ${customer.postcode}`
                        : 'Ready for collection at restaurant'}
                    </div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <FaClock className="text-warning me-2" />
                  <div>
                    <div className="fw-bold">Estimated {orderType === 'delivery' ? 'Delivery' : 'Preparation'} Time</div>
                    <div className="text-muted small">{getEstimatedTime()}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            
            <p className="mb-4">
              We've sent a confirmation email to <b>{customer.email || 'your email address'}</b> with your order details. 
              You'll also receive updates about your order status.
            </p>
            
            <div className="bg-light p-3 mb-4 rounded">
              <h5 className="text-start mb-3">Why Our Customers Keep Coming Back</h5>
              <div className="text-start mb-2">
                <FaTruck className="text-warning me-2" />
                <span className="fw-bold">Fast Delivery</span> - We pride ourselves on getting your food to you hot and fresh
              </div>
              <div className="text-start mb-2">
                <FaUtensils className="text-warning me-2" />
                <span className="fw-bold">Authentic Turkish Cuisine</span> - Prepared by expert chefs using traditional recipes
              </div>
              <div className="text-start">
                <FaStore className="text-warning me-2" />
                <span className="fw-bold">Three Convenient Locations</span> - Serving all of Birmingham with our delicious offerings
              </div>
            </div>
            
            <div className="d-flex flex-column flex-md-row gap-2 justify-content-center">
              <Button variant="outline-secondary" onClick={() => navigate('/')}>
                <FaHome className="me-1" /> Return to Home
              </Button>
              
              <Button variant="warning" onClick={() => navigate('/menu')}>
                Place Another Order
              </Button>
              
              {orderType === 'delivery' && (
                <Button variant="outline-primary" onClick={() => navigate('/booking')}>
                  Book a Table for Next Time
                </Button>
              )}
            </div>
            
            <div className="mt-4 text-muted small">
              Need help with your order? Contact us at <b>0121 XXX XXXX</b>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmation;