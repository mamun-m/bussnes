'use client';
import { useState, useEffect } from 'react';
import { UsersContext } from '@/context/UserContext';
import Image from 'next/image';
import './cart.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = UsersContext();
  const router = useRouter();
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const deliveryFee = 50;

  useEffect(() => {
    const sum = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(sum);
  }, [cartItems]);
  useEffect(() => {
    setTotalPrice(subtotal + deliveryFee);
  }, [subtotal]);

  const [form, setForm] = useState({
    Fullname: '',
    phone: '',
    area: '',
    city: '',
  });
  if (!cartItems || cartItems.length === 0) {
    return <h1 style={{ textAlign: 'center', margin: '90px' }}>Your cart is empty ... </h1>;
  }
  const addAddress = (e) => {
    e.preventDefault();
    if (!form.Fullname || !form.phone || !form.area || !form.city) return;
    const newAddress = {
      Fullname: form.Fullname,
      phone: form.phone,
      area: form.area,
      city: form.city,
    };
    setAddresses([...addresses, newAddress]);
    setForm({ Fullname: '', phone: '', area: '', city: '' });
  };
  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert('Select address first');
      return;
    }
    try {
      const res = await axios.post('/api/checkout', {
        fullname: selectedAddress.Fullname,
        phone: selectedAddress.phone,
        area: selectedAddress.area,
        city: selectedAddress.city,
        cart: cartItems,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: totalPrice,
      });
      if (res.status === 201 && res.data.orderId) {
        router.push(`/order-placed`);
      }
    } catch (err) {
      console.error('Checkout error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="cart-container container">
      <div className="cart-left">
        <h1 className="cart-title">Your Cart</h1>
        <div className="cart-table">
          <div className="cart-table-header">
            <div>পণ্য / প্রোডাক্ট</div>
            <div>দাম</div>
            <div>পরিমাণ</div>
            <div>মোট / আংশিক মোট</div>
          </div>
          {cartItems.map((item, index) => (
            <div className="cart-table-row" key={index}>
              <div className="product-info">
                <Image src={item.images?.[0]} width={80} height={0} alt={item.name} />
                <div className="cartTableDesign">
                  <p>{item.name || 'No Name'}</p>
                  <p onClick={() => removeFromCart(item.productId)} className="remove-cart">
                    মুছে ফেলুন
                  </p>
                </div>
              </div>
              <div>৳{(item.price ?? 0).toFixed(2)}</div>
              <div className="quantity-controls">
                <button onClick={() => decrementQuantity(item.productId)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementQuantity(item.productId)}>+</button>
              </div>
              <div>৳{((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Order Summary + Address Form */}
      <div className="cart-right">
        <h2>অর্ডার সংক্ষিপ্ত বিবরণ</h2>

        {/* Add Address Form */}
        <form className="address-form" onSubmit={addAddress}>
          <h3>ঠিকানা যোগ করুন</h3>
          <input
            type="text"
            placeholder="পূর্ণ নাম"
            value={form.Fullname}
            onChange={(e) => setForm({ ...form, Fullname: e.target.value })}
            required
          />
          <input
            type="Number"
            placeholder="ফোন নম্বর"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="শহর"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="এলাকা / রাস্তার ঠিকানা"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          />
          <button type="submit">ঠিকানা সংরক্ষণ করুন</button>
        </form>

        {/* Select Address */}
        {addresses.length > 0 && (
          <div className="address-section">
            <label htmlFor="selectAddress">ঠিকানা নির্বাচন করুন :</label>
            <select
              value={selectedAddress ? addresses.indexOf(selectedAddress) : ''}
              onChange={(e) => {
                const index = e.target.value;
                setSelectedAddress(addresses[index]);
              }}
            >
              <option value="">-- ঠিকানা নির্বাচন করুন --</option>
              {addresses.map((addr, index) => (
                <option key={index} value={index}>
                  {addr.Fullname}, {addr.phone}, {addr.area}, {addr.city}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Summary Card */}
        <div className="summary-card">
          <p>
            মোট ({cartItems.length} টি পণ্য): ৳{subtotal.toFixed(2)}
          </p>
          <p>ডেলিভারি ফি: ৳{deliveryFee.toFixed(2)}</p>
          <p>সর্বমোট মূল্য: ৳{totalPrice.toFixed(2)}</p>
          <button className="checkout-btn" onClick={handleCheckout} disabled={!selectedAddress}>
            চেকআউট করুন
          </button>
        </div>
      </div>
    </div>
  );
}
