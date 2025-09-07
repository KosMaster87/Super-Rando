import {
  getCartItems,
  getCartItemCount,
  getCartTotal,
  isCartVisible,
  isCartEmpty,
} from "../state.js";

/**
 * Rendert die Warenkorb-Komponente
 * @returns {string} HTML-String für Warenkorb
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
 * Erstellt den Warenkorb-Header
 * @returns {string} HTML-String für Cart-Header
 */
const createCartHeader = () => {
  const itemCount = getCartItemCount();
  return `
    <div class="cart-header">
      <h3 class="cart-title">Warenkorb (${itemCount})</h3>
      <button class="cart-close-btn" id="closeCartBtn" title="Warenkorb schließen"><span class="cart-close-icon">❌</span></button>
    </div>
  `;
};

/**
 * Erstellt den Warenkorb-Inhalt
 * @returns {string} HTML-String für Cart-Content
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
 * Erstellt leeren Warenkorb
 * @returns {string} HTML-String für leeren Cart
 */
const createEmptyCart = () => {
  return `
    <div class="cart-empty">
      <p>Ihr Warenkorb ist leer</p>
      <span class="cart-empty-icon">🛒</span>
    </div>
  `;
};

/**
 * Erstellt ein Warenkorb-Item
 * @param {Object} item - Warenkorb-Item
 * @returns {string} HTML-String für Cart-Item
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
 * Erstellt den Warenkorb-Footer
 * @returns {string} HTML-String für Cart-Footer
 */
const createCartFooter = () => {
  const total = getCartTotal();
  const cartItems = getCartItems();
  const hasItems = cartItems.length > 0;

  return `
    <div class="cart-footer">
      <div class="cart-total">
        <strong>Gesamt: ${total.toFixed(2)} €</strong>
      </div>
      <button class="cart-order-btn" id="orderBtn" ${
        !hasItems ? "disabled" : ""
      }>
        Jetzt bestellen
      </button>
    </div>
  `;
};
