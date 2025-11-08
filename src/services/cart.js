/**
 * @fileoverview Service for managing the shopping cart.
 * @description This module provides functions to add, remove, and update items in the cart,
 *              as well as to manage the cart's visibility and state.
 * @module services/cart
 */

import {
  saveCartToStorage,
  setCartVisible,
  addCartItem,
  updateCartItem,
  removeCartItem,
  setCart,
  getCartItems,
  isCartVisible,
} from "../state.js";
import { MAX_CART_ITEMS } from "../utils/constants.js";
import { showAddToCartNotification } from "./notification.js";

/**
 * Adds a dish to the cart.
 * If the dish already exists, increases its quantity.
 * @param {string} dishName - Name of the dish
 * @param {number} price - Price of the dish
 */
export const addToCart = (dishName, price) => {
  const cartItems = getCartItems();
  const existingItem = cartItems.find((item) => item.name === dishName);

  if (existingItem) {
    increaseCartItem(dishName);
  } else {
    const newItem = {
      name: dishName,
      price: price,
      quantity: 1,
    };
    addCartItem(newItem);
  }

  showAddToCartNotification(dishName, 1);
  saveCartToStorage();
};

/**
 * Increases the quantity of a cart item by 1, up to the maximum allowed.
 * @param {string} itemName - Name of the item
 */
export const increaseCartItem = (itemName) => {
  const cartItems = getCartItems();
  const item = cartItems.find((item) => item.name === itemName);

  if (item && item.quantity < MAX_CART_ITEMS) {
    updateCartItem(itemName, { quantity: item.quantity + 1 });
    saveCartToStorage();
  }
};

/**
 * Decreases the quantity of a cart item by 1, or removes it if quantity reaches 0.
 * @param {string} itemName - Name of the item
 */
export const decreaseCartItem = (itemName) => {
  const cartItems = getCartItems();
  const item = cartItems.find((item) => item.name === itemName);

  if (item) {
    if (item.quantity > 1) {
      updateCartItem(itemName, { quantity: item.quantity - 1 });
    } else {
      removeFromCart(itemName);
      return;
    }
    saveCartToStorage();
  }
};

/**
 * Removes an item from the cart entirely.
 * @param {string} itemName - Name of the item
 */
export const removeFromCart = (itemName) => {
  removeCartItem(itemName);
  saveCartToStorage();
};

/**
 * Toggles the cart's visibility and updates the body class.
 */
export const toggleCartVisibility = () => {
  const currentVisible = isCartVisible();
  setCartVisible(!currentVisible);
  updateCartBodyClass();
};

/**
 * Opens the cart and updates the body class.
 */
export const openCart = () => {
  setCartVisible(true);
  updateCartBodyClass();
};

/**
 * Closes the cart and updates the body class.
 */
export const closeCart = () => {
  setCartVisible(false);
  updateCartBodyClass();
};

/**
 * Clears all items from the cart, hides the cart, and updates the body class.
 */
export const clearCart = () => {
  setCart([]);
  setCartVisible(false);
  updateCartBodyClass();
  saveCartToStorage();
};

/**
 * Updates the body class based on the cart's visibility.
 */
const updateCartBodyClass = () => {
  const body = document.body;
  if (isCartVisible()) {
    body.classList.add("cart-is-open");
  } else {
    body.classList.remove("cart-is-open");
  }
};

/**
 * Initializes cart status by updating the body class.
 */
export const initializeCartStatus = () => {
  updateCartBodyClass();
};
