'use client';
import Navbar from '@/components/navbar/navbar';
import './global.css';
import Footer from '@/components/Footer/Footer';
import { UserProvider } from '@/context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <UserProvider>
          <Navbar />
          {children}
          <ToastContainer position="top-center" autoClose={3000} />
          <div className="container">
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
