import React, { useState } from 'react';
// import { 
//   Search, 
//   Eye, 
//   Truck, 
//   Check, 
//   X, 
//   Clock, 
//   ExclamationCircle, 
//   Calendar3, 
//   Download, 
//   ChevronLeft, 
//   ChevronRight 
// } from 'react-bootstrap-icons';
import { Modal, Button, Form, Table, Badge, Dropdown } from 'react-bootstrap';
import AdminLayout from '../layout/AdminLayout';
import { Download } from 'lucide-react';
import { Search } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Clock } from 'lucide-react';
import { X } from 'lucide-react';

const OrdersList = () => {
  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      customer: 'John Doe',
      restaurant: 'Burger House',
      address: '45 Oxford St, London W1D 2DZ',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 14.99 },
        { name: 'Chocolate Lava Cake', quantity: 2, price: 7.99 },
        { name: 'Soft Drinks', quantity: 4, price: 2.99 }
      ],
      total: 43.96,
      date: '2024-03-14T19:45:00',
      status: 'delivered',
      paymentMethod: 'Credit Card',
      type: 'delivery',
      driver: 'David Williams'
    },
    {
      id: 'ORD-2024-002',
      customer: 'Jane Smith',
      restaurant: 'Burger House',
      address: '22 Baker St, London NW1 5RT',
      items: [
        { name: 'Classic Bacon Hamburger', quantity: 1, price: 11.99 },
        { name: 'Garlic Bread', quantity: 1, price: 5.99 },
        { name: 'House Wine', quantity: 2, price: 6.99 }
      ],
      total: 31.97,
      date: '2024-03-14T18:30:00',
      status: 'preparing',
      paymentMethod: 'Cash',
      type: 'delivery',
      driver: null
    },
    {
      id: 'ORD-2024-003',
      customer: 'Robert Johnson',
      restaurant: 'Sushiteria',
      items: [
        { name: 'Sushi Platter', quantity: 1, price: 24.99 },
        { name: 'Miso Soup', quantity: 2, price: 3.99 },
        { name: 'Green Tea', quantity: 2, price: 2.50 }
      ],
      total: 37.97,
      date: '2024-03-14T17:15:00',
      status: 'in_transit',
      paymentMethod: 'Credit Card',
      type: 'delivery',
      driver: 'Maria Garcia'
    },
    {
      id: 'ORD-2024-004',
      customer: 'Emily Chen',
      restaurant: 'Happy Grill',
      items: [
        { name: 'Grilled Steak', quantity: 2, price: 18.99 },
        { name: 'Fries', quantity: 1, price: 4.99 },
        { name: 'Cola', quantity: 2, price: 2.49 }
      ],
      total: 47.95,
      date: '2024-03-14T16:00:00',
      status: 'ready',
      paymentMethod: 'Credit Card',
      type: 'pickup',
      driver: null
    },
    {
      id: 'ORD-2024-005',
      customer: 'Michael Brown',
      restaurant: 'Pasta Paradise',
      address: '78 Camden High St, London NW1 0LT',
      items: [
        { name: 'Spaghetti Carbonara', quantity: 1, price: 13.99 },
        { name: 'Garlic Bread', quantity: 1, price: 5.99 },
        { name: 'Tiramisu', quantity: 1, price: 8.99 }
      ],
      total: 28.97,
      date: '2024-03-14T12:45:00',
      status: 'cancelled',
      paymentMethod: 'Credit Card',
      type: 'delivery',
      driver: null
    }
  ]);

  // Sample drivers data
  const drivers = [
    { id: 1, name: 'David Williams', status: 'available' },
    { id: 2, name: 'Maria Garcia', status: 'busy' },
    { id: 3, name: 'James Wilson', status: 'available' },
    { id: 4, name: 'Sarah Martinez', status: 'available' }
  ];

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    date: ''
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Order details modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Function to handle order assignment to driver
  const handleAssignDriver = (orderId, driverId) => {
    const driverName = drivers.find(driver => driver.id === driverId)?.name || '';
    
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, driver: driverName, status: 'in_transit'} : order
    ));
  };

  // Function to handle status update
  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));
  };

  // Function to view order details
  const handleViewOrder = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setSelectedOrder(order);
    setShowDetails(true);
  };

  // Function to close order details modal
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  // Function to export orders as CSV
  const handleExportOrders = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting orders to CSV...');
  };

  // Filter orders based on filters
  const filteredOrders = orders.filter(order => {
    // Search filter
    const searchLower = filters.search.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(searchLower) ||
                          order.customer.toLowerCase().includes(searchLower) ||
                          order.restaurant.toLowerCase().includes(searchLower);
    
    // Status filter
    const matchesStatus = filters.status === 'all' || order.status === filters.status;
    
    // Type filter
    const matchesType = filters.type === 'all' || order.type === filters.type;
    
    // Date filter
    const matchesDate = !filters.date || order.date.startsWith(filters.date);
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Get current orders for pagination
  const liveOrders = filteredOrders.filter(order => !['delivered', 'cancelled'].includes(order.status));
  const historyOrders = filteredOrders.filter(order => ['delivered', 'cancelled'].includes(order.status));
  
  // Calculate pagination for live orders
  const indexOfLastLive = currentPage * itemsPerPage;
  const indexOfFirstLive = indexOfLastLive - itemsPerPage;
  const currentLiveOrders = liveOrders.slice(indexOfFirstLive, indexOfLastLive);
  const totalLivePages = Math.ceil(liveOrders.length / itemsPerPage);
  
  // Calculate pagination for history orders
  const indexOfLastHistory = historyPage * itemsPerPage;
  const indexOfFirstHistory = indexOfLastHistory - itemsPerPage;
  const currentHistoryOrders = historyOrders.slice(indexOfFirstHistory, indexOfLastHistory);
  const totalHistoryPages = Math.ceil(historyOrders.length / itemsPerPage);

  // Function to get status badge variant
  const getStatusBadgeVariant = (status) => {
    switch(status) {
      case 'pending':
        return 'primary';
      case 'preparing':
        return 'warning';
      case 'ready':
        return 'info';
      case 'in_transit':
        return 'secondary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // Function to format the status text
  const formatStatus = (status) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-GB', options);
  };

  return (
    <AdminLayout title="Orders Management">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 fw-bold">Orders</h1>
          <Button variant="primary" onClick={handleExportOrders} className="d-flex align-items-center">
            <Download size={18} className="me-2" />
            Export Orders
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6 position-relative">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <Search />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Search orders..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex flex-column flex-md-row gap-2">
                  <Form.Select 
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="flex-grow-1"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Select>
                  
                  <Form.Select 
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="flex-grow-1"
                  >
                    <option value="all">All Types</option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                  </Form.Select>
                  
                  <Form.Control 
                    type="date" 
                    value={filters.date}
                    onChange={(e) => setFilters({...filters, date: e.target.value})}
                    className="flex-grow-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Orders Section */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Live Orders</h5>
            <span className="text-muted small">
              {liveOrders.length} active orders
            </span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Restaurant</th>
                    <th>Time</th>
                    <th>Total</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLiveOrders.map(order => (
                    <tr key={order.id}>
                      <td className="fw-medium">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.restaurant}</td>
                      <td>{formatDate(order.date)}</td>
                      <td>£{order.total.toFixed(2)}</td>
                      <td>
                        <Badge bg={order.type === 'delivery' ? 'primary' : 'success'} text="white">
                          {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={getStatusBadgeVariant(order.status)}>
                          {formatStatus(order.status)}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button 
                            variant="link" 
                            className="p-0 text-primary" 
                            onClick={() => handleViewOrder(order.id)}
                          >
                            <Eye size={18} />
                          </Button>
                          
                          {order.type === 'delivery' && order.status === 'ready' && (
                            <Dropdown>
                              <Dropdown.Toggle variant="link" className="p-0 text-secondary" id={`driver-dropdown-${order.id}`}>
                                <Truck size={18} />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Header>Assign Driver:</Dropdown.Header>
                                {drivers
                                  .filter(driver => driver.status === 'available')
                                  .map(driver => (
                                    <Dropdown.Item 
                                      key={driver.id}
                                      onClick={() => handleAssignDriver(order.id, driver.id)}
                                    >
                                      {driver.name}
                                    </Dropdown.Item>
                                  ))
                                }
                              </Dropdown.Menu>
                            </Dropdown>
                          )}
                          
                          <Dropdown>
                            <Dropdown.Toggle variant="link" className="p-0 text-warning" id={`status-dropdown-${order.id}`}>
                              <Clock size={18} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Header>Update Status:</Dropdown.Header>
                              {['pending', 'preparing', 'ready', 'in_transit', 'delivered', 'cancelled']
                                .filter(status => status !== order.status)
                                .map(status => (
                                  <Dropdown.Item
                                    key={status}
                                    onClick={() => handleStatusUpdate(order.id, status)}
                                  >
                                    {formatStatus(status)}
                                  </Dropdown.Item>
                                ))
                              }
                            </Dropdown.Menu>
                          </Dropdown>
                          
                          <Button 
                            variant="link" 
                            className="p-0 text-danger"
                            onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                          >
                            <X size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentLiveOrders.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        No active orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          
          {/* Pagination for Live Orders */}
          {liveOrders.length > itemsPerPage && (
            <div className="card-footer d-flex justify-content-between align-items-center">
              <div className="small text-muted">
                Showing {indexOfFirstLive + 1} to {Math.min(indexOfLastLive, liveOrders.length)} of {liveOrders.length} entries
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <Button 
                      variant="link" 
                      className="page-link" 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </Button>
                  </li>
                  {Array.from({ length: totalLivePages }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <Button 
                        variant={currentPage === index + 1 ? 'primary' : 'link'} 
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalLivePages ? 'disabled' : ''}`}>
                    <Button 
                      variant="link" 
                      className="page-link"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalLivePages))}
                      disabled={currentPage === totalLivePages}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Order History Section */}
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Order History</h5>
            <span className="text-muted small">
              {historyOrders.length} completed orders
            </span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Restaurant</th>
                    <th>Time</th>
                    <th>Total</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentHistoryOrders.map(order => (
                    <tr key={order.id}>
                      <td className="fw-medium">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.restaurant}</td>
                      <td>{formatDate(order.date)}</td>
                      <td>£{order.total.toFixed(2)}</td>
                      <td>
                        <Badge bg={order.type === 'delivery' ? 'primary' : 'success'} text="white">
                          {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={getStatusBadgeVariant(order.status)}>
                          {formatStatus(order.status)}
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          variant="link" 
                          className="p-0 text-primary"
                          onClick={() => handleViewOrder(order.id)}
                        >
                          <Eye size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {currentHistoryOrders.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        No completed orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          
          {/* Pagination for Order History */}
          {historyOrders.length > itemsPerPage && (
            <div className="card-footer d-flex justify-content-between align-items-center">
              <div className="small text-muted">
                Showing {indexOfFirstHistory + 1} to {Math.min(indexOfLastHistory, historyOrders.length)} of {historyOrders.length} entries
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination mb-0">
                  <li className={`page-item ${historyPage === 1 ? 'disabled' : ''}`}>
                    <Button 
                      variant="link" 
                      className="page-link"
                      onClick={() => setHistoryPage(prev => Math.max(prev - 1, 1))}
                      disabled={historyPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </Button>
                  </li>
                  {Array.from({ length: totalHistoryPages }).map((_, index) => (
                    <li key={index} className={`page-item ${historyPage === index + 1 ? 'active' : ''}`}>
                      <Button 
                        variant={historyPage === index + 1 ? 'primary' : 'link'} 
                        className="page-link"
                        onClick={() => setHistoryPage(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    </li>
                  ))}
                  <li className={`page-item ${historyPage === totalHistoryPages ? 'disabled' : ''}`}>
                    <Button 
                      variant="link" 
                      className="page-link"
                      onClick={() => setHistoryPage(prev => Math.min(prev + 1, totalHistoryPages))}
                      disabled={historyPage === totalHistoryPages}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
        
        {/* Order Details Modal */}
        <Modal show={showDetails} onHide={handleCloseDetails} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Order Details - {selectedOrder?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h5 className="text-secondary mb-3">Customer Information</h5>
                    <p><span className="fw-medium">Name:</span> {selectedOrder.customer}</p>
                    {selectedOrder.address && (
                      <p><span className="fw-medium">Address:</span> {selectedOrder.address}</p>
                    )}
                    <p>
                      <span className="fw-medium">Order Type:</span> 
                      <Badge className="ms-2" bg={selectedOrder.type === 'delivery' ? 'primary' : 'success'}>
                        {selectedOrder.type.charAt(0).toUpperCase() + selectedOrder.type.slice(1)}
                      </Badge>
                    </p>
                    <p><span className="fw-medium">Payment Method:</span> {selectedOrder.paymentMethod}</p>
                  </div>
                  
                  <div className="col-md-6">
                    <h5 className="text-secondary mb-3">Order Information</h5>
                    <p><span className="fw-medium">Restaurant:</span> {selectedOrder.restaurant}</p>
                    <p><span className="fw-medium">Date:</span> {formatDate(selectedOrder.date)}</p>
                    <p>
                      <span className="fw-medium">Status:</span> 
                      <Badge className="ms-2" bg={getStatusBadgeVariant(selectedOrder.status)}>
                        {formatStatus(selectedOrder.status)}
                      </Badge>
                    </p>
                    {selectedOrder.driver && (
                      <p><span className="fw-medium">Driver:</span> {selectedOrder.driver}</p>
                    )}
                  </div>
                </div>

                <h5 className="text-secondary mb-3">Order Items</h5>
                <Table striped bordered>
                  <thead className="table-light">
                    <tr>
                      <th>Item</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">£{item.price.toFixed(2)}</td>
                        <td className="text-end">£{(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <td colSpan="3" className="text-end fw-medium">Total:</td>
                      <td className="text-end fw-bold">£{selectedOrder.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </Table>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {selectedOrder && selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
              <>
                <Button 
                  variant="success"
                  onClick={() => {
                    handleStatusUpdate(selectedOrder.id, 'delivered');
                    handleCloseDetails();
                  }}
                >
                  Mark as Delivered
                </Button>
                <Button 
                  variant="danger"
                  onClick={() => {
                    handleStatusUpdate(selectedOrder.id, 'cancelled');
                    handleCloseDetails();
                  }}
                >
                  Cancel Order
                </Button>
              </>
            )}
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default OrdersList;