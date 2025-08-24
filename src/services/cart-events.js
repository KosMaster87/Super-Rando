import {
  toggleCartVisibility,
  closeCart,
  increaseCartItem,
  decreaseCartItem,
  removeFromCart,
} from "./cart.js";

/**
 * Initialisiert alle Warenkorb-Event-Listener
 */
export const initializeCartEvents = () => {
  setupCartToggleButton();
  setupCartCloseButton();
  setupCartItemControls();
};

/**
 * Setzt Event-Listener für Cart-Toggle-Button
 */
const setupCartToggleButton = () => {
  const toggleBtn = document.getElementById("cartToggleBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleCartVisibility);
  }
};

/**
 * Setzt Event-Listener für Cart-Close-Button
 */
const setupCartCloseButton = () => {
  const closeBtn = document.getElementById("closeCartBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeCart);
  }
};

/**
 * Setzt Event-Listener für Cart-Item-Controls
 */
const setupCartItemControls = () => {
  const cartSidebar = document.getElementById("cartSidebar");
  if (cartSidebar) {
    cartSidebar.addEventListener("click", handleCartItemClick);
  }
};

/**
 * Behandelt Klicks auf Cart-Item-Controls
 * @param {Event} event - Click-Event
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
