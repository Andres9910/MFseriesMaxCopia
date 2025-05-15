import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [purchaseHistory, setPurchaseHistory] = useState(() => {
    const savedHistory = localStorage.getItem('purchaseHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance ? parseFloat(savedBalance) : 0;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id_producto === product.id_producto);
      if (existingItem) {
        return prevItems.map(item =>
          item.id_producto === product.id_producto ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: product.quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id_producto !== productId));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio_producto * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const completePurchase = () => {
    const total = getTotal();
    if (balance >= total) {
      const newHistory = cartItems.map(item => ({
        ...item,
        date: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
      }));
      setPurchaseHistory((prevHistory) => [...prevHistory, ...newHistory]);
      setCartItems([]); // Vaciar el carrito después de la compra
      setBalance(balance - total); // Restar el total del saldo
    } else {
      alert('Saldo insuficiente para completar la compra');
    }
  };

  const addBalance = (amount) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotal, getCartCount, completePurchase, purchaseHistory, balance, addBalance }}>
      {children}
    </CartContext.Provider>
  );
};