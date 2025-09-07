import { getCartItemCount } from "../state.js";

/**
 * Rendert den Warenkorb-Toggle-Button
 * @returns {string} HTML-String für Cart-Toggle
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
