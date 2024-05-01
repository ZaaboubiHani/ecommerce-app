import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }, []);

  useEffect(() => {
    if (cart) {
      const total = cart.reduce((accumilator, currentItem) => {
        return accumilator + currentItem.price * currentItem.amount;
      }, 0);
      setTotal(total);
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumilator, currentItem) => {
        return accumilator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find(item => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        }
        else {
          return item;
        }
      });
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
    }
    else {
      localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const clearCart = (id) => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  const increaseAmount = (id) => {
    const item = cart.find((item) => item.id === id);
    addToCart(item, id);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }

    if (cartItem.amount < 2) {
      removeFromCart(id);
    }

  };

  return <CartContext.Provider value={{
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    decreaseAmount,
    itemAmount,
    total,
  }}>
    {children}
  </CartContext.Provider>;
};

export default CartProvider;
