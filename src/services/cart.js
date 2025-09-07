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
 * Fügt ein Gericht zum Warenkorb hinzu
 * @param {string} dishName - Name des Gerichts
 * @param {number} price - Preis des Gerichts
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
 * Erhöht die Menge eines Items
 * @param {string} itemName - Name des Items
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
 * Verringert die Menge eines Items
 * @param {string} itemName - Name des Items
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
 * Entfernt ein Item komplett aus dem Warenkorb
 * @param {string} itemName - Name des Items
 */
export const removeFromCart = (itemName) => {
  removeCartItem(itemName);
  saveCartToStorage();
};

/**
 * Togglet die Warenkorb-Sichtbarkeit
 */
export const toggleCartVisibility = () => {
  const currentVisible = isCartVisible();
  setCartVisible(!currentVisible);
  updateCartBodyClass();
};

/**
 * Öffnet den Warenkorb
 */
export const openCart = () => {
  setCartVisible(true);
  updateCartBodyClass();
};

/**
 * Schließt den Warenkorb
 */
export const closeCart = () => {
  setCartVisible(false);
  updateCartBodyClass();
};

/**
 * Leert den kompletten Warenkorb
 */
export const clearCart = () => {
  setCart([]);
  setCartVisible(false);
  updateCartBodyClass();
  saveCartToStorage();
};

/**
 * Aktualisiert die Body-Klasse basierend auf Warenkorb-Status
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
 * Initialisiert den Cart-Status und setzt die Body-Klasse
 */
export const initializeCartStatus = () => {
  updateCartBodyClass();
};
