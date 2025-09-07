import { getCurrentPage } from "../state.js";
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
 * Renders the main content based on the current page.
 */
export const renderMainContent = () => {
  const mainElement = document.getElementById("mainContent");
  const currentPage = getCurrentPage();
  const hasCart = CART_PAGES.includes(currentPage);

  mainElement.innerHTML = hasCart
    ? createLayoutWithCart()
    : createLayoutWithoutCart();
};

/**
 * Creates the layout with the cart section (Home/Products pages).
 * @returns {string} HTML string with cart section
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
 * Creates the layout without the cart section.
 * @returns {string} HTML string without cart section
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
 * Returns the HTML for the currently selected page.
 * @returns {string} HTML string for the current page
 */
const getCurrentPageHTML = () => {
  const currentPage = getCurrentPage();
  switch (currentPage) {
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
