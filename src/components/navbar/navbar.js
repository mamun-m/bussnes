'use client';
import { useState } from 'react';
import Link from 'next/link';
import './navbar.css';
import { UsersContext } from '@/context/UserContext';
import { logos } from '@/assets/asset';
import Image from 'next/image';
logos;
export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const { cartItems } = UsersContext();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link href="/">
            <Image
              src={logos.logo}
              alt="Website Logo"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </Link>
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/product">Products</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
          <li>
            <Link href="/cart" className="cart">
              Cart 🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
        </ul>
        <div onClick={() => setisOpen(!isOpen)} className={`hamburger ${isOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
