import React, { useState } from 'react';
import { Search, Calendar, Clock, User, Info, ChevronLeft, ChevronRight, Filter, Edit, X, Check, Download } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';

const BookingsList = () => {
  const [bookings, setBookings] = useState([
    {
      id: 'BKG-2024-001',
      customer: 'John Smith',
      restaurant: 'Italian Bistro',
      date: '2024-03-15',
      time: '19:00',
      guests: 4,
      table: 12,
      status: 'confirmed',
      specialRequests: 'Window seat if possible',
      contact: '+44 7700 900123',
      email: 'john.smith@example.com',
      created: '2024-03-10T14:30:00'
    },
    {
      id: 'BKG-2024-002',
      customer: 'Emma Johnson',
      restaurant: 'Sushiteria',
      date: '2024-03-15',
      time: '20:30',
      guests: 2,
      table: 5,
      status: 'pending',
      specialRequests: 'Anniversary celebration',
      contact: '+44 7700 900456',
      email: 'emma.johnson@example.com',
      created: '2024-03-11T09:15:00'
    },
    {
      id: 'BKG-2024-003',
      customer: 'David Lee',
      restaurant: 'Burger House',
      date: '2024-03-16',
      time: '12:45',
      guests: 6,
      table: 20,
      status: 'confirmed',
      specialRequests: 'High chair needed for child',
      contact: '+44 7700 900789',
      email: 'david.lee@example.com',
      created: '2024-03-12T16:20:00'
    },
    {
      id: 'BKG-2024-004',
      customer: 'Sarah Williams',
      restaurant: 'Italian Bistro',
      date: '2024-03-16',
      time: '18:30',
      guests: 3,
      table: 8,
      status: 'cancelled',
      specialRequests: '',
      contact: '+44 7700 901234',
      email: 'sarah.williams@example.com',
      created: '2024-03-10T10:45:00'
    },
    {
      id: 'BKG-2024-005',
      customer: 'Michael Brown',
      restaurant: 'Pasta Paradise',
      date: '2024-03-17',
      time: '19:15',
      guests: 2,
      table: 4,
      status: 'confirmed',
      specialRequests: 'Gluten-free options required',
      contact: '+44 7700 905678',
      email: 'michael.brown@example.com',
      created: '2024-03-11T12:10:00'
    }
  ]);

  // Sample restaurant tables data
  const restaurantTables = {
    'Italian Bistro': [
      { id: 1, number: 1, capacity: 2, section: 'Window' },
      { id: 2, number: 4, capacity: 2, section: 'Window' },
      { id: 3, number: 8, capacity: 4, section: 'Main' },
      { id: 4, number: 12, capacity: 6, section: 'Main' },
      { id: 5, number: 15, capacity: 2, section: 'Bar' },
    ],
    'Sushiteria': [
      { id: 6, number: 1, capacity: 2, section: 'Window' },
      { id: 7, number: 5, capacity: 2, section: 'Main' },
      { id: 8, number: 8, capacity: 4, section: 'Main' },
      { id: 9, number: 10, capacity: 6, section: 'Private' },
    ],
    'Burger House': [
      { id: 10, number: 1, capacity: 4, section: 'Main' },
      { id: 11, number: 5, capacity: 4, section: 'Main' },
      { id: 12, number: 10, capacity: 4, section: 'Outside' },
      { id: 13, number: 15, capacity: 6, section: 'Main' },
      { id: 14, number: 20, capacity: 8, section: 'Private' },
    ],
    'Pasta Paradise': [
      { id: 15, number: 1, capacity: 2, section: 'Window' },
      { id: 16, number: 4, capacity: 2, section: 'Window' },
      { id: 17, number: 8, capacity: 4, section: 'Main' },
      { id: 18, number: 12, capacity: 6, section: 'Main' },
    ]
  };

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    restaurant: 'all',
    status: 'all'
  });

  // For viewing booking details
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // For editing booking
  const [editMode, setEditMode] = useState(false);
  const [editedBooking, setEditedBooking] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Function to handle viewing booking details
  const handleViewBooking = (bookingId) => {
    const booking = bookings.find(booking => booking.id === bookingId);
    setSelectedBooking(booking);
    setShowDetails(true);
    setEditMode(false);
  };

  // Function to close booking details
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedBooking(null);
    setEditMode(false);
  };

  // Function to enter edit mode
  const handleEditBooking = () => {
    setEditedBooking({...selectedBooking});
    setEditMode(true);
  };

  // Function to save edited booking
  const handleSaveBooking = () => {
    setBookings(bookings.map(booking => 
      booking.id === editedBooking.id ? editedBooking : booking
    ));
    setSelectedBooking(editedBooking);
    setEditMode(false);
  };

  // Function to handle status update
  const handleStatusUpdate = (bookingId, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? {...booking, status: newStatus} : booking
    ));
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({...selectedBooking, status: newStatus});
    }
  };

  // Function to export bookings as CSV
  const handleExportBookings = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting bookings to CSV...');
  };

  // Function to check for booking conflicts
  const getBookingConflicts = (bookingDate, bookingTime, restaurantName, tableNumber, excludeBookingId) => {
    return bookings.filter(booking => 
      booking.id !== excludeBookingId &&
      booking.date === bookingDate &&
      booking.time === bookingTime &&
      booking.restaurant === restaurantName &&
      booking.table === tableNumber &&
      booking.status !== 'cancelled'
    );
  };

  // Filter bookings based on filters
  const filteredBookings = bookings.filter(booking => {
    // Search filter
    const searchLower = filters.search.toLowerCase();
    const matchesSearch = booking.id.toLowerCase().includes(searchLower) ||
                           booking.customer.toLowerCase().includes(searchLower) ||
                           booking.email.toLowerCase().includes(searchLower) ||
                           booking.contact.toLowerCase().includes(searchLower);
    
    // Date filter
    const matchesDate = !filters.date || booking.date === filters.date;
    
    // Restaurant filter
    const matchesRestaurant = filters.restaurant === 'all' || booking.restaurant === filters.restaurant;
    
    // Status filter
    const matchesStatus = filters.status === 'all' || booking.status === filters.status;
    
    return matchesSearch && matchesDate && matchesRestaurant && matchesStatus;
  });

  // Pagination logic
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // Function to get status badge styling
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  // Booking Details Modal Component
  const BookingDetailsModal = () => {
    if (!selectedBooking) return null;

    // Get available tables for the restaurant
    const availableTables = restaurantTables[selectedBooking.restaurant] || [];
    
    // Check for conflicts
    const conflicts = editMode ? 
      getBookingConflicts(
        editedBooking.date, 
        editedBooking.time, 
        editedBooking.restaurant, 
        editedBooking.table, 
        editedBooking.id
      ) : [];
    
    const hasConflict = conflicts.length > 0;
    
    return (
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editMode ? 'Edit Booking' : 'Booking Details'} - {selectedBooking.id}
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleCloseDetails}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {editMode ? (
                // Edit Form
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Customer Name</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={editedBooking.customer}
                        onChange={(e) => setEditedBooking({...editedBooking, customer: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control"
                        value={editedBooking.email}
                        onChange={(e) => setEditedBooking({...editedBooking, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Contact Number</label>
                      <input 
                        type="tel" 
                        className="form-control"
                        value={editedBooking.contact}
                        onChange={(e) => setEditedBooking({...editedBooking, contact: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Number of Guests</label>
                      <input 
                        type="number" 
                        min="1"
                        className="form-control"
                        value={editedBooking.guests}
                        onChange={(e) => setEditedBooking({...editedBooking, guests: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Restaurant</label>
                      <select 
                        className="form-select"
                        value={editedBooking.restaurant}
                        onChange={(e) => setEditedBooking({...editedBooking, restaurant: e.target.value})}
                      >
                        {Object.keys(restaurantTables).map(restaurant => (
                          <option key={restaurant} value={restaurant}>{restaurant}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Date</label>
                      <input 
                        type="date" 
                        className="form-control"
                        value={editedBooking.date}
                        onChange={(e) => setEditedBooking({...editedBooking, date: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Time</label>
                      <input 
                        type="time" 
                        className="form-control"
                        value={editedBooking.time}
                        onChange={(e) => setEditedBooking({...editedBooking, time: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Table Number</label>
                      <select 
                        className="form-select"
                        value={editedBooking.table}
                        onChange={(e) => setEditedBooking({...editedBooking, table: parseInt(e.target.value)})}
                      >
                        {availableTables.map(table => (
                          <option key={table.id} value={table.number}>
                            Table {table.number} ({table.capacity} seats, {table.section})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Special Requests</label>
                      <textarea 
                        className="form-control"
                        rows="3"
                        value={editedBooking.specialRequests}
                        onChange={(e) => setEditedBooking({...editedBooking, specialRequests: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                  
                  {hasConflict && (
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <h5 className="alert-heading">Warning: Booking Conflict Detected</h5>
                        <p className="mb-0">There is already a booking for Table {editedBooking.table} at {editedBooking.time} on {formatDate(editedBooking.date)}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // View Details
                <div className="row g-3">
                  <div className="col-md-6">
                    <h5 className="mb-3">Customer Information</h5>
                    <dl className="row">
                      <dt className="col-sm-4">Name</dt>
                      <dd className="col-sm-8">{selectedBooking.customer}</dd>
                      
                      <dt className="col-sm-4">Email</dt>
                      <dd className="col-sm-8">{selectedBooking.email}</dd>
                      
                      <dt className="col-sm-4">Contact</dt>
                      <dd className="col-sm-8">{selectedBooking.contact}</dd>
                      
                      <dt className="col-sm-4">Status</dt>
                      <dd className="col-sm-8">
                        <span className={`badge ${getStatusBadgeClass(selectedBooking.status)}`}>
                          {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                        </span>
                      </dd>
                    </dl>
                  </div>
                  
                  <div className="col-md-6">
                    <h5 className="mb-3">Booking Details</h5>
                    <dl className="row">
                      <dt className="col-sm-4">Restaurant</dt>
                      <dd className="col-sm-8">{selectedBooking.restaurant}</dd>
                      
                      <dt className="col-sm-4">Date</dt>
                      <dd className="col-sm-8">{formatDate(selectedBooking.date)}</dd>
                      
                      <dt className="col-sm-4">Time</dt>
                      <dd className="col-sm-8">{selectedBooking.time}</dd>
                      
                      <dt className="col-sm-4">Guests</dt>
                      <dd className="col-sm-8">{selectedBooking.guests}</dd>
                      
                      <dt className="col-sm-4">Table</dt>
                      <dd className="col-sm-8">{selectedBooking.table}</dd>
                    </dl>
                  </div>
                  
                  {selectedBooking.specialRequests && (
                    <div className="col-12">
                      <h5 className="mb-3">Special Requests</h5>
                      <div className="p-3 bg-light rounded">{selectedBooking.specialRequests}</div>
                    </div>
                  )}
                  
                  <div className="col-12">
                    <h5 className="mb-3">Booking History</h5>
                    <p><strong>Created:</strong> {new Date(selectedBooking.created).toLocaleString('en-GB')}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {!editMode ? (
                <>
                  {selectedBooking.status !== 'cancelled' && (
                    <>
                      <button 
                        onClick={handleEditBooking}
                        className="btn btn-primary"
                      >
                        <Edit size={16} className="me-1" /> Edit
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(selectedBooking.id, 'cancelled')}
                        className="btn btn-danger"
                      >
                        <X size={16} className="me-1" /> Cancel Booking
                      </button>
                    </>
                  )}
                  <button 
                    onClick={handleCloseDetails}
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setEditMode(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveBooking}
                    disabled={hasConflict}
                    className="btn btn-success"
                  >
                    <Check size={16} className="me-1" /> Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="modal-backdrop show"></div>
      </div>
    );
  };

  return (
    <AdminLayout title="Bookings Management">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Bookings</h1>
          <button 
            onClick={handleExportBookings}
            className="btn btn-primary d-flex align-items-center"
          >
            <Download size={18} className="me-2" />
            Export Bookings
          </button>
        </div>

        {/* Filters and Search */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="form-control"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="row g-2">
                  <div className="col-md-4">
                    <input 
                      type="date" 
                      className="form-control"
                      value={filters.date}
                      onChange={(e) => setFilters({...filters, date: e.target.value})}
                    />
                  </div>
                  
                  <div className="col-md-4">
                    <select 
                      className="form-select"
                      value={filters.restaurant}
                      onChange={(e) => setFilters({...filters, restaurant: e.target.value})}
                    >
                      <option value="all">All Restaurants</option>
                      {Object.keys(restaurantTables).map(restaurant => (
                        <option key={restaurant} value={restaurant}>{restaurant}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-md-4">
                    <select 
                      className="form-select"
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                      <option value="all">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title">All Bookings</h5>
              <div className="text-muted small">
                {filteredBookings.length} bookings found
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Restaurant</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Table</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map(booking => (
                    <tr key={booking.id}>
                      <td className="fw-medium">{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.restaurant}</td>
                      <td>{formatDate(booking.date)}</td>
                      <td>{booking.time}</td>
                      <td>{booking.guests}</td>
                      <td>{booking.table}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            className="btn btn-outline-info"
                            onClick={() => handleViewBooking(booking.id)}
                            title="View Details"
                          >
                            <Info size={16} />
                          </button>
                          
                          {booking.status !== 'cancelled' && (
                            <button 
                              className="btn btn-outline-danger"
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              title="Cancel Booking"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentBookings.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-muted">
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {filteredBookings.length > itemsPerPage && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted small">
                  Showing {indexOfFirstBooking + 1} to {Math.min(indexOfLastBooking, filteredBookings.length)} of {filteredBookings.length} entries
                </div>
                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-sm">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        aria-label="Previous"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    </li>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        aria-label="Next"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
        
        {/* Booking Details Modal */}
        {showDetails && <BookingDetailsModal />}
      </div>
    </AdminLayout>
  );
};

export default BookingsList;