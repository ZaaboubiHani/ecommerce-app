import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart') || '[]')
  )
  const [itemAmount, setItemAmount] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const totalAmount = cart.reduce((accumulator, currentItem) => {
      const price = currentItem.isSale
        ? currentItem.salePrice
        : currentItem.price
      return accumulator + price * currentItem.amount
    }, 0)
    setTotal(totalAmount)
  }, [cart])

  useEffect(() => {
    const totalItems = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount
    }, 0)
    setItemAmount(totalItems)
  }, [cart])

  const addToCart = (product) => {
    const { id, amount, ...other } = product
    const newItem = { ...product, amount: amount || 1 }
    const cartItem = cart.find(
      (item) => item.id === id && item.size === other.size
    )
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id && item.size === other.size) {
          return { ...item, amount: item.amount + 1 }
        } else {
          return item
        }
      })
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    } else {
      const newCart = [...cart, newItem]
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  const removeFromCart = (id, size) => {
    const newCart = cart.filter((item) => item.id !== id || item.size !== size)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const clearCart = () => {
    setCart([])
    localStorage.setItem('cart', JSON.stringify([]))
  }

  const increaseAmount = (id, size) => {
    addToCart({ id, size })
  }

  const decreaseAmount = (id, size) => {
    const cartItem = cart.find((item) => item.id === id && item.size === size)
    if (cartItem && cartItem.amount > 1) {
      const newCart = cart.map((item) => {
        if (item.id === id && item.size === size) {
          return { ...item, amount: item.amount - 1 }
        } else {
          return item
        }
      })
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    } else if (cartItem && cartItem.amount === 1) {
      removeFromCart(id, size)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
