import {
  toggleCartVisibility,
  closeCart,
  increaseCartItem,
  decreaseCartItem,
  removeFromCart,
  clearCart,
} from "./cart.js";

/**
 * Initialisiert alle Warenkorb-Event-Listener
 */
export const initializeCartEvents = () => {
  setupCartToggleButton();
  setupCartCloseButton();
  setupCartItemControls();
  setupCartOrderButton();
};

/**
 * Setzt Event-Listener für Cart-Toggle-Button
 */
const setupCartToggleButton = () => {
  const toggleBtn = document.getElementById("cartToggleBtn");
  if (toggleBtn) {
    toggleBtn.onclick = toggleCartVisibility;
  }
};

/**
 * Setzt Event-Listener für Cart-Close-Button
 */
const setupCartCloseButton = () => {
  const closeBtn = document.getElementById("closeCartBtn");
  if (closeBtn) {
    closeBtn.onclick = closeCart;
  }
};

/**
 * Setzt Event-Listener für Cart-Item-Controls
 */
const setupCartItemControls = () => {
  const cartSidebar = document.getElementById("cartSidebar");
  if (cartSidebar) {
    cartSidebar.onclick = handleCartItemClick;
  }
};

/**
 * Setzt Event-Listener für Bestell-Button
 */
const setupCartOrderButton = () => {
  const orderBtn = document.getElementById("orderBtn");
  if (orderBtn) {
    orderBtn.onclick = handleOrderSubmit;
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

/**
 * Behandelt Bestellungs-Submission
 */
const handleOrderSubmit = () => {
  // Hier könnte später eine echte Bestell-API aufgerufen werden
  import("./notification.js").then(({ showOrderNotification }) => {
    showOrderNotification("Vielen Dank für Ihre Bestellung! 🍽️");
  });

  clearCart();
};
