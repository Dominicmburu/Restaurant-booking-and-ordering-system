import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash, Eye, MapPin, MoreVertical, Check, X } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([
    { 
      id: 1, 
      name: 'Burger House', 
      logo: '/images/restaurant-logos/burger-house.png',
      cuisine: 'Fast Food', 
      address: 'Camden, London', 
      commissionRate: 10,
      status: 'active',
      tables: 12,
      rating: 4.5
    },
    { 
      id: 2, 
      name: 'Sushiteria', 
      logo: '/images/restaurant-logos/sushiteria.png',
      cuisine: 'Asian', 
      address: 'Soho, London', 
      commissionRate: 12,
      status: 'active',
      tables: 8,
      rating: 4.8
    },
    { 
      id: 3, 
      name: 'Happy Grill', 
      logo: '/images/restaurant-logos/happy-grill.png',
      cuisine: 'BBQ', 
      address: 'Shoreditch, London', 
      commissionRate: 11,
      status: 'pending',
      tables: 15,
      rating: 4.2
    },
    { 
      id: 4, 
      name: 'Pasta Paradise', 
      logo: '/images/restaurant-logos/pasta-paradise.png',
      cuisine: 'Italian', 
      address: 'Covent Garden, London', 
      commissionRate: 10,
      status: 'inactive',
      tables: 20,
      rating: 4.4
    }
  ]);

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    cuisine: 'all',
    status: 'all'
  });

  // Filter restaurants based on search and filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Search filter
    const matchesSearch = restaurant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(filters.search.toLowerCase()) ||
                          restaurant.address.toLowerCase().includes(filters.search.toLowerCase());
    
    // Cuisine filter
    const matchesCuisine = filters.cuisine === 'all' || restaurant.cuisine === filters.cuisine;
    
    // Status filter
    const matchesStatus = filters.status === 'all' || restaurant.status === filters.status;
    
    return matchesSearch && matchesCuisine && matchesStatus;
  });

  // Function to handle restaurant deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    }
  };

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    setRestaurants(restaurants.map(restaurant => 
      restaurant.id === id ? {...restaurant, status: newStatus} : restaurant
    ));
  };

  // Bootstrap status badge styling
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'active': 
        return 'bg-success';
      case 'pending': 
        return 'bg-primary';
      case 'inactive': 
        return 'bg-danger';
      default: 
        return 'bg-secondary';
    }
  };

  return (
    <AdminLayout title="Restaurants Management">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Restaurants</h1>
          <button className="btn btn-warning text-white">
            Add New Restaurant
          </button>
        </div>

        {/* Filters and Search */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Search restaurants..."
                    className="form-control ps-5"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                  <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                    <Search size={20} />
                  </span>
                </div>
              </div>
              
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={filters.cuisine}
                  onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
                >
                  <option value="all">All Cuisines</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Asian">Asian</option>
                  <option value="BBQ">BBQ</option>
                  <option value="Italian">Italian</option>
                </select>
              </div>
              
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants Table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Restaurant</th>
                    <th>Cuisine</th>
                    <th>Location</th>
                    <th>Commission</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRestaurants.map(restaurant => (
                    <tr key={restaurant.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            className="rounded-circle me-3" 
                            src="/api/placeholder/48/48" 
                            alt={restaurant.name}
                            width="40"
                            height="40"
                          />
                          <div>
                            <div className="fw-medium">{restaurant.name}</div>
                            <small className="text-muted">
                              {restaurant.tables} tables · {restaurant.rating} ★
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          {restaurant.cuisine}
                        </span>
                      </td>
                      <td className="text-muted">
                        <div className="d-flex align-items-center">
                          <MapPin size={16} className="me-1" />
                          {restaurant.address}
                        </div>
                      </td>
                      <td>{restaurant.commissionRate}%</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(restaurant.status)}`}>
                          {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">
                            <Eye size={18} />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary">
                            <Edit size={18} />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(restaurant.id)}
                          >
                            <Trash size={18} />
                          </button>
                          <div className="dropdown">
                            <button 
                              className="btn btn-sm btn-outline-secondary dropdown-toggle"
                              type="button"
                              id={`dropdown-${restaurant.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <MoreVertical size={18} />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby={`dropdown-${restaurant.id}`}>
                              {restaurant.status !== 'active' && (
                                <li>
                                  <button 
                                    onClick={() => handleStatusChange(restaurant.id, 'active')}
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <Check size={16} className="me-2 text-success" />
                                    Activate
                                  </button>
                                </li>
                              )}
                              {restaurant.status !== 'inactive' && (
                                <li>
                                  <button 
                                    onClick={() => handleStatusChange(restaurant.id, 'inactive')}
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <X size={16} className="me-2 text-danger" />
                                    Deactivate
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RestaurantsList;