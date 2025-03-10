import React, { useState } from 'react';
import { Card, Button, ListGroup, Form, Alert } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { useOrder } from '../../hooks/useOrder';
import { useNavigate } from 'react-router-dom';

const Cart = ({ orderType }) => {
  const { 
    cart, 
    updateItemQuantity, 
    removeFromCart, 
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    calculateDeliveryFee
  } = useOrder();

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const navigate = useNavigate();
  
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateItemQuantity(id, newQuantity);
    }
  };

  const handlePromoCodeApply = () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      setPromoSuccess('');
      return;
    }

    // Demo promo code validation
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoSuccess('Promo code applied! 10% discount');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoSuccess('');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const deliveryFee = orderType === 'delivery' ? calculateDeliveryFee() : 0;
  const total = calculateTotal(subtotal, tax, deliveryFee);

  const isEmpty = cart.length === 0;

  return (
    <Card className="shadow-sm p-3">
      <div className="d-flex align-items-center mb-3">
        <FaShoppingCart className="me-2" size={24} />
        <h5 className="mb-0">Your Order</h5>
      </div>

      {isEmpty ? (
        <div className="text-center p-4 border border-secondary-subtle rounded">
          <p className="fw-bold mb-2">Your cart is empty</p>
          <p className="text-muted">Add items from the menu to get started</p>
        </div>
      ) : (
        <>
          <ListGroup className="mb-3">
            {cart.map((item) => (
              <ListGroup.Item key={item.id} className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{item.name}</strong>
                  <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                {/* Customizations */}
                {item.customizations && Object.keys(item.customizations).length > 0 && (
                  <div className="small text-muted mt-1">
                    {item.customizations.size && <div>Size: {item.customizations.size}</div>}
                    {item.customizations.extras && Object.keys(item.customizations.extras).length > 0 && (
                      <div>
                        Extras: {Object.keys(item.customizations.extras)
                          .filter(key => item.customizations.extras[key])
                          .join(', ')}
                      </div>
                    )}
                    {item.customizations.specialInstructions && <div>Note: {item.customizations.specialInstructions}</div>}
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex align-items-center">
                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                      <FaMinus />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      <FaPlus />
                    </Button>
                  </div>

                  <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                    <FaTrash />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Promo Code Section */}
          <div className="mb-3">
            <label className="fw-bold">Promo Code</label>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="me-2"
              />
              <Button variant="outline-primary" onClick={handlePromoCodeApply}>
                Apply
              </Button>
            </div>
            {promoError && <Alert variant="danger" className="mt-2">{promoError}</Alert>}
            {promoSuccess && <Alert variant="success" className="mt-2">{promoSuccess}</Alert>}
          </div>

          <hr />

          {/* Price Summary */}
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {orderType === 'delivery' && (
              <div className="d-flex justify-content-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button variant="primary" className="w-100" onClick={handleCheckout}>
            Checkout
          </Button>
        </>
      )}
    </Card>
  );
};

export default Cart;
