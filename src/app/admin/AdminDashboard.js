'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Admin.css';

export default function AdminDashboard() {
  const [filter, setFilter] = useState('today');
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/checkout');
        setOrders(res.data);
      } catch (err) {
        console.log('Admin fetch error:', err);
      }
    };
    fetchData();
  }, []);
  const DELIVERY_FEE = 50;

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    if (filter === 'today') {
      return orderDate.toDateString() === today.toDateString();
    }
    if (filter === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      return orderDate.toDateString() === yesterday.toDateString();
    }
    return true;
  });

  const calculateSubtotal = (products = []) => {
    return products.reduce((sum, product) => sum + product.quantity * product.price, 0);
  };

  const HandleDeleteAdminButton = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setOrders((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container" style={{ padding: 20 }}>
      <h1>📊 Admin Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setFilter('today')}>Today</button>
        <button onClick={() => setFilter('yesterday')}>Yesterday</button>
        <button onClick={() => setFilter('all')}>All Orders</button>
      </div>

      <div className="AdminPanel">
        {filteredOrders.map((user) => {
          const subtotal = calculateSubtotal(user.products || []);
          const totalPrice = subtotal + DELIVERY_FEE;

          return (
            <div key={user._id} className="order-box">
              <div className=" adminDashboardContainer">
                <div>
                  <h3>Customer Info</h3>
                  <p>
                    Order Time:{' '}
                    {new Date(user.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })}
                  </p>
                  <p>Name: {user.fullname}</p>
                  <p>Phone: {user.phone}</p>
                  <p>City: {user.city}</p>
                  <p>Area: {user.area}</p>
                </div>

                <div>
                  <h3>Products</h3>

                  {user.products && user.products.length > 0 ? (
                    user.products.map((product, index) => (
                      <div key={index} className="cardProdcutDetailscontainer">
                        <p>Product: {product.name}</p>

                        <div className="cardProdcutDetails">
                          <p>Quantity: {product.quantity}</p>
                          <p>Price: {product.price}</p>
                          <p>Sub-total: {product.subtotal}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No products for this order</p>
                  )}
                </div>

                <div>
                  <h3>Order Summary</h3>
                  <p>Subtotal: ৳ {subtotal}</p>
                  <p>Delivery Fee: ৳ {DELIVERY_FEE}</p>
                  <p>
                    <strong>Total Price: ৳ {totalPrice}</strong>
                  </p>
                </div>

                <div>
                  <button onClick={() => HandleDeleteAdminButton(user._id)}>
                    Deleted Address ...
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="LoginButtonAdmin"
        onClick={() => {
          document.cookie = 'adminToken=; Max-Age=0; path=/';
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </div>
  );
}
