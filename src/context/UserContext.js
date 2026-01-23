'use client';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { popular__product } from '../assets/asset';
const UseContext = createContext(null);
export function UserProvider({ children }) {
  const [popularProductData] = useState(popular__product);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    try {
      const res = await axios.post('/api/cart', {
        productId: product.productId,
        name: product.name,
        price: product.price,
        images: product.images.map((img) => img.src ?? img),
        quantity: 1,
      });

      const serverItem = res.data;
      setCartItems((prev) => {
        const exists = prev.find((item) => item.productId === product.productId);
        if (exists) {
          return prev.map((item) =>
            item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }
        return [...prev, serverItem];
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get('/api/cart');
      setCartItems(res.data);
    };
    fetchCart();
  }, []);
  const removeFromCart = async (id) => {
    try {
      await axios.delete('/api/cart', {
        data: { productId: id },
      });
      setCartItems((prev) => prev.filter((item) => item.productId !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const incrementQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item,
      ),
    );
    axios
      .put(
        '/api/cart',
        {
          productId: productId,
          action: 'increment',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err) => console.log(err));
  };
  const decrementQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max((item.quantity ?? 1) - 1, 1) }
          : item,
      ),
    );
    axios
      .put(
        '/api/cart',
        {
          productId,
          action: 'decrement',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .catch((err) => console.log(err));
  };

  return (
    <UseContext.Provider
      value={{
        popularProductData,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </UseContext.Provider>
  );
}

export const UsersContext = () => {
  return useContext(UseContext);
};
