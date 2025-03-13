import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Badge, Form } from 'react-bootstrap';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaArrowRight, FaRegCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const menuData = [
  {
    id: 'starters',
    name: 'Starters',
    items: [
      { id: 1, name: 'Bruschetta', description: 'Toasted bread topped with tomatoes, garlic, and basil', price: 7.99, image: 'https://i.pinimg.com/736x/07/10/55/071055249e27852a2e9341ed25fe239d.jpg', popular: true, dietary: { vegetarian: true }, restaurants: ['Sushiteria', 'Happy Grill'] },
      { id: 2, name: 'Calamari', description: 'Lightly breaded and fried squid served with marinara sauce', price: 10.99, image: 'https://i.pinimg.com/736x/4f/a8/68/4fa868dad5ad208ff417b1441326b267.jpg', restaurants: ['Burger House'] },
      { id: 3, name: 'Garlic Bread', description: 'Freshly baked bread with garlic butter and herbs', price: 5.99, image: 'https://i.pinimg.com/736x/5e/8e/05/5e8e05afc9e1d4e52fe3d569ceb70fc8.jpg', dietary: { vegetarian: true }, restaurants: ['Burger House', 'Sushiteria', 'Happy Grill'] },
    ]
  },
  {
    id: 'mains',
    name: 'Main Courses',
    items: [
      { id: 4, name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella, and basil', price: 14.99, image: 'https://i.pinimg.com/736x/d9/db/94/d9db947145fb931a2bd2b0dc46b59ac0.jpg', popular: true, dietary: { vegetarian: true }, restaurants: ['Burger House', 'Happy Grill'] },
      { id: 5, name: 'Spaghetti Carbonara', description: 'Spaghetti with a creamy sauce of eggs, cheese, pancetta, and black pepper', price: 13.99, image: 'https://i.pinimg.com/736x/04/c5/9b/04c59b016d2d4f28ca431a84a5e4267c.jpg', restaurants: ['Sushiteria'] },
      { id: 6, name: 'Grilled Salmon', description: 'Fresh salmon fillet grilled with lemon butter and herbs', price: 19.99, image: 'https://i.pinimg.com/736x/a8/ac/21/a8ac21fd838e87e55e23589a826ecfff.jpg', popular: true, dietary: { glutenFree: true }, restaurants: ['Sushiteria', 'Happy Grill'] },
      { id: 7, name: 'Chicken Parmesan', description: 'Breaded chicken breast topped with tomato sauce and melted mozzarella', price: 16.99, image: 'https://i.pinimg.com/736x/7e/f6/ce/7ef6ce7f76b4464e69bbaaf11133da85.jpg', restaurants: ['Burger House', 'Happy Grill'] },
      { id: 8, name: 'Vegan Buddha Bowl', description: 'Quinoa, roasted vegetables, avocado and tahini dressing', price: 15.99, image: 'https://i.pinimg.com/736x/e3/8c/c9/e38cc92db6b9cc3a3066b791082428fb.jpg', dietary: { vegetarian: true, vegan: true, glutenFree: true }, restaurants: ['Sushiteria'] },
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      { id: 9, name: 'Tiramisu', description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream', price: 8.99, image: 'https://i.pinimg.com/736x/f1/44/21/f144215b5844b9265879b22952259022.jpg', popular: true, dietary: { vegetarian: true }, restaurants: ['Sushiteria', 'Happy Grill'] },
      { id: 10, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten chocolate center', price: 7.99, image: 'https://i.pinimg.com/736x/d1/a1/20/d1a12099b1fe51d64ddb98ffd6f463ea.jpg', dietary: { vegetarian: true }, restaurants: ['Burger House', 'Happy Grill'] },
      { id: 11, name: 'Cheesecake', description: 'Creamy New York style cheesecake with berry compote', price: 8.99, image: 'https://i.pinimg.com/736x/5e/a0/b3/5ea0b32889b19e444df01a69c5e5a1f2.jpg', dietary: { vegetarian: true }, restaurants: ['Burger House', 'Sushiteria'] },
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks',
    items: [
      { id: 12, name: 'Soft Drinks', description: 'Coke, Diet Coke, Sprite, Fanta', price: 2.99, image: 'https://i.pinimg.com/736x/36/12/6c/36126c495235cbbedfdebee07088058a.jpg', restaurants: ['Burger House', 'Sushiteria', 'Happy Grill'] },
      { id: 13, name: 'House Wine', description: 'Red, white, or rosé wine by the glass', price: 6.99, image: 'https://i.pinimg.com/736x/63/e7/f6/63e7f6ed293c2a98db6dea59cc87b895.jpg', dietary: { vegan: true, glutenFree: true }, restaurants: ['Sushiteria', 'Happy Grill'] },
      { id: 14, name: 'Craft Beer', description: 'Selection of local and imported craft beers', price: 5.99, image: 'https://i.pinimg.com/736x/05/a5/83/05a58391ebbe3d0e33dc4aa282e4f4ca.jpg', restaurants: ['Burger House', 'Sushiteria'] },
      { id: 15, name: 'Fresh Juice', description: 'Orange, apple, or mixed fruit juice', price: 4.99, image: 'https://i.pinimg.com/736x/40/23/39/402339b7da35eb9446b3bfff0bdcc8b8.jpg', dietary: { vegetarian: true, vegan: true, glutenFree: true }, restaurants: ['Burger House', 'Sushiteria', 'Happy Grill'] },
    ]
  }
];

const defaultCartItems = [
  { ...menuData[0].items[0], quantity: 1 },
  { ...menuData[1].items[0], quantity: 2 },
  { ...menuData[2].items[0], quantity: 1 },
  { ...menuData[3].items[0], quantity: 3 },
];

const Cart = ({ items = defaultCartItems, updateQuantity, removeItem, orderType }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(orderType === 'delivery' ? 2.99 : 0);
  const [tip, setTip] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    setDeliveryFee(orderType === 'delivery' ? 2.99 : 0);
  }, [orderType]);
  
  useEffect(() => {
    const newSubtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);
    
    if (tipPercentage > 0) {
      setTip((newSubtotal * tipPercentage / 100).toFixed(2));
    }
  }, [items, tipPercentage]);
  
  const handleTipChange = (percentage) => {
    setTipPercentage(percentage);
    setTip(((subtotal * percentage) / 100).toFixed(2));
  };
  
  const handleCustomTip = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setTip(value.toFixed(2));
    if (subtotal > 0) {
      setTipPercentage((value / subtotal * 100).toFixed(0));
    }
  };
  
  const total = parseFloat(subtotal) + parseFloat(deliveryFee) + parseFloat(tip);
  
  const proceedToCheckout = () => {
    navigate('/checkout', { 
      state: { 
        items, 
        orderSummary: {
          subtotal,
          deliveryFee,
          tip,
          total,
          orderType
        }
      }
    });
  };
  
  if (items.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body className="text-center py-5">
          <div className="empty-cart-icon mb-4">
            <FaShoppingCart size={50} className="text-secondary opacity-50" />
          </div>
          <h4 className="mb-3">Your cart is empty</h4>
          <p className="text-muted mb-4">Add some delicious items from our menu to get started</p>
          <Button 
            variant="outline-warning" 
            className="px-4 py-2" 
            style={{ borderRadius: '30px' }}
            onClick={() => navigate('/menu')}
          >
            Browse Menu
          </Button>
        </Card.Body>
      </Card>
    );
  }
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white border-0 pt-4 pb-3">
        <h3 className="d-flex align-items-center">
          <FaShoppingCart className="me-3 text-warning" />
          Your Order
          <Badge bg="warning" className="ms-2 text-dark">
            {items.reduce((total, item) => total + item.quantity, 0)} items
          </Badge>
        </h3>
      </Card.Header>
      
      <Card.Body className="px-0 py-0">
        <ListGroup variant="flush">
          {items.map((item) => (
            <ListGroup.Item key={item.id} className="px-4 py-3 border-bottom d-flex align-items-center">
              <div className="item-image me-3">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="rounded" 
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                  />
                )}
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="mb-0">{item.name}</h5>
                  <div className="ms-auto text-end">
                    <div className="fw-bold text-dark">£{(item.price * item.quantity).toFixed(2)}</div>
                    <div className="text-muted small">£{item.price.toFixed(2)} each</div>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div>
                    {item.dietary && (
                      <div>
                        {item.dietary.vegetarian && (
                          <Badge bg="success" className="me-1" pill>Vegetarian</Badge>
                        )}
                        {item.dietary.vegan && (
                          <Badge bg="success" className="me-1" pill>Vegan</Badge>
                        )}
                        {item.dietary.glutenFree && (
                          <Badge bg="info" className="me-1" pill>Gluten Free</Badge>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <Button 
                      variant={item.quantity <= 1 ? "outline-secondary" : "outline-warning"}
                      size="sm" 
                      className="d-flex justify-content-center align-items-center"
                      style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus size={12} />
                    </Button>
                    <span className="mx-3 fw-medium">{item.quantity}</span>
                    <Button 
                      variant="outline-warning" 
                      size="sm"
                      className="d-flex justify-content-center align-items-center me-2"
                      style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus size={12} />
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      className="d-flex justify-content-center align-items-center"
                      style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTrash size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <div className="px-4 pt-4">
          <div className="mb-4">
            <h5 className="mb-3">Add a Tip</h5>
            <div className="d-flex gap-2 mb-3">
              {[0, 10, 15, 20].map((percent) => (
                <Button 
                  key={percent} 
                  variant={tipPercentage == percent ? "warning" : "outline-warning"}
                  className="flex-grow-1 py-2"
                  onClick={() => handleTipChange(percent)}
                  style={{ borderRadius: '12px', fontWeight: tipPercentage == percent ? 'bold' : 'normal' }}
                >
                  {percent === 0 ? 'No tip' : `${percent}%`}
                </Button>
              ))}
            </div>
            <div className="d-flex align-items-center">
              <Form.Control
                type="number"
                placeholder="Custom amount"
                value={tip > 0 ? tip : ''}
                onChange={handleCustomTip}
                min="0"
                step="0.01"
                className="me-2"
                style={{ borderRadius: '12px' }}
              />
              <span className="fw-bold">£</span>
            </div>
          </div>
          
          <div className="order-summary bg-light p-3 rounded-3">
            <h5 className="mb-3">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span className="fw-medium">£{subtotal.toFixed(2)}</span>
            </div>
            {orderType === 'delivery' && (
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Fee</span>
                <span className="fw-medium">£{deliveryFee.toFixed(2)}</span>
              </div>
            )}
            {parseFloat(tip) > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <span>Tip</span>
                <span className="fw-medium">£{parseFloat(tip).toFixed(2)}</span>
              </div>
            )}
            <div className="d-flex justify-content-between fw-bold mt-3 pt-3 border-top">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card.Body>
      
      <Card.Footer className="bg-white border-0 p-4">
        <Button 
          variant="warning" 
          className="w-100 py-3 d-flex justify-content-center align-items-center"
          style={{ borderRadius: '15px', fontWeight: 'bold' }}
          onClick={proceedToCheckout}
        >
          <FaRegCreditCard className="me-2" />
          Proceed to Checkout <FaArrowRight className="ms-2" />
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Cart;