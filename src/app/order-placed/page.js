'use client';
import React, { useEffect, useState } from 'react';
import './placed.css';

export default function OrderPlaced() {
  const [showCheck, setShowCheck] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowCheck(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="order-placed-container">
      <div className={`checkmark ${showCheck ? 'animate' : ''}`}>✓</div>
      <h1>✅ আপনার অর্ডার কনফার্ম হয়েছে!</h1>
      <p>আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করবো।</p>
      <button onClick={() => (window.location.href = '/')}>Back to Home</button>
    </div>
  );
}
