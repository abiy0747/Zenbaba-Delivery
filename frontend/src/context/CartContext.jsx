import { createContext, useContext, useEffect, useState } from "react";

import {
  getMyCart,
  addToCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../services/cartService";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  //-----------------------------------
  // Load Cart
  //-----------------------------------

  const loadCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setCartItems([]);
      return;
    }

    try {

      const res = await getMyCart();

      console.log("CART RESPONSE:", res);

      if (res.success) {
        setCartItems(res.data.items || []);
      }

    } catch (error) {

      console.log(
        "LOAD CART ERROR:",
        error.response?.data || error.message
      );

      setCartItems([]);

    }

  };

  //-----------------------------------
  // Load on startup
  //-----------------------------------

  useEffect(() => {

    loadCart();

    const refreshCart = () => {

      loadCart();

    };

    window.addEventListener("login", refreshCart);

    return () => {

      window.removeEventListener("login", refreshCart);

    };

  }, []);

  //-----------------------------------
  // Add Item
  //-----------------------------------

  const addItem = async (menuItemId) => {

    try {

      const res = await addToCart(menuItemId);

      console.log("ADD ITEM:", res);

      await loadCart();

      return true;

    } catch (error) {

      console.log(
        "ADD ERROR:",
        error.response?.data || error.message
      );

      return false;

    }

  };

  //-----------------------------------
  // Increase
  //-----------------------------------

  const increaseQuantity = async (item) => {

    try {

      await updateCart(
        item.menuItem._id,
        item.quantity + 1
      );

      await loadCart();

    } catch (error) {

      console.log(error);

    }

  };

  //-----------------------------------
  // Decrease
  //-----------------------------------

  const decreaseQuantity = async (item) => {

    try {

      if (item.quantity === 1) {

        await removeCartItem(item.menuItem._id);

      } else {

        await updateCart(
          item.menuItem._id,
          item.quantity - 1
        );

      }

      await loadCart();

    } catch (error) {

      console.log(error);

    }

  };

  //-----------------------------------
  // Remove
  //-----------------------------------

  const removeItem = async (item) => {

    try {

      await removeCartItem(item.menuItem._id);

      await loadCart();

    } catch (error) {

      console.log(error);

    }

  };

  //-----------------------------------
  // Clear
  //-----------------------------------

  const clearMyCart = async () => {

    try {

      await clearCart();

      await loadCart();

    } catch (error) {

      console.log(error);

    }

  };

  //-----------------------------------
  // Count
  //-----------------------------------

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  //-----------------------------------
  // Total
  //-----------------------------------

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + ((item.menuItem?.price || 0) * item.quantity),
    0
  );

  return (

    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        totalPrice,

        loadCart,

        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearMyCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}