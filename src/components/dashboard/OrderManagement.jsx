import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap';
import { useOrder } from '../../hooks/useOrder';

const OrderManagement = () => {
  const { fetchOrders } = useOrder();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  return (
    <Card className="p-3">
      <Card.Title className="mb-3">Order Management</Card.Title>

      {loading ? (
        <div className="text-center py-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <ListGroup>
          {orders.map((order) => (
            <ListGroup.Item key={order.id}>
              <strong>{order.items.length} Items - ${order.total.toFixed(2)}</strong>
              <br />
              <small className="text-muted">Order ID: {order.id}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Card>
  );
};

export default OrderManagement;
