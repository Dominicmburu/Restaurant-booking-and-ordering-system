import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Profile from './pages/profile';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <OrderProvider>
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/restaurant/:id" element={<RestaurantProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </OrderProvider>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
