import React, { useState } from 'react';
import { Search, Plus, Edit, Trash, Eye, ChevronLeft, ChevronRight, Download, Lock, Unlock, Mail, Shield, ShieldAlert, X, Check, UserPlus, User, Users } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';

const UsersManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '+44 7700 900123',
      type: 'customer',
      status: 'active',
      addresses: [
        {
          id: 1,
          name: 'Home',
          street: '45 Oxford St',
          city: 'London',
          postcode: 'W1D 2DZ',
          default: true
        }
      ],
      orderCount: 12,
      lastActive: '2024-03-10T14:30:00',
      created: '2023-06-15T09:00:00'
    },
    {
      id: 2,
      firstName: 'Emma',
      lastName: 'Johnson',
      email: 'emma.johnson@example.com',
      phone: '+44 7700 900456',
      type: 'customer',
      status: 'active',
      addresses: [
        {
          id: 2,
          name: 'Home',
          street: '22 Baker St',
          city: 'London',
          postcode: 'NW1 5RT',
          default: true
        },
        {
          id: 3,
          name: 'Work',
          street: '1 Canada Square',
          city: 'London',
          postcode: 'E14 5AB',
          default: false
        }
      ],
      orderCount: 5,
      lastActive: '2024-03-12T19:15:00',
      created: '2023-09-20T11:30:00'
    },
    {
      id: 3,
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@example.com',
      phone: '+44 7700 900789',
      type: 'staff',
      role: 'driver',
      status: 'active',
      permissions: ['view_orders', 'update_order_status'],
      assignedRestaurants: [],
      lastActive: '2024-03-14T12:45:00',
      created: '2023-08-10T10:15:00'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Martinez',
      email: 'sarah.martinez@example.com',
      phone: '+44 7700 901234',
      type: 'staff',
      role: 'restaurant_manager',
      status: 'active',
      permissions: ['view_orders', 'update_order_status', 'manage_menu', 'manage_staff', 'view_reports'],
      assignedRestaurants: [1],
      lastActive: '2024-03-14T09:20:00',
      created: '2023-05-22T14:00:00'
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@example.com',
      phone: '+44 7700 905678',
      type: 'customer',
      status: 'inactive',
      addresses: [],
      orderCount: 3,
      lastActive: '2024-01-05T17:30:00',
      created: '2023-11-15T08:45:00'
    },
    {
      id: 6,
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james.wilson@example.com',
      phone: '+44 7700 901111',
      type: 'staff',
      role: 'admin',
      status: 'active',
      permissions: ['view_orders', 'update_order_status', 'manage_menu', 'manage_staff', 'manage_restaurants', 'view_reports', 'manage_settings'],
      assignedRestaurants: [],
      lastActive: '2024-03-14T16:30:00',
      created: '2023-04-10T09:00:00'
    }
  ]);

  // Sample restaurants for assignment
  const restaurants = [
    { id: 1, name: 'Italian Bistro' },
    { id: 2, name: 'Sushiteria' },
    { id: 3, name: 'Burger House' },
    { id: 4, name: 'Pasta Paradise' }
  ];

  // Available roles and permissions
  const availableRoles = [
    { id: 'admin', name: 'Admin', description: 'Full system access' },
    { id: 'restaurant_manager', name: 'Restaurant Manager', description: 'Manage assigned restaurants' },
    { id: 'chef', name: 'Chef', description: 'View and update kitchen orders' },
    { id: 'driver', name: 'Delivery Driver', description: 'Manage deliveries' },
    { id: 'staff', name: 'Staff', description: 'Basic staff access' }
  ];

  const availablePermissions = [
    { id: 'view_orders', name: 'View Orders', group: 'Orders' },
    { id: 'update_order_status', name: 'Update Order Status', group: 'Orders' },
    { id: 'manage_menu', name: 'Manage Menu', group: 'Menu' },
    { id: 'manage_staff', name: 'Manage Staff', group: 'Users' },
    { id: 'manage_restaurants', name: 'Manage Restaurants', group: 'Restaurants' },
    { id: 'view_reports', name: 'View Reports', group: 'Reports' },
    { id: 'manage_settings', name: 'Manage Settings', group: 'System' }
  ];

  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
    role: 'all'
  });

  // State for viewing user details
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // State for editing user
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  // State for creating new user
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: 'customer',
    status: 'active',
    role: 'staff',
    permissions: [],
    assignedRestaurants: [],
    addresses: []
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Function to handle viewing user details
  const handleViewUser = (userId) => {
    const user = users.find(user => user.id === userId);
    setSelectedUser(user);
    setShowDetails(true);
    setEditMode(false);
  };

  // Function to close user details
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedUser(null);
    setEditMode(false);
  };

  // Function to enter edit mode
  const handleEditUser = () => {
    setEditedUser({...selectedUser});
    setEditMode(true);
  };

  // Function to save edited user
  const handleSaveUser = () => {
    setUsers(users.map(user => 
      user.id === editedUser.id ? editedUser : user
    ));
    setSelectedUser(editedUser);
    setEditMode(false);
  };

  // Function to update user status
  const handleStatusUpdate = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, status: newStatus} : user
    ));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({...selectedUser, status: newStatus});
    }
  };

  // Function to add new user
  const handleAddUser = () => {
    const newUser = {
      id: Math.max(...users.map(user => user.id)) + 1,
      ...newUserData,
      lastActive: null,
      created: new Date().toISOString(),
      orderCount: 0
    };
    
    setUsers([...users, newUser]);
    setShowNewUserForm(false);
    setNewUserData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      type: 'customer',
      status: 'active',
      role: 'staff',
      permissions: [],
      assignedRestaurants: [],
      addresses: []
    });
  };

  // Function to delete user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
      if (selectedUser && selectedUser.id === userId) {
        handleCloseDetails();
      }
    }
  };

  // Function to export users as CSV
  const handleExportUsers = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting users to CSV...');
  };

  // Function to send password reset
  const handleSendPasswordReset = (userId) => {
    // In a real app, this would trigger a password reset email
    alert(`Password reset email sent to user ID: ${userId}`);
  };

  // Function to handle permission toggle
  const handlePermissionToggle = (permission) => {
    if (editedUser.permissions.includes(permission)) {
      setEditedUser({
        ...editedUser,
        permissions: editedUser.permissions.filter(p => p !== permission)
      });
    } else {
      setEditedUser({
        ...editedUser,
        permissions: [...editedUser.permissions, permission]
      });
    }
  };

  // Function to handle restaurant assignment toggle
  const handleRestaurantToggle = (restaurantId) => {
    if (editedUser.assignedRestaurants.includes(restaurantId)) {
      setEditedUser({
        ...editedUser,
        assignedRestaurants: editedUser.assignedRestaurants.filter(id => id !== restaurantId)
      });
    } else {
      setEditedUser({
        ...editedUser,
        assignedRestaurants: [...editedUser.assignedRestaurants, restaurantId]
      });
    }
  };

  // Filter users based on filters
  const filteredUsers = users.filter(user => {
    // Search filter
    const searchLower = filters.search.toLowerCase();
    const matchesSearch = 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone.toLowerCase().includes(searchLower);
    
    // Type filter
    const matchesType = filters.type === 'all' || user.type === filters.type;
    
    // Status filter
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    
    // Role filter (for staff only)
    const matchesRole = filters.role === 'all' || 
      (user.type === 'staff' && user.role === filters.role);
    
    return matchesSearch && matchesType && matchesStatus && (user.type !== 'staff' || matchesRole);
  });

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-GB', options);
  };

  // Bootstrap badge class helper
  const getBadgeClass = (type) => {
    switch(type) {
      case 'staff':
        return 'bg-primary';
      case 'customer':
        return 'bg-success';
      case 'active':
        return 'bg-success';
      case 'inactive':
        return 'bg-danger';
      case 'admin':
      case 'restaurant_manager':
      case 'chef':
      case 'driver':
      case 'staff':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  // User Details Modal Component
  const UserDetailsModal = () => {
    if (!selectedUser) return null;
    
    return (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editMode ? 'Edit User' : 'User Details'}
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
                <div className="mb-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={editedUser.firstName}
                        onChange={(e) => setEditedUser({...editedUser, firstName: e.target.value})}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={editedUser.lastName}
                        onChange={(e) => setEditedUser({...editedUser, lastName: e.target.value})}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input 
                        type="tel" 
                        className="form-control"
                        value={editedUser.phone}
                        onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">User Type</label>
                      <select 
                        className="form-select"
                        value={editedUser.type}
                        onChange={(e) => setEditedUser({
                          ...editedUser, 
                          type: e.target.value,
                          // Reset staff-specific fields if changing to customer
                          ...(e.target.value === 'customer' ? {
                            role: null,
                            permissions: [],
                            assignedRestaurants: []
                          } : {})
                        })}
                      >
                        <option value="customer">Customer</option>
                        <option value="staff">Staff</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select 
                        className="form-select"
                        value={editedUser.status}
                        onChange={(e) => setEditedUser({...editedUser, status: e.target.value})}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    
                    {editedUser.type === 'staff' && (
                      <div className="col-md-6">
                        <label className="form-label">Role</label>
                        <select 
                          className="form-select"
                          value={editedUser.role}
                          onChange={(e) => setEditedUser({...editedUser, role: e.target.value})}
                        >
                          {availableRoles.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  
                  {editedUser.type === 'staff' && (
                    <>
                      {/* Permissions Selection */}
                      <div className="mt-4">
                        <label className="form-label">Permissions</label>
                        <div className="card">
                          <div className="card-body">
                            <div className="row g-2">
                              {availablePermissions.map(permission => (
                                <div key={permission.id} className="col-md-6">
                                  <div className="form-check">
                                    <input 
                                      type="checkbox"
                                      id={`perm-${permission.id}`}
                                      checked={editedUser.permissions.includes(permission.id)}
                                      onChange={() => handlePermissionToggle(permission.id)}
                                      className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor={`perm-${permission.id}`}>
                                      {permission.name}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Restaurant Assignment */}
                      {(editedUser.role === 'restaurant_manager' || editedUser.role === 'chef') && (
                        <div className="mt-4">
                          <label className="form-label">Assigned Restaurants</label>
                          <div className="card">
                            <div className="card-body">
                              <div className="row g-2">
                                {restaurants.map(restaurant => (
                                  <div key={restaurant.id} className="col-md-6">
                                    <div className="form-check">
                                      <input 
                                        type="checkbox"
                                        id={`rest-${restaurant.id}`}
                                        checked={editedUser.assignedRestaurants.includes(restaurant.id)}
                                        onChange={() => handleRestaurantToggle(restaurant.id)}
                                        className="form-check-input"
                                      />
                                      <label className="form-check-label" htmlFor={`rest-${restaurant.id}`}>
                                        {restaurant.name}
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {editedUser.type === 'customer' && (
                    <div className="mt-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="form-label">Addresses</label>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-link"
                          onClick={() => {
                            const newAddress = {
                              id: Date.now(),
                              name: '',
                              street: '',
                              city: '',
                              postcode: '',
                              default: editedUser.addresses.length === 0
                            };
                            setEditedUser({...editedUser, addresses: [...editedUser.addresses, newAddress]});
                          }}
                        >
                          + Add Address
                        </button>
                      </div>
                      
                      {editedUser.addresses.length > 0 ? (
                        <div className="mt-2">
                          {editedUser.addresses.map((address, index) => (
                            <div key={address.id} className="card mb-3">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                  <h6 className="card-title mb-0">Address {index + 1}</h6>
                                  <button 
                                    type="button" 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                      const updatedAddresses = editedUser.addresses.filter(a => a.id !== address.id);
                                      // If we're removing the default address and there are still addresses left,
                                      // make the first one the default
                                      if (address.default && updatedAddresses.length > 0) {
                                        updatedAddresses[0].default = true;
                                      }
                                      setEditedUser({...editedUser, addresses: updatedAddresses});
                                    }}
                                  >
                                    <Trash size={16} />
                                  </button>
                                </div>
                                
                                <div className="row g-2">
                                  <div className="col-md-6">
                                    <label className="form-label small">Name (e.g. Home, Work)</label>
                                    <input 
                                      type="text" 
                                      className="form-control form-control-sm"
                                      value={address.name}
                                      onChange={(e) => {
                                        const updatedAddresses = editedUser.addresses.map(a => 
                                          a.id === address.id ? {...a, name: e.target.value} : a
                                        );
                                        setEditedUser({...editedUser, addresses: updatedAddresses});
                                      }}
                                    />
                                  </div>
                                  
                                  <div className="col-md-6">
                                    <label className="form-label small">Street</label>
                                    <input 
                                      type="text" 
                                      className="form-control form-control-sm"
                                      value={address.street}
                                      onChange={(e) => {
                                        const updatedAddresses = editedUser.addresses.map(a => 
                                          a.id === address.id ? {...a, street: e.target.value} : a
                                        );
                                        setEditedUser({...editedUser, addresses: updatedAddresses});
                                      }}
                                    />
                                  </div>
                                  
                                  <div className="col-md-6">
                                    <label className="form-label small">City</label>
                                    <input 
                                      type="text" 
                                      className="form-control form-control-sm"
                                      value={address.city}
                                      onChange={(e) => {
                                        const updatedAddresses = editedUser.addresses.map(a => 
                                          a.id === address.id ? {...a, city: e.target.value} : a
                                        );
                                        setEditedUser({...editedUser, addresses: updatedAddresses});
                                      }}
                                    />
                                  </div>
                                  
                                  <div className="col-md-6">
                                    <label className="form-label small">Postcode</label>
                                    <input 
                                      type="text" 
                                      className="form-control form-control-sm"
                                      value={address.postcode}
                                      onChange={(e) => {
                                        const updatedAddresses = editedUser.addresses.map(a => 
                                          a.id === address.id ? {...a, postcode: e.target.value} : a
                                        );
                                        setEditedUser({...editedUser, addresses: updatedAddresses});
                                      }}
                                    />
                                  </div>
                                </div>
                                
                                <div className="form-check mt-2">
                                  <input 
                                    type="checkbox"
                                    id={`default-${address.id}`}
                                    checked={address.default}
                                    onChange={(e) => {
                                      // If checking this as default, uncheck all others
                                      const updatedAddresses = editedUser.addresses.map(a => 
                                        a.id === address.id 
                                          ? {...a, default: e.target.checked} 
                                          : {...a, default: e.target.checked ? false : a.default}
                                      );
                                      setEditedUser({...editedUser, addresses: updatedAddresses});
                                    }}
                                    className="form-check-input"
                                  />
                                  <label className="form-check-label small" htmlFor={`default-${address.id}`}>
                                    Set as default address
                                  </label>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted small">No addresses added yet.</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                // View Details
                <div>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6 className="text-muted mb-3">Personal Information</h6>
                      <dl className="row">
                        <dt className="col-sm-4">Name</dt>
                        <dd className="col-sm-8">{selectedUser.firstName} {selectedUser.lastName}</dd>
                        
                        <dt className="col-sm-4">Email</dt>
                        <dd className="col-sm-8">{selectedUser.email}</dd>
                        
                        <dt className="col-sm-4">Phone</dt>
                        <dd className="col-sm-8">{selectedUser.phone}</dd>
                        
                        <dt className="col-sm-4">Type</dt>
                        <dd className="col-sm-8">
                          <span className={`badge ${getBadgeClass(selectedUser.type)}`}>
                            {selectedUser.type === 'staff' ? 'Staff' : 'Customer'}
                          </span>
                        </dd>
                        
                        {selectedUser.type === 'staff' && (
                          <>
                            <dt className="col-sm-4">Role</dt>
                            <dd className="col-sm-8">
                              <span className="badge bg-info">
                                {availableRoles.find(role => role.id === selectedUser.role)?.name || selectedUser.role}
                              </span>
                            </dd>
                          </>
                        )}
                        
                        <dt className="col-sm-4">Status</dt>
                        <dd className="col-sm-8">
                          <span className={`badge ${getBadgeClass(selectedUser.status)}`}>
                            {selectedUser.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </dd>
                      </dl>
                    </div>
                    
                    <div className="col-md-6">
                      <h6 className="text-muted mb-3">Account Information</h6>
                      <dl className="row">
                        <dt className="col-sm-4">Created</dt>
                        <dd className="col-sm-8">{formatDate(selectedUser.created)}</dd>
                        
                        <dt className="col-sm-4">Last Active</dt>
                        <dd className="col-sm-8">{formatDate(selectedUser.lastActive)}</dd>
                        
                        {selectedUser.type === 'customer' && (
                          <>
                            <dt className="col-sm-4">Orders</dt>
                            <dd className="col-sm-8">{selectedUser.orderCount}</dd>
                          </>
                        )}
                      </dl>
                    </div>
                  </div>
                  
                  {selectedUser.type === 'staff' && selectedUser.permissions.length > 0 && (
                    <div className="mb-4">
                      <h6 className="text-muted mb-3">Permissions</h6>
                      <div>
                        {selectedUser.permissions.map(permissionId => {
                          const permission = availablePermissions.find(p => p.id === permissionId);
                          return permission ? (
                            <span key={permissionId} className="badge bg-light text-dark me-2 mb-2">
                              {permission.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  
                  {selectedUser.type === 'staff' && selectedUser.assignedRestaurants.length > 0 && (
                    <div className="mb-4">
                      <h6 className="text-muted mb-3">Assigned Restaurants</h6>
                      <div>
                        {selectedUser.assignedRestaurants.map(restaurantId => {
                          const restaurant = restaurants.find(r => r.id === restaurantId);
                          return restaurant ? (
                            <span key={restaurantId} className="badge bg-primary me-2 mb-2">
                              {restaurant.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  
                  {selectedUser.type === 'customer' && selectedUser.addresses.length > 0 && (
                    <div>
                      <h6 className="text-muted mb-3">Addresses</h6>
                      <div className="row g-3">
                        {selectedUser.addresses.map(address => (
                          <div key={address.id} className="col-md-6">
                            <div className="card h-100">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                  <h6 className="card-title">{address.name}</h6>
                                  {address.default && (
                                    <span className="badge bg-success">Default</span>
                                  )}
                                </div>
                                <p className="card-text small mb-0">{address.street}</p>
                                <p className="card-text small">{address.city}, {address.postcode}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}



</div>
            <div className="modal-footer">
              {!editMode ? (
                <>
                  <button 
                    onClick={() => handleSendPasswordReset(selectedUser.id)}
                    className="btn btn-secondary"
                  >
                    <Mail size={16} className="me-1" /> Send Password Reset
                  </button>
                  <button 
                    onClick={handleEditUser}
                    className="btn btn-primary"
                  >
                    <Edit size={16} className="me-1" /> Edit
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(selectedUser.id, selectedUser.status === 'active' ? 'inactive' : 'active')}
                    className={`btn ${selectedUser.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                  >
                    {selectedUser.status === 'active' 
                      ? <><Lock size={16} className="me-1" /> Deactivate</>
                      : <><Unlock size={16} className="me-1" /> Activate</>
                    }
                  </button>
                  <button 
                    onClick={handleCloseDetails}
                    className="btn btn-light"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setEditMode(false)}
                    className="btn btn-light"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveUser}
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

  // New User Form Component
  const NewUserForm = () => {
    return (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New User</h5>
              <button 
                type="button" 
                className="btn-close"
                onClick={() => setShowNewUserForm(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={newUserData.firstName}
                      onChange={(e) => setNewUserData({...newUserData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={newUserData.lastName}
                      onChange={(e) => setNewUserData({...newUserData, lastName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input 
                      type="email" 
                      className="form-control"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input 
                      type="tel" 
                      className="form-control"
                      value={newUserData.phone}
                      onChange={(e) => setNewUserData({...newUserData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">User Type *</label>
                    <select 
                      className="form-select"
                      value={newUserData.type}
                      onChange={(e) => setNewUserData({
                        ...newUserData, 
                        type: e.target.value,
                        // Reset staff-specific fields if changing to customer
                        ...(e.target.value === 'customer' ? {
                          role: null,
                          permissions: [],
                          assignedRestaurants: []
                        } : {})
                      })}
                      required
                    >
                      <option value="customer">Customer</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Status *</label>
                    <select 
                      className="form-select"
                      value={newUserData.status}
                      onChange={(e) => setNewUserData({...newUserData, status: e.target.value})}
                      required
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  {newUserData.type === 'staff' && (
                    <div className="col-md-6">
                      <label className="form-label">Role *</label>
                      <select 
                        className="form-select"
                        value={newUserData.role}
                        onChange={(e) => setNewUserData({...newUserData, role: e.target.value})}
                        required
                      >
                        {availableRoles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                
                {newUserData.type === 'staff' && (
                  <>
                    {/* Permissions Selection */}
                    <div className="mt-4">
                      <label className="form-label">Permissions</label>
                      <div className="card">
                        <div className="card-body">
                          <div className="row g-2">
                            {availablePermissions.map(permission => (
                              <div key={permission.id} className="col-md-6">
                                <div className="form-check">
                                  <input 
                                    type="checkbox"
                                    id={`new-perm-${permission.id}`}
                                    checked={newUserData.permissions.includes(permission.id)}
                                    onChange={() => {
                                      if (newUserData.permissions.includes(permission.id)) {
                                        setNewUserData({
                                          ...newUserData,
                                          permissions: newUserData.permissions.filter(p => p !== permission.id)
                                        });
                                      } else {
                                        setNewUserData({
                                          ...newUserData,
                                          permissions: [...newUserData.permissions, permission.id]
                                        });
                                      }
                                    }}
                                    className="form-check-input"
                                  />
                                  <label className="form-check-label" htmlFor={`new-perm-${permission.id}`}>
                                    {permission.name}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {(newUserData.role === 'restaurant_manager' || newUserData.role === 'chef') && (
                      <div className="mt-4">
                        <label className="form-label">Assigned Restaurants</label>
                        <div className="card">
                          <div className="card-body">
                            <div className="row g-2">
                              {restaurants.map(restaurant => (
                                <div key={restaurant.id} className="col-md-6">
                                  <div className="form-check">
                                    <input 
                                      type="checkbox"
                                      id={`new-rest-${restaurant.id}`}
                                      checked={newUserData.assignedRestaurants.includes(restaurant.id)}
                                      onChange={() => {
                                        if (newUserData.assignedRestaurants.includes(restaurant.id)) {
                                          setNewUserData({
                                            ...newUserData,
                                            assignedRestaurants: newUserData.assignedRestaurants.filter(id => id !== restaurant.id)
                                          });
                                        } else {
                                          setNewUserData({
                                            ...newUserData,
                                            assignedRestaurants: [...newUserData.assignedRestaurants, restaurant.id]
                                          });
                                        }
                                      }}
                                      className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor={`new-rest-${restaurant.id}`}>
                                      {restaurant.name}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="alert alert-info d-flex align-items-center">
                <Info size={18} className="me-2 flex-shrink-0" />
                <div>
                  A welcome email with instructions to set a password will be sent to the user when you create their account.
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowNewUserForm(false)}
                className="btn btn-light"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddUser}
                className="btn btn-success"
                disabled={!newUserData.firstName || !newUserData.lastName || !newUserData.email}
              >
                <UserPlus size={16} className="me-1" /> Create User
              </button>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show"></div>
      </div>
    );
  };

  return (
    <AdminLayout title="Users Management">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Users Management</h1>
          <div className="d-flex gap-2">
            <button 
              onClick={handleExportUsers}
              className="btn btn-primary d-flex align-items-center"
            >
              <Download size={18} className="me-2" />
              Export Users
            </button>
            <button 
              onClick={() => setShowNewUserForm(true)}
              className="btn btn-success d-flex align-items-center"
            >
              <UserPlus size={18} className="me-2" />
              Add User
            </button>
          </div>
        </div>

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
                    placeholder="Search users..."
                    className="form-control"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex gap-2">
                  <select 
                    className="form-select"
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <option value="all">All Types</option>
                    <option value="customer">Customers</option>
                    <option value="staff">Staff</option>
                  </select>
                  
                  <select 
                    className="form-select"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  
                  {filters.type === 'staff' && (
                    <select 
                      className="form-select"
                      value={filters.role}
                      onChange={(e) => setFilters({...filters, role: e.target.value})}
                    >
                      <option value="all">All Roles</option>
                      {availableRoles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title">Users</h5>
              <div className="text-muted small">
                {filteredUsers.length} users found
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    {filters.type === 'staff' && <th>Role</th>}
                    {filters.type === 'customer' && <th>Orders</th>}
                    <th>Last Active</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                            {user.type === 'staff' ? <Users size={16} /> : <User size={16} />}
                          </div>
                          <div>
                            <div className="fw-medium">{user.firstName} {user.lastName}</div>
                            <div className="small text-muted">{user.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${getBadgeClass(user.type)}`}>
                          {user.type === 'staff' ? 'Staff' : 'Customer'}
                        </span>
                      </td>
                      {filters.type === 'staff' && (
                        <td>
                          {user.type === 'staff' && (
                            <span className="badge bg-info">
                              {availableRoles.find(role => role.id === user.role)?.name || user.role}
                            </span>
                          )}
                        </td>
                      )}
                      {filters.type === 'customer' && (
                        <td>
                          {user.type === 'customer' ? user.orderCount : '-'}
                        </td>
                      )}
                      <td className="text-muted small">
                        {formatDate(user.lastActive)}
                      </td>
                      <td>
                        <span className={`badge ${getBadgeClass(user.status)}`}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => handleViewUser(user.id)}
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          
                          <button 
                            className={`btn ${user.status === 'active' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => handleStatusUpdate(user.id, user.status === 'active' ? 'inactive' : 'active')}
                            title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {user.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                          </button>
                          
                          <button 
                            className="btn btn-outline-danger"
                            onClick={() => handleDeleteUser(user.id)}
                            title="Delete User"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentUsers.length === 0 && (
                    <tr>
                      <td colSpan={filters.type === 'staff' ? 7 : 7} className="text-center py-3 text-muted">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length > itemsPerPage && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted small">
                  Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries
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
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                      let pageToShow = currentPage;
                      if (totalPages <= 5) {
                        pageToShow = index + 1;
                      } else if (currentPage <= 3) {
                        pageToShow = index + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageToShow = totalPages - 4 + index;
                      } else {
                        pageToShow = currentPage - 2 + index;
                      }
                      
                      return (
                        <li key={pageToShow} className={`page-item ${currentPage === pageToShow ? 'active' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => setCurrentPage(pageToShow)}
                          >
                            {pageToShow}
                          </button>
                        </li>
                      );
                    })}
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
        
        <div className="card mt-4">
          <div className="card-body">
            <div className="d-flex align-items-start mb-3">
              <ShieldAlert size={24} className="text-warning me-3" />
              <h5 className="card-title mb-0">User Security Best Practices</h5>
            </div>
            <ul className="list-group list-group-flush ms-4">
              <li className="list-group-item border-0 ps-0 py-1">Assign permissions based on the principle of least privilege</li>
              <li className="list-group-item border-0 ps-0 py-1">Regularly review staff access and remove unused accounts</li>
              <li className="list-group-item border-0 ps-0 py-1">Deactivate accounts instead of deleting them to preserve order history</li>
              <li className="list-group-item border-0 ps-0 py-1">Ensure restaurant managers only have access to their assigned locations</li>
              <li className="list-group-item border-0 ps-0 py-1">Use unique email addresses for each user account</li>
            </ul>
          </div>
        </div>
        
        {showDetails && <UserDetailsModal />}
        
        {showNewUserForm && <NewUserForm />}
      </div>
    </AdminLayout>
  );
};

export default UsersManagement;