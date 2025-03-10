import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Menu from './Menu';
import Cart from './Cart';

const OrderPage = () => {
  const [orderType, setOrderType] = useState('delivery');

  const handleTabChange = (value) => {
    setOrderType(value);
  };

  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-4">Online Ordering</h2>

      {/* Order Type Toggle */}
      <div className="d-flex justify-content-center mb-4">
        <ToggleButtonGroup type="radio" name="orderType" value={orderType} onChange={handleTabChange}>
          <ToggleButton id="delivery" value="delivery" variant="outline-primary">
            Delivery
          </ToggleButton>
          <ToggleButton id="pickup" value="pickup" variant="outline-primary">
            Pickup
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Row className="gy-4">
        {/* Menu Section */}
        <Col md={8}>
          <Card className="shadow-sm p-3">
            <Menu orderType={orderType} />
          </Card>
        </Col>

        {/* Cart Section */}
        <Col md={4}>
          <Card className="shadow-sm p-3 position-sticky" style={{ top: '24px' }}>
            <Cart orderType={orderType} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;
