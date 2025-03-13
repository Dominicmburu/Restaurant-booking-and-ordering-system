import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Nav, Card, Badge } from 'react-bootstrap';
import { FaSearch, FaStar, FaShoppingCart, FaHeart, FaFilter } from 'react-icons/fa';

const MenuPage = ({ orderType = "delivery" }) => {
  const [activeCategory, setActiveCategory] = useState('starters');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false
  });

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


  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchQuery('');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const applyFilters = (items) => {
    return items.filter(item => {
      if (item.price < priceRange[0] || item.price > priceRange[1]) {
        return false;
      }

      if (dietaryFilters.vegetarian && (!item.dietary || !item.dietary.vegetarian)) {
        return false;
      }
      if (dietaryFilters.vegan && (!item.dietary || !item.dietary.vegan)) {
        return false;
      }
      if (dietaryFilters.glutenFree && (!item.dietary || !item.dietary.glutenFree)) {
        return false;
      }

      return true;
    });
  };

  useEffect(() => {
    if (searchQuery.trim() === '' && !dietaryFilters.vegetarian && !dietaryFilters.vegan && !dietaryFilters.glutenFree && priceRange[0] === 0 && priceRange[1] === 30) {
      setFilteredMenu(menuData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = menuData
      .map(category => ({
        ...category,
        items: applyFilters(category.items.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        ))
      }))
      .filter(category => category.items.length > 0);

    setFilteredMenu(filtered);
  }, [searchQuery, dietaryFilters, priceRange]);

  useEffect(() => {
    setFilteredMenu(menuData);
  }, []);

  return (
    <Container fluid className="py-4 px-md-4" style={{ backgroundColor: '#f8f9fa' }}>
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={6}>
          <h2 className="fw-bold" style={{ color: '#333' }}>Our Menu</h2>
          <p className="text-muted">Discover London's best food options for {orderType}</p>
        </Col>
        <Col xs={12} md={6}>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="me-2"
              style={{ borderRadius: '30px' }}
            />
            <Button
              variant="warning"
              className="me-2"
              style={{ borderRadius: '30px', width: '50px', height: '50px' }}
            >
              <FaSearch />
            </Button>
            <Button
              variant="outline-warning"
              onClick={() => setShowFilters(!showFilters)}
              style={{ borderRadius: '30px', width: '50px', height: '50px' }}
            >
              <FaFilter />
            </Button>
          </div>
        </Col>
      </Row>

      {showFilters && (
        <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h5>Price Range</h5>
                <div className="d-flex align-items-center mb-3">
                  <span>£{priceRange[0]}</span>
                  <Form.Range
                    className="mx-3"
                    min={0}
                    max={30}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    style={{ flex: 1 }}
                  />
                  <span>£{priceRange[1]}</span>
                </div>
              </Col>
              <Col md={6}>
                <h5>Dietary Preferences</h5>
                <Form.Check
                  type="checkbox"
                  label="Vegetarian"
                  checked={dietaryFilters.vegetarian}
                  onChange={() => setDietaryFilters({ ...dietaryFilters, vegetarian: !dietaryFilters.vegetarian })}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Vegan"
                  checked={dietaryFilters.vegan}
                  onChange={() => setDietaryFilters({ ...dietaryFilters, vegan: !dietaryFilters.vegan })}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Gluten Free"
                  checked={dietaryFilters.glutenFree}
                  onChange={() => setDietaryFilters({ ...dietaryFilters, glutenFree: !dietaryFilters.glutenFree })}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Categories Navigation */}
      <div className="menu-categories mb-4 overflow-auto" style={{ whiteSpace: 'nowrap' }}>
        {menuData.map((category) => (
          <Button
            key={category.id}
            variant={category.id === activeCategory ? "warning" : "outline-warning"}
            onClick={() => handleCategoryChange(category.id)}
            className="me-2 mb-2"
            style={{ borderRadius: '30px', padding: '10px 20px' }}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#FFF9C4' }}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5><FaShoppingCart className="me-2" />Your Cart</h5>
                <p className="mb-0">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} items · £{cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</p>
              </div>
              <Button
                variant="warning"
                style={{ borderRadius: '30px' }}
                as={Link}
                to="/cart"
              >
                View Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Search Results or Category Items */}
      {searchQuery ? (
        filteredMenu.length > 0 ? (
          <>
            <h5 className="mb-3">Search results for "{searchQuery}"</h5>
            {filteredMenu.map((category) => (
              <div key={category.id} className="mb-5">
                <h4 className="mb-3">{category.name}</h4>
                <Row xs={1} md={2} lg={3} className="g-4">
                  {category.items.map((item) => (
                    <Col key={item.id}>
                      <Card className="h-100 shadow-sm hover-shadow" style={{ borderRadius: '15px', transition: 'transform 0.3s', cursor: 'pointer' }}>
                        <div style={{ position: 'relative' }}>
                          <Card.Img variant="top" src={item.image} style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', height: '160px', objectFit: 'cover' }} />
                          {item.popular && (
                            <Badge
                              bg="warning"
                              style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                color: '#000',
                                fontWeight: 'bold',
                                borderRadius: '20px',
                                padding: '5px 10px'
                              }}
                            >
                              <FaStar className="me-1" /> Popular
                            </Badge>
                          )}
                        </div>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <Card.Title>{item.name}</Card.Title>
                            <div className="fw-bold">£{item.price.toFixed(2)}</div>
                          </div>
                          <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                            {item.description}
                          </Card.Text>
                          {item.dietary && (
                            <div className="mb-2">
                              {item.dietary.vegetarian && (
                                <Badge bg="success" className="me-1" style={{ borderRadius: '20px' }}>Vegetarian</Badge>
                              )}
                              {item.dietary.vegan && (
                                <Badge bg="success" className="me-1" style={{ borderRadius: '20px' }}>Vegan</Badge>
                              )}
                              {item.dietary.glutenFree && (
                                <Badge bg="info" className="me-1" style={{ borderRadius: '20px' }}>Gluten Free</Badge>
                              )}
                            </div>
                          )}
                        </Card.Body>
                        <Card.Footer className="bg-white border-0" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                          <div className="d-flex justify-content-between">
                            <Button
                              variant="outline-warning"
                              size="sm"
                              className="d-flex align-items-center"
                              style={{ borderRadius: '20px' }}
                            >
                              <FaHeart className="me-1" /> Save
                            </Button>
                            <Button
                              variant="warning"
                              size="sm"
                              className="d-flex align-items-center"
                              style={{ borderRadius: '20px' }}
                              onClick={() => addToCart(item)}
                            >
                              <FaShoppingCart className="me-1" /> Add
                            </Button>
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center my-5">
            <h5>No results found for "{searchQuery}"</h5>
            <p>Try a different search term or browse our categories</p>
          </div>
        )
      ) : (
        <div className="mb-5">
          <h4 className="mb-3">{menuData.find(category => category.id === activeCategory)?.name}</h4>
          <Row xs={1} md={2} lg={3} className="g-4">
            {menuData
              .find(category => category.id === activeCategory)
              ?.items
              .filter(item => applyFilters([item]).length > 0)
              .map((item) => (
                <Col key={item.id}>
                  <Card className="h-100 shadow-sm hover-shadow" style={{ borderRadius: '15px', transition: 'transform 0.3s', cursor: 'pointer' }}>
                    <div style={{ position: 'relative' }}>
                      <Card.Img variant="top" src={item.image} style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', height: '160px', objectFit: 'cover' }} />
                      {item.popular && (
                        <Badge
                          bg="warning"
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            color: '#000',
                            fontWeight: 'bold',
                            borderRadius: '20px',
                            padding: '5px 10px'
                          }}
                        >
                          <FaStar className="me-1" /> Popular
                        </Badge>
                      )}
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title>{item.name}</Card.Title>
                        <div className="fw-bold">£{item.price.toFixed(2)}</div>
                      </div>
                      <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                        {item.description}
                      </Card.Text>

                      <div className="mb-2">
                        {/* <strong>Available at:</strong> */}
                        <div className="mt-1">
                          {item.restaurants.map((restaurant, index) => (
                            <Badge
                              key={index}
                              bg="info"
                              className="me-1"
                              style={{ borderRadius: '15px' }}>
                              {restaurant}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {item.dietary && (
                        <div className="mb-2">
                          {item.dietary.vegetarian && (
                            <Badge bg="success" className="me-1" style={{ borderRadius: '20px' }}>Vegetarian</Badge>
                          )}
                          {item.dietary.vegan && (
                            <Badge bg="success" className="me-1" style={{ borderRadius: '20px' }}>Vegan</Badge>
                          )}
                          {item.dietary.glutenFree && (
                            <Badge bg="info" className="me-1" style={{ borderRadius: '20px' }}>Gluten Free</Badge>
                          )}
                        </div>
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-white border-0" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="d-flex align-items-center"
                          style={{ borderRadius: '20px' }}
                        >
                          <FaHeart className="me-1" /> Save
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          className="d-flex align-items-center"
                          style={{ borderRadius: '20px' }}
                          onClick={() => addToCart(item)}
                        >
                          <FaShoppingCart className="me-1" /> Add
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default MenuPage;