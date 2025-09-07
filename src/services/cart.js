import { appState, saveCartToStorage, notifyListeners } from "../state.js";
import { MAX_CART_ITEMS } from "../utils/constants.js";
import { showAddToCartNotification } from "./notification.js";

/**
 * Fügt ein Gericht zum Warenkorb hinzu
 * @param {string} dishName - Name des Gerichts
 * @param {number} price - Preis des Gerichts
 */
export const addToCart = (dishName, price) => {
  const existingItem = findCartItem(dishName);

  if (existingItem) {
    increaseQuantity(existingItem);
    showAddToCartNotification(dishName, 1);
  } else {
    addNewCartItem(dishName, price);
    showAddToCartNotification(dishName, 1);
  }

  saveCartToStorage();
  notifyListeners();
};

/**
 * Erhöht die Menge eines Items
 * @param {string} itemName - Name des Items
 */
export const increaseCartItem = (itemName) => {
  const item = findCartItem(itemName);
  if (item && item.quantity < MAX_CART_ITEMS) {
    item.quantity += 1;
    saveCartToStorage();
    notifyListeners();
  }
};

/**
 * Verringert die Menge eines Items
 * @param {string} itemName - Name des Items
 */
export const decreaseCartItem = (itemName) => {
  const item = findCartItem(itemName);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(itemName);
      return;
    }
    saveCartToStorage();
    notifyListeners();
  }
};

/**
 * Entfernt ein Item komplett aus dem Warenkorb
 * @param {string} itemName - Name des Items
 */
export const removeFromCart = (itemName) => {
  appState.cart = appState.cart.filter((item) => item.name !== itemName);
  saveCartToStorage();
  notifyListeners();
};

/**
 * Togglet die Warenkorb-Sichtbarkeit
 */
export const toggleCartVisibility = () => {
  appState.cartVisible = !appState.cartVisible;
  updateCartBodyClass();
  notifyListeners();
};

/**
 * Öffnet den Warenkorb
 */
export const openCart = () => {
  appState.cartVisible = true;
  updateCartBodyClass();
  notifyListeners();
};

/**
 * Schließt den Warenkorb
 */
export const closeCart = () => {
  appState.cartVisible = false;
  updateCartBodyClass();
  notifyListeners();
};

/**
 * Leert den kompletten Warenkorb
 */
export const clearCart = () => {
  appState.cart = [];
  appState.cartVisible = false;
  updateCartBodyClass();
  saveCartToStorage();
  notifyListeners();
};

/**
 * Aktualisiert die Body-Klasse basierend auf Warenkorb-Status
 */
const updateCartBodyClass = () => {
  const body = document.body;
  if (appState.cartVisible) {
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

/**
 * Sucht ein Item im Warenkorb
 * @param {string} dishName - Name des Gerichts
 * @returns {Object|undefined} Gefundenes Item oder undefined
 */
const findCartItem = (dishName) => {
  return appState.cart.find((item) => item.name === dishName);
};

/**
 * Erhöht die Anzahl eines existierenden Items
 * @param {Object} item - Warenkorb-Item
 */
const increaseQuantity = (item) => {
  if (item.quantity < MAX_CART_ITEMS) {
    item.quantity += 1;
  }
};

/**
 * Fügt neues Item zum Warenkorb hinzu
 * @param {string} dishName - Name des Gerichts
 * @param {number} price - Preis des Gerichts
 */
const addNewCartItem = (dishName, price) => {
  const newItem = {
    name: dishName,
    price: price,
    quantity: 1,
  };
  appState.cart.push(newItem);
};
