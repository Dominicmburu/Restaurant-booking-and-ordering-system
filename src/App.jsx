import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { OrderProvider } from './contexts/OrderContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Menu from './components/ordering/Menu';
import BookingPage from './components/booking/BookingPage';
import Dashboard from './components/dashboard/Dashboard';

import About from './pages/About';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';

import RestaurantProfile from './components/dashboard/RestaurantProfile';
import OrderPage from './components/ordering/OrderPage';

import Checkout from './components/ordering/Checkout';
import OrderConfirmation from './components/ordering/OrderConfirmation';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Cart from './components/ordering/Cart';
import Profile from './pages/Profile';
import RestaurantProf from './components/dashboard/RestaurantProf';
import OrdersList from './components/dashboard/OrdersList';
import RestaurantsList from './components/dashboard/RestaurantsList';
import MenuEditor from './components/dashboard/MenuEditor';
import BookingsList from './components/dashboard/BookingsList';
import DeliveryManagement from './components/dashboard/DeliveryManagement';
import UsersManagement from './components/dashboard/UsersManagement';
import AdminProfile from './components/dashboard/AdminProfile';
import AdminSettings from './components/dashboard/AdminSettings';
import AdminNotifications from './components/dashboard/AdminNotifications';
import AdminLayout from './components/layout/AdminLayout';


const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <OrderProvider>
          <Router>
            <main>
              <Routes>

                {/* user */}
                <Route path="/" element={<AppLayout><Home /></AppLayout>} />
                <Route path="/menu" element={<AppLayout><Menu /></AppLayout>} />
                <Route path="/booking" element={<AppLayout><BookingPage /></AppLayout>} />
                <Route path="/order" element={<AppLayout><OrderPage /></AppLayout>} />
                <Route path="/cart" element={<AppLayout><Cart /></AppLayout>} />
                <Route path="/checkout" element={<AppLayout><Checkout /></AppLayout>} />
                <Route path="/order-confirmation" element={<AppLayout><OrderConfirmation /></AppLayout>} />
                <Route path="/about" element={<AppLayout><About /></AppLayout>} />
                <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
                <Route path="/reviews" element={<AppLayout><Reviews /></AppLayout>} />
                <Route path="/restaurant/:id" element={<AppLayout><RestaurantProfile /></AppLayout>} />
                <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
                <Route path="/register" element={<AppLayout><Register /></AppLayout>} />
                <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />

                {/* // admin */}
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/restaurants" element={<RestaurantProf />} />
                <Route path="/admin/restaurants/list" element={<RestaurantsList />} />
                <Route path="/admin/menu" element={<MenuEditor />} />
                <Route path="/admin/orders" element={<OrdersList />} />
                <Route path="/admin/bookings" element={<BookingsList />} />
                <Route path="/admin/delivery" element={<DeliveryManagement />} />
                <Route path="/admin/users" element={<UsersManagement />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/notifications" element={<AdminNotifications />} />

              </Routes>
            </main>
          </Router>
        </OrderProvider>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
