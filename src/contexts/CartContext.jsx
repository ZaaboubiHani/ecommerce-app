import React, { createContext, useEffect, useState } from 'react';


export const CartContext = createContext()

const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

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

  const addToCart = (product) => {
    const { id, ...other } = product;
    const newItem = { ...product, amount: other.amount };
    const cartItem = cart.find(item => {
      return item.id === id && item.color === other.color && item.size === other.size;
    });
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if (item.id === id && item.color === other.color && item.size === other.size) {
          return { ...item, amount: cartItem.amount + other.amount };
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

  const removeFromCart = (id, color, size) => {
    const newCart = cart.filter(item => {
      return item.id !== id || item.color !== color || item.size !== size;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    
  };

  const increaseAmount = (id, color, size) => {
    const item = cart.find((item) => item.id === id && item.color === color && item.size === size);
    addToCart(item);
  };

  const decreaseAmount = (id, color, size) => {
    const cartItem = cart.find((item) => item.id === id && item.color === color && item.size === size);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
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
