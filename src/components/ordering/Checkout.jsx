import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge, Tab, Nav, Alert } from 'react-bootstrap';
import { FaLocationArrow, FaCreditCard, FaMoneyBill, FaClock, FaUser, FaPhone, FaHome, FaMapMarkerAlt, FaCheck, FaStore } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items = [], orderSummary = {} } = location.state || {};
  const { orderType, subtotal = 0, deliveryFee = 0, tip = 0, total = 0, location: restaurantLocation } = orderSummary;
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    addressDetails: '',
    city: 'Birmingham',
    postcode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    deliveryTime: 'asap',
    scheduledTime: '',
    notes: '',
    selectedLocation: restaurantLocation ? restaurantLocation.name : ''
  });
  
  const [validated, setValidated] = useState(false);
  const [locationError, setLocationError] = useState(false);
  
  const restaurantLocations = [
    {
      name: "TurkNazz Shirley",
      address: "148-150 Stratford Road, B90 3BD",
      maxSeating: 50
    },
    {
      name: "TurkNazz Moseley",
      address: "107 Alcester Road, B13 8DD",
      maxSeating: 40
    },
    {
      name: "TurkNazz Sutton Coldfield",
      address: "22 Beeches walk, B73 6HN",
      maxSeating: 45
    }
  ];
  
  useEffect(() => {
    // If a location was passed from the previous page, set it
    if (restaurantLocation) {
      setFormData(prevData => ({
        ...prevData,
        selectedLocation: restaurantLocation.name
      }));
    }
  }, [restaurantLocation]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear location error if a location is selected
    if (name === 'selectedLocation' && value) {
      setLocationError(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Check if a restaurant location is selected
    if (!formData.selectedLocation) {
      setLocationError(true);
      e.stopPropagation();
      return;
    }
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Find the full location object
    const selectedLocationObj = restaurantLocations.find(loc => loc.name === formData.selectedLocation);
    
    // In a real app, you would process the order here
    navigate('/order-confirmation', { 
      state: { 
        orderNumber: Math.floor(100000 + Math.random() * 900000),
        orderDetails: {
          items,
          summary: {
            ...orderSummary,
            location: selectedLocationObj
          },
          customer: formData
        }
      }
    });
  };
  
  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4">Checkout</h2>
      
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            {/* Restaurant Location Selection */}
            <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <h5 className="mb-3">Select Restaurant Location</h5>
                {locationError && (
                  <Alert variant="danger" className="mb-3">
                    Please select a restaurant location.
                  </Alert>
                )}
                <Form.Group controlId="selectedLocation">
                  <Form.Label>Choose which TurkNazz location you'd like to order from</Form.Label>
                  <div className="mb-3">
                    {restaurantLocations.map((rest, index) => (
                      <Form.Check
                        key={index}
                        type="radio"
                        id={`location-${index}`}
                        name="selectedLocation"
                        value={rest.name}
                        label={
                          <div>
                            <strong>{rest.name}</strong>
                            <div className="text-muted small">{rest.address}</div>
                          </div>
                        }
                        checked={formData.selectedLocation === rest.name}
                        onChange={handleChange}
                        className="mb-2"
                        isInvalid={locationError}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>
            
            <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <h5 className="mb-3">Contact Information</h5>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        style={{ borderRadius: '10px' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        style={{ borderRadius: '10px' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid phone number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        style={{ borderRadius: '10px' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            {orderType === 'delivery' && (
              <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Body>
                  <h5 className="mb-3">Delivery Address</h5>
                  <Row className="g-3">
                    <Col md={12}>
                      <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Street address"
                          style={{ borderRadius: '10px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your address.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="addressDetails">
                        <Form.Label>Apartment, suite, etc. (optional)</Form.Label>
                        <Form.Control
                          type="text"
                          name="addressDetails"
                          value={formData.addressDetails}
                          onChange={handleChange}
                          placeholder="Apartment, suite, unit, etc."
                          style={{ borderRadius: '10px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          style={{ borderRadius: '10px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="postcode">
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleChange}
                          placeholder="Postcode"
                          style={{ borderRadius: '10px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid postcode.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            
            <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <h5 className="mb-3">
                  {orderType === 'delivery' ? 'Delivery Time' : 'Pickup Time'}
                </h5>
                <Form.Group className="mb-3">
                  <div className="d-flex flex-wrap gap-3">
                    <Form.Check
                      type="radio"
                      id="delivery-asap"
                      name="deliveryTime"
                      value="asap"
                      label={
                        <div className="d-flex align-items-center">
                          <FaClock className="me-2 text-warning" />
                          <span>As soon as possible</span>
                        </div>
                      }
                      checked={formData.deliveryTime === 'asap'}
                      onChange={handleChange}
                      className="custom-radio"
                    />
                    <Form.Check
                      type="radio"
                      id="delivery-scheduled"
                      name="deliveryTime"
                      value="scheduled"
                      label={
                        <div className="d-flex align-items-center">
                          <FaClock className="me-2 text-warning" />
                          <span>Schedule for later</span>
                        </div>
                      }
                      checked={formData.deliveryTime === 'scheduled'}
                      onChange={handleChange}
                      className="custom-radio"
                    />
                  </div>
                </Form.Group>
                
                {formData.deliveryTime === 'scheduled' && (
                  <Form.Group controlId="scheduledTime" className="mt-3">
                    <Form.Label>Select {orderType === 'delivery' ? 'delivery' : 'pickup'} time</Form.Label>
                    <Form.Control
                      required
                      type="datetime-local"
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleChange}
                      style={{ borderRadius: '10px' }}
                    />
                  </Form.Group>
                )}
              </Card.Body>
            </Card>
            
            <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <h5 className="mb-3">Payment Method</h5>
                <Nav variant="pills" className="mb-3">
                  <Nav.Item>
                    <Nav.Link 
                      active={formData.paymentMethod === 'card'}
                      onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                      className="d-flex align-items-center"
                    >
                      <FaCreditCard className="me-2" /> Credit/Debit Card
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={formData.paymentMethod === 'cash'}
                      onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
                      className="d-flex align-items-center"
                    >
                      <FaMoneyBill className="me-2" /> Cash on {orderType === 'delivery' ? 'Delivery' : 'Pickup'}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                
                {formData.paymentMethod === 'card' && (
                  <div className="card-payment-form mt-3">
                    <Row className="g-3">
                      <Col md={12}>
                        <Form.Group controlId="cardNumber">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            style={{ borderRadius: '10px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid card number.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="cardExpiry">
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            style={{ borderRadius: '10px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid expiry date.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="cardCVC">
                          <Form.Label>CVC</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="cardCVC"
                            value={formData.cardCVC}
                            onChange={handleChange}
                            placeholder="123"
                            style={{ borderRadius: '10px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid CVC.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}
              </Card.Body>
            </Card>
            
            <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <h5 className="mb-3">Additional Notes</h5>
                <Form.Group controlId="notes">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions or requests?"
                    style={{ borderRadius: '10px' }}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="shadow-sm position-sticky" style={{ top: '24px', borderRadius: '15px' }}>
              <Card.Header className="bg-white border-0 pt-3">
                <h5 className="mb-0">Order Summary</h5>
                {formData.selectedLocation && (
                  <div className="text-muted small d-flex align-items-center mt-1">
                    <FaStore className="me-1" /> {formData.selectedLocation}
                  </div>
                )}
              </Card.Header>
              <Card.Body className="px-0 pt-2">
                <ListGroup variant="flush">
                  {items.map((item) => (
                    <ListGroup.Item key={item.id} className="px-3 py-2 border-bottom d-flex justify-content-between">
                      <div>
                        <span className="fw-medium">{item.quantity} × {item.name}</span>
                      </div>
                      <span className="fw-bold">£{(item.price * item.quantity).toFixed(2)}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                
                <div className="px-3 pt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Delivery Fee</span>
                      <span>£{deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  {parseFloat(tip) > 0 && (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Tip</span>
                      <span>£{parseFloat(tip).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between fw-bold mt-2 pt-2 border-top">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="px-3 pt-4">
                  <Button 
                    variant="warning" 
                    type="submit"
                    className="w-100 py-2" 
                    style={{ borderRadius: '30px' }}
                  >
                    Place Order
                  </Button>
                  
                  <div className="text-center mt-3">
                    <small className="text-muted">
                      By placing your order, you agree to our Terms of Service and Privacy Policy
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CheckoutPage;