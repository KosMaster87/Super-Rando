/**
 * @fileoverview Renders the cart toggle button with item count badge.
 * @description This module exports a function to generate the HTML for the cart toggle button,
 * which displays the number of items in the cart as a badge if there are any items.
 * @module components/cart-toggle
 */

import { getCartItemCount } from "../state.js";

/**
 * Renders the cart toggle button.
 * @returns {string} HTML string for the cart toggle button
 */
export const renderCartToggle = () => {
  const itemCount = getCartItemCount();
  const hasItems = itemCount > 0;

  return `
    <button class="cart-toggle-btn ${
      hasItems ? "has-items" : ""
    }" id="cartToggleBtn">
      <span class="cart-icon">🛒</span>
      ${hasItems ? `<span class="cart-badge">${itemCount}</span>` : ""}
    </button>
  `;
};
