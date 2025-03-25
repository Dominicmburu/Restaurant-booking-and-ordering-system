import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Badge, ListGroup } from 'react-bootstrap';
import { FaSearch, FaStar, FaShoppingCart, FaFilter, FaStore } from 'react-icons/fa';
import RestaurantSelectionPopup from './RestaurantSelectionPopup';

const MenuPage = () => {
  const { locationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantLocation = location.state?.location || null;

  const [activeCategory, setActiveCategory] = useState('kebabs');
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
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(restaurantLocation);
  const [itemToAdd, setItemToAdd] = useState(null);

  const menuData = [
    {
      id: 'kebabs',
      name: 'Kebabs',
      items: [
        { id: 1, name: "Adana Kebab", description: "Juicy minced lamb kebab, grilled to perfection and served with rice and grilled vegetables.", price: 14.99, image: "https://i.pinimg.com/736x/b8/5a/78/b85a78b34d5bf0dd17236240c9f2d387.jpg", popular: true, dietary: {} },
        { id: 2, name: "Chicken Shish Kebab", description: "Succulent marinated chicken cubes grilled on skewers, served with pita bread and a side of salad.", price: 12.49, image: "https://i.pinimg.com/736x/99/9a/da/999adae17a774357f4f762261c4c05a8.jpg", dietary: {} },
        { id: 3, name: "Lamb Doner", description: "Tender lamb cooked on a vertical rotisserie, served in a wrap with salad and sauce.", price: 13.99, image: "https://i.pinimg.com/736x/e2/b3/fd/e2b3fd9dc048e0540fe8ff75ebfcf74a.jpg", popular: true, dietary: {} },
        { id: 4, name: "Chicken Doner", description: "Deliciously seasoned chicken served with pita bread, fresh veggies, and your choice of sauce.", price: 11.99, image: "https://i.pinimg.com/736x/03/48/a6/0348a61190f963687f7d8e9e3a6068e1.jpg", dietary: {} }
      ]
    },
    {
      id: 'pizzas',
      name: 'Turkish Pizzas',
      items: [
        { id: 5, name: "Turkish Lahmacun", description: "A traditional Turkish flatbread with minced lamb, vegetables, and spices, a perfect savory delight.", price: 9.99, image: "https://i.pinimg.com/736x/77/51/c6/7751c6b45b2cce7607fc9c0ec15c2d5a.jpg", popular: true, dietary: {} },
        { id: 6, name: "Turkish Pide", description: "A Turkish-style pizza with a soft, thin crust, topped with your choice of meat, cheese, and vegetables.", price: 14.49, image: "https://i.pinimg.com/736x/c8/65/d0/c865d029b4df63f37b1eaf53b527b864.jpg", popular: true, dietary: {} },
        { id: 7, name: "Cheese Pide", description: "A cheese-filled Turkish pide, served hot and crispy, a perfect choice for cheese lovers.", price: 12.99, image: "https://i.pinimg.com/736x/7c/d8/a7/7cd8a72daffef00a6269a9aae69f8080.jpg", dietary: { vegetarian: true } },
        { id: 8, name: "Su Böreği", description: "A traditional Turkish pastry made with layers of dough, cheese, and herbs, often served as a light meal.", price: 8.99, image: "https://i.pinimg.com/736x/ab/3e/0d/ab3e0d2162fff9ec4212c69e46d5bb2e.jpg", dietary: { vegetarian: true } }
      ]
    },
    {
      id: 'mezes',
      name: 'Mezes',
      items: [
        { id: 9, name: "Hummus", description: "A creamy, flavorful spread made from chickpeas, tahini, garlic, and lemon juice.", price: 5.99, image: "https://i.pinimg.com/736x/b6/07/b8/b607b8e01c40928a4d46e9abff687519.jpg", dietary: { vegetarian: true, vegan: true } },
        { id: 10, name: "Baba Ghanoush", description: "A smoky, tangy dip made from roasted eggplant, tahini, garlic, and olive oil.", price: 6.49, image: "https://i.pinimg.com/736x/e5/68/68/e56868e5e18ec25558e0aba4e8217369.jpg", dietary: { vegetarian: true, vegan: true } },
        { id: 11, name: "Feta Cheese Salad", description: "A fresh and tangy salad made with feta cheese, olives, tomatoes, cucumbers, and a lemony dressing.", price: 7.99, image: "https://i.pinimg.com/736x/14/0f/56/140f5627f12fd4593b64bc419393e029.jpg", dietary: { vegetarian: true } },
        { id: 12, name: "Sigara Böreği", description: "Crispy, fried pastry rolls filled with feta cheese and spinach.", price: 6.99, image: "https://i.pinimg.com/736x/2a/4d/51/2a4d5196d8f4309c20c9f31bb37d6877.jpg", popular: true, dietary: { vegetarian: true } }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      items: [
        { id: 13, name: "Baklava", description: "A sweet and flaky pastry filled with chopped nuts and sweet syrup, a Turkish classic.", price: 4.99, image: "https://i.pinimg.com/736x/18/bb/0b/18bb0bd33415bd27e99a66c9d5cb5e4c.jpg", popular: true, dietary: { vegetarian: true } },
        { id: 14, name: "Künefe", description: "A warm dessert made from shredded filo dough, filled with sweet cheese, and soaked in syrup.", price: 6.49, image: "https://i.pinimg.com/736x/58/d6/43/58d643bf15e8bba67c97041931a1b446.jpg", popular: true, dietary: { vegetarian: true } },
        { id: 15, name: "Rice Pudding", description: "A creamy, comforting dessert made from rice, milk, and sugar, flavored with vanilla and cinnamon.", price: 3.99, image: "https://i.pinimg.com/736x/06/ce/7a/06ce7a8fd84c3f8e0a5ca5f403df5403.jpg", dietary: { vegetarian: true } },
        { id: 16, name: "Turkish Delight", description: "Soft, chewy candy made with sugar, cornstarch, and flavored with rosewater or lemon.", price: 5.49, image: "https://i.pinimg.com/736x/e2/de/46/e2de462ee862d81f7bedf585ff09618e.jpg", dietary: { vegetarian: true, vegan: true } }
      ]
    },
    {
      id: 'drinks',
      name: 'Drinks',
      items: [
        { id: 17, name: "Turkish Tea", description: "Authentic Turkish black tea served in traditional glasses.", price: 2.49, image: "https://i.pinimg.com/736x/36/12/6c/36126c495235cbbedfdebee07088058a.jpg", dietary: { vegetarian: true, vegan: true, glutenFree: true } },
        { id: 18, name: "Turkish Coffee", description: "Rich, strong coffee prepared in the traditional Turkish method.", price: 3.49, image: "https://i.pinimg.com/736x/63/e7/f6/63e7f6ed293c2a98db6dea59cc87b895.jpg", dietary: { vegetarian: true, vegan: true, glutenFree: true } },
        { id: 19, name: "Ayran", description: "Traditional Turkish yogurt drink, refreshing and savory.", price: 2.99, image: "https://i.pinimg.com/736x/05/a5/83/05a58391ebbe3d0e33dc4aa282e4f4ca.jpg", dietary: { vegetarian: true, glutenFree: true } },
        { id: 20, name: "Fresh Juice", description: "Orange, pomegranate, or mixed fruit juice.", price: 4.99, image: "https://i.pinimg.com/736x/40/23/39/402339b7da35eb9446b3bfff0bdcc8b8.jpg", dietary: { vegetarian: true, vegan: true, glutenFree: true } }
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

  const handleAddToCartClick = (item) => {
    if (selectedLocation) {
      // If location is already selected, add directly to cart
      addToCart(item);
    } else {
      // Show popup to select location first
      setItemToAdd(item);
      setShowLocationPopup(true);
    }
  };

  const handleLocationSelect = (item, location) => {
    setSelectedLocation(location);
    addToCart(item);
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
  
  // If location was passed through navigation, set it as selected location
  if (restaurantLocation) {
    setSelectedLocation(restaurantLocation);
  }
}, [restaurantLocation]);

const viewCart = () => {
  navigate('/checkout', {
    state: {
      items: cartItems,
      orderSummary: {
        subtotal: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        deliveryFee: 2.99,
        tip: 0,
        total: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) + 2.99,
        orderType: 'delivery',
        location: selectedLocation
      }
    }
  });
};

return (
  <Container fluid className="py-4 px-md-4" style={{ backgroundColor: '#f8f9fa' }}>
    <Row className="mb-4 align-items-center">
      <Col xs={12} md={6}>
        <h2 className="fw-bold" style={{ color: '#333' }}>
          {selectedLocation ? `${selectedLocation.name} TakeAway Menu` : 'TurkNazz TakeAway Menu'}
        </h2>
        <p className="text-muted">
          {selectedLocation ? selectedLocation.address : 'Please select a restaurant location to order'}
        </p>
        {selectedLocation && (
          <Button
            variant="outline-secondary"
            size="sm"
            className="mt-2"
            onClick={() => {
              setSelectedLocation(null);
              setCartItems([]);
            }}
          >
            <FaStore className="me-1" /> Change Location
          </Button>
        )}
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
                label="Gluten-free"
                checked={dietaryFilters.glutenFree}
                onChange={() => setDietaryFilters({ ...dietaryFilters, glutenFree: !dietaryFilters.glutenFree })}
                className="mb-2"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )}

    {/* Cart Summary */}
    {cartItems.length > 0 && (
      <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#FFF9C4' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5><FaShoppingCart className="me-2" />Your Order</h5>
              <p className="mb-0">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items · 
                £{cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
              </p>
              {selectedLocation && (
                <p className="mb-0 small text-muted">
                  <FaStore className="me-1" /> {selectedLocation.name}
                </p>
              )}
            </div>
            <Button
              variant="warning"
              style={{ borderRadius: '30px' }}
              onClick={viewCart}
            >
              View Order
            </Button>
          </div>
        </Card.Body>
      </Card>
    )}

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
                        {item.dietary && Object.values(item.dietary).some(value => value) && (
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
                        <div className="d-flex justify-content-end">
                          <Button
                            variant="warning"
                            size="sm"
                            className="d-flex align-items-center"
                            style={{ borderRadius: '20px' }}
                            onClick={() => handleAddToCartClick(item)}
                          >
                            <FaShoppingCart className="me-1" /> Add to Order
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
                    {item.dietary && Object.values(item.dietary).some(value => value) && (
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
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="warning"
                        size="sm"
                        className="d-flex align-items-center"
                        style={{ borderRadius: '20px' }}
                        onClick={() => handleAddToCartClick(item)}
                      >
                        <FaShoppingCart className="me-1" /> Add to Order
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    )}

    <RestaurantSelectionPopup
      show={showLocationPopup}
      onHide={() => setShowLocationPopup(false)}
      onSelect={handleLocationSelect}
      item={itemToAdd}
    />
  </Container>
);
};

export default MenuPage;