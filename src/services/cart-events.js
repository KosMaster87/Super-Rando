/**
 * @fileoverview Manages event listeners related to the shopping cart functionality.
 * @description This module sets up event listeners for toggling the cart visibility,
 * closing the cart, handling item quantity adjustments, removing items, and submitting orders.
 * @module services/cart-events
 */

import {
  toggleCartVisibility,
  closeCart,
  increaseCartItem,
  decreaseCartItem,
  removeFromCart,
  clearCart,
} from "./cart.js";

/**
 * Initializes all cart event listeners for toggle, close, item controls, and order submission.
 */
export const initializeCartEvents = () => {
  setupCartToggleButton();
  setupCartCloseButton();
  setupCartItemControls();
  setupCartOrderButton();
};

/**
 * Sets up the event listener for the cart toggle button.
 */
const setupCartToggleButton = () => {
  const toggleBtn = document.getElementById("cartToggleBtn");
  if (toggleBtn) {
    toggleBtn.onclick = toggleCartVisibility;
  }
};

/**
 * Sets up the event listener for the cart close button.
 */
const setupCartCloseButton = () => {
  const closeBtn = document.getElementById("closeCartBtn");
  if (closeBtn) {
    closeBtn.onclick = closeCart;
  }
};

/**
 * Sets up the event listener for cart item controls, such as increase, decrease, or remove.
 */
const setupCartItemControls = () => {
  const cartSidebar = document.getElementById("cartSidebar");
  if (cartSidebar) {
    cartSidebar.onclick = handleCartItemClick;
  }
};

/**
 * Sets up the event listener for the cart order button.
 */
const setupCartOrderButton = () => {
  const orderBtn = document.getElementById("orderBtn");
  if (orderBtn) {
    orderBtn.onclick = handleOrderSubmit;
  }
};

/**
 * Handles clicks on cart item controls to increase, decrease, or remove items.
 * @param {Event} event - Click event
 */
const handleCartItemClick = (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  const itemName = button.dataset.item;

  switch (action) {
    case "increase":
      increaseCartItem(itemName);
      break;
    case "decrease":
      decreaseCartItem(itemName);
      break;
    case "remove":
      removeFromCart(itemName);
      break;
  }
};

/**
 * Handles order submission, shows notification and clears the cart.
 */
const handleOrderSubmit = () => {
  // A real ordering API could be called here later.
  import("./notification.js").then(({ showOrderNotification }) => {
    showOrderNotification("Thank you for your order! 🍽️");
  });

  clearCart();
};
