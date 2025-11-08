/**
 * @fileoverview Renders the cart component and its elements.
 * @description This module provides functions to render the cart sidebar,
 * including the header, content, and footer. It dynamically updates the cart
 * based on the current state.
 * @module components/cart
 */

import {
  getCartItems,
  getCartItemCount,
  getCartTotal,
  isCartVisible,
  isCartEmpty,
} from "../state.js";

/**
 * Renders the cart component.
 * @returns {string} HTML string for the cart
 */
export const renderCart = () => {
  return `
    <aside class="cart-sidebar ${
      isCartVisible() ? "cart-open" : ""
    }" id="cartSidebar">
      <div class="cart-container">
        ${createCartHeader()}
        ${createCartContent()}
        ${createCartFooter()}
      </div>
    </aside>
  `;
};

/**
 * Creates the cart header.
 * @returns {string} HTML string for the cart header
 */
const createCartHeader = () => {
  const itemCount = getCartItemCount();
  return `
    <div class="cart-header">
      <h3 class="cart-title">Cart (${itemCount})</h3>
      <button class="cart-close-btn" id="closeCartBtn" title="Close cart"><span class="cart-close-icon">❌</span></button>
    </div>
  `;
};

/**
 * Creates the cart content.
 * @returns {string} HTML string for the cart content
 */
const createCartContent = () => {
  if (isCartEmpty()) {
    return createEmptyCart();
  }

  const cartItems = getCartItems();
  return `
    <div class="cart-items">
      ${cartItems.map((item) => createCartItem(item)).join("")}
    </div>
  `;
};

/**
 * Creates the empty cart message.
 * @returns {string} HTML string for an empty cart
 */
const createEmptyCart = () => {
  return `
    <div class="cart-empty">
      <p>Your cart is empty</p>
      <span class="cart-empty-icon">🛒</span>
    </div>
  `;
};

/**
 * Creates a cart item entry.
 * @param {Object} item - Cart item object
 * @returns {string} HTML string for a cart item
 */
const createCartItem = (item) => {
  const total = (item.price * item.quantity).toFixed(2);
  return `
    <div class="cart-item" data-item-name="${item.name}">
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.name}</h4>
        <p class="cart-item-price">${item.price.toFixed(2)} €</p>
      </div>
      <div class="cart-item-controls">
        <button class="quantity-btn minus-btn" data-action="decrease" data-item="${
          item.name
        }">−</button>
        <span class="quantity-display">${item.quantity}</span>
        <button class="quantity-btn plus-btn" data-action="increase" data-item="${
          item.name
        }">+</button>
      </div>
      <div class="cart-item-total">${total} €</div>
      <button class="remove-item-btn" data-action="remove" data-item="${
        item.name
      }">🗑️</button>
    </div>
  `;
};

/**
 * Creates the cart footer.
 * @returns {string} HTML string for the cart footer
 */
const createCartFooter = () => {
  const total = getCartTotal();
  const cartItems = getCartItems();
  const hasItems = cartItems.length > 0;

  return `
    <div class="cart-footer">
      <div class="cart-total">
        <strong>Total: ${total.toFixed(2)} €</strong>
      </div>
      <button class="cart-order-btn" id="orderBtn" ${
        !hasItems ? "disabled" : ""
      }>
        Order now
      </button>
    </div>
  `;
};
