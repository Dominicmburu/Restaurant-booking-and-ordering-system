import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Nav, Card } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import MenuCategory from './MenuCategory';
import { useOrder } from '../../hooks/useOrder';

const menuData = [
  {
    id: 'starters',
    name: 'Starters',
    items: [
      { id: 1, name: 'Bruschetta', description: 'Toasted bread topped with tomatoes, garlic, and basil', price: 7.99, image: '/api/placeholder/120/80', popular: true },
      { id: 2, name: 'Calamari', description: 'Lightly breaded and fried squid served with marinara sauce', price: 10.99, image: '/api/placeholder/120/80' },
      { id: 3, name: 'Garlic Bread', description: 'Freshly baked bread with garlic butter and herbs', price: 5.99, image: '/api/placeholder/120/80' },
    ]
  },
  {
    id: 'mains',
    name: 'Main Courses',
    items: [
      { id: 4, name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella, and basil', price: 14.99, image: '/api/placeholder/120/80', popular: true },
      { id: 5, name: 'Spaghetti Carbonara', description: 'Spaghetti with a creamy sauce of eggs, cheese, pancetta, and black pepper', price: 13.99, image: '/api/placeholder/120/80' },
      { id: 6, name: 'Grilled Salmon', description: 'Fresh salmon fillet grilled with lemon butter and herbs', price: 19.99, image: '/api/placeholder/120/80', popular: true },
      { id: 7, name: 'Chicken Parmesan', description: 'Breaded chicken breast topped with tomato sauce and melted mozzarella', price: 16.99, image: '/api/placeholder/120/80' },
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      { id: 8, name: 'Tiramisu', description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream', price: 8.99, image: '/api/placeholder/120/80', popular: true },
      { id: 9, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten chocolate center', price: 7.99, image: '/api/placeholder/120/80' },
      { id: 10, name: 'Cheesecake', description: 'Creamy New York style cheesecake with berry compote', price: 8.99, image: '/api/placeholder/120/80' },
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks',
    items: [
      { id: 11, name: 'Soft Drinks', description: 'Coke, Diet Coke, Sprite, Fanta', price: 2.99, image: '/api/placeholder/120/80' },
      { id: 12, name: 'House Wine', description: 'Red, white, or rosé wine by the glass', price: 6.99, image: '/api/placeholder/120/80' },
      { id: 13, name: 'Craft Beer', description: 'Selection of local and imported craft beers', price: 5.99, image: '/api/placeholder/120/80' },
    ]
  }
];

const Menu = ({ orderType }) => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState(menuData);
  const { getMenu } = useOrder();

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchQuery('');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMenu(menuData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = menuData
      .map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.items.length > 0);

    setFilteredMenu(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // Fetch menu items from API if needed
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <Container>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold">Our Menu</h2>
        </Col>
        <Col md="4">
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="me-2"
            />
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
          </Form>
        </Col>
      </Row>

      <Nav variant="tabs" className="mb-4">
        {menuData.map((category) => (
          <Nav.Item key={category.id}>
            <Nav.Link
              active={category.id === activeCategory}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {searchQuery ? (
        filteredMenu.length > 0 ? (
          <>
            <h5 className="mb-3">Search results for "{searchQuery}"</h5>
            {filteredMenu.map((category) => (
              <MenuCategory key={category.id} category={category} orderType={orderType} />
            ))}
          </>
        ) : (
          <p className="py-4 text-center">No menu items found matching "{searchQuery}"</p>
        )
      ) : (
        <MenuCategory category={menuData.find(cat => cat.id === activeCategory)} orderType={orderType} />
      )}
    </Container>
  );
};

export default Menu;
