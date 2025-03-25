import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaStore } from 'react-icons/fa';

const RestaurantSelectionPopup = ({ show, onHide, onSelect, item }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [error, setError] = useState(false);

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

  const handleSubmit = () => {
    if (!selectedLocation) {
      setError(true);
      return;
    }
    
    const location = restaurantLocations.find(loc => loc.name === selectedLocation);
    onSelect(item, location);
    onHide();
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setError(false);
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <FaStore className="me-2 text-warning" />
          Select Restaurant Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please select which TurkNazz location you would like to order from:</p>
        
        {error && (
          <Alert variant="danger" className="mb-3">
            Please select a restaurant location to continue.
          </Alert>
        )}
        
        {item && (
          <div className="selected-item-preview d-flex mb-3 p-2 bg-light rounded">
            {item.image && (
              <img 
                src={item.image} 
                alt={item.name} 
                className="rounded me-3" 
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              />
            )}
            <div>
              <h6 className="mb-1">{item.name}</h6>
              <p className="mb-0 text-muted small">{item.description.substring(0, 80)}...</p>
              <div className="fw-bold mt-1">£{item.price.toFixed(2)}</div>
            </div>
          </div>
        )}
        
        <Form.Group className="mb-3">
          {restaurantLocations.map((location, idx) => (
            <Form.Check
              key={idx}
              type="radio"
              id={`location-${idx}`}
              name="restaurantLocation"
              value={location.name}
              checked={selectedLocation === location.name}
              onChange={handleLocationChange}
              label={
                <div className="d-flex flex-column">
                  <span className="fw-bold">{location.name}</span>
                  <small className="text-muted">
                    <FaMapMarkerAlt className="me-1" />
                    {location.address}
                  </small>
                </div>
              }
              className="mb-3"
            />
          ))}
        </Form.Group>
        
        <p className="text-muted small">
          This selection will be used for your entire order. You can change it before checkout.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="warning" onClick={handleSubmit}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RestaurantSelectionPopup;