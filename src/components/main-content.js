import { appState } from "../state.js";
import { renderHomePage } from "./pages/home-page.js";
import { renderProductsPage } from "./pages/products-page.js";
import { renderContactPage } from "./pages/contact-page.js";
import { renderImprintPage } from "./pages/imprint-page.js";
import { renderDataProtectionPage } from "./pages/data-protection-page.js";
import { renderCart } from "./cart.js";
import { renderCartToggle } from "./cart-toggle.js";
import { renderNotifications } from "./notification-popup.js";
import { CART_PAGES } from "../utils/constants.js";

/**
 * Rendert den Main-Content basierend auf der aktuellen Seite
 */
export const renderMainContent = () => {
  const mainElement = document.getElementById("mainContent");
  const hasCart = CART_PAGES.includes(appState.currentPage);

  mainElement.innerHTML = hasCart
    ? createLayoutWithCart()
    : createLayoutWithoutCart();
};

/**
 * Erstellt Layout mit Warenkorb (Home/Products)
 * @returns {string} HTML-String für Layout mit Cart
 */
const createLayoutWithCart = () => {
  return `
    <div class="main-content-container">
      ${renderNotifications()}
      <div class="page-layout-with-cart">
        <div class="content-area">
          <div class="content-child">
            ${getCurrentPageHTML()}
          </div>
        </div>
        <div class="cart-area">
          ${renderCartToggle()}
          ${renderCart()}
        </div>
      </div>
    </div>
  `;
};

/**
 * Erstellt Layout ohne Warenkorb
 * @returns {string} HTML-String für Layout ohne Cart
 */
const createLayoutWithoutCart = () => {
  return `
    ${renderNotifications()}
    <div class="page-layout-standard">
      ${getCurrentPageHTML()}
    </div>
  `;
};

/**
 * Gibt das HTML für die aktuelle Seite zurück
 * @returns {string} HTML-String für aktuelle Seite
 */
const getCurrentPageHTML = () => {
  switch (appState.currentPage) {
    case "home":
      return renderHomePage();
    case "products":
      return renderProductsPage();
    case "contact":
      return renderContactPage();
    case "imprint":
      return renderImprintPage();
    case "dataProtection":
      return renderDataProtectionPage();
    default:
      return renderHomePage();
  }
};
