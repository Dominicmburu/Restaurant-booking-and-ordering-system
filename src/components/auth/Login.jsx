import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
      }}
    >
      <Card className="p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}>
        <h3 className="text-center fw-bold mb-3 text-primary">Welcome Back</h3>
        <p className="text-center text-muted">Sign in to continue</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="py-2"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="py-2"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 py-2 fw-bold"
            style={{ borderRadius: '8px', transition: '0.3s' }}
          >
            Login
          </Button>
        </Form>

        <p className="text-center text-muted mt-3">
          Don't have an account? <a href="/register" className="text-decoration-none fw-semibold">Sign Up</a>
        </p>
      </Card>
    </div>
  );
};

export default Login;
