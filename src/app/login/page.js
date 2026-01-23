'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './login.css';
export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const adminPassword = 'admin123@';
    if (password === adminPassword) {
      document.cookie = 'adminToken=secret123; path=/';
      router.push('/admin');
    } else {
      alert('Password wrong ...!');
    }
  };
  return (
    <div className="LoginContainer">
      <h1>Admin Login</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your Password"
      />
      <button onClick={handleLogin} style={{ marginLeft: '10px' }}>
        Login
      </button>
    </div>
  );
}
