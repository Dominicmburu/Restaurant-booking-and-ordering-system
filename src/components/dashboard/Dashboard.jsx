import React, { useState, useEffect } from 'react';
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, ShoppingBag, Utensils, Calendar, AlertCircle, DollarSign, TrendingUp } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 235,
    totalBookings: 112,
    totalRevenue: 8456.78,
    activeRestaurants: 42
  });

  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4780 },
    { name: 'May', value: 5890 },
    { name: 'Jun', value: 6390 },
    { name: 'Jul', value: 7490 }
  ];

  const orderData = [
    { name: 'Mon', orders: 20 },
    { name: 'Tue', orders: 25 },
    { name: 'Wed', orders: 32 },
    { name: 'Thu', orders: 28 },
    { name: 'Fri', orders: 45 },
    { name: 'Sat', orders: 50 },
    { name: 'Sun', orders: 35 }
  ];

  const notifications = [
    { id: 1, text: 'New restaurant approval request from "Pasta Paradise"', time: '5 minutes ago', type: 'request' },
    { id: 2, text: 'Order #1089 has been cancelled', time: '22 minutes ago', type: 'alert' },
    { id: 3, text: 'Booking conflict detected at "Burger House"', time: '1 hour ago', type: 'alert' },
    { id: 4, text: 'New support ticket from "Happy Grill"', time: '3 hours ago', type: 'support' }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="container-fluid p-4">
        <h1 className="h3 mb-4">Dashboard</h1>

        <div className="row mb-4">
          <div className="col-md-6 col-lg-3 mb-3">
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">Total Orders</p>
                  <h3 className="h4 fw-bold mb-0">{stats.totalOrders}</h3>
                </div>
                <div className="bg-primary bg-opacity-25 rounded-circle p-3">
                  <ShoppingBag color="#0d6efd" size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 mb-3">
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">Total Bookings</p>
                  <h3 className="h4 fw-bold mb-0">{stats.totalBookings}</h3>
                </div>
                <div className="bg-success bg-opacity-25 rounded-circle p-3">
                  <Calendar color="#198754" size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 mb-3">
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">Total Revenue</p>
                  <h3 className="h4 fw-bold mb-0">£{stats.totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="bg-purple bg-opacity-25 rounded-circle p-3" style={{ backgroundColor: 'rgba(111, 66, 193, 0.25)' }}>
                  <DollarSign color="#6f42c1" size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 mb-3">
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">Active Restaurants</p>
                  <h3 className="h4 fw-bold mb-0">{stats.activeRestaurants}</h3>
                </div>
                <div className="bg-warning bg-opacity-25 rounded-circle p-3">
                  <Utensils className="text-warning" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Revenue Trend</h5>
                <div style={{ height: '250px' }}>
                  <Line
                    data={revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#ffc107" activeDot={{ r: 8 }} />
                  </Line>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Orders This Week</h5>
                <div style={{ height: '250px' }}>
                  <Bar
                    data={orderData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#ffc107" />
                  </Bar>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Notifications Row */}
        <div className="row">
          <div className="col-lg-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Quick Actions</h5>
                <div className="d-grid gap-2">
                  <button className="btn d-flex justify-content-between align-items-center" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', color: '#856404' }}>
                    <span>Add New Restaurant</span>
                    <Utensils size={20} />
                  </button>
                  <button className="btn d-flex justify-content-between align-items-center" style={{ backgroundColor: 'rgba(13, 110, 253, 0.1)', color: '#0d6efd' }}>
                    <span>Create Promotion</span>
                    <TrendingUp size={20} />
                  </button>
                  <button className="btn d-flex justify-content-between align-items-center" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}>
                    <span>View Support Tickets</span>
                    <AlertCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Recent Notifications</h5>
                <div>
                  {notifications.map(notification => (
                    <div key={notification.id} className="d-flex align-items-start mb-3 pb-2 border-bottom">
                      <div className={`rounded-circle me-2 p-2 ${notification.type === 'alert' ? 'bg-danger bg-opacity-25' :
                          notification.type === 'request' ? 'bg-primary bg-opacity-25' : 'bg-success bg-opacity-25'
                        }`}>
                        <AlertCircle size={20} color={
                          notification.type === 'alert' ? '#dc3545' :
                            notification.type === 'request' ? '#0d6efd' : '#198754'
                        } />
                      </div>
                      <div>
                        <p className="mb-0 fw-medium">{notification.text}</p>
                        <p className="text-muted small">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-link p-0 text-warning">View All Notifications</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;