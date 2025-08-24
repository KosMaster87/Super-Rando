import { appState } from "../state.js";
import { renderHomePage } from "./pages/home-page.js";
import { renderCart } from "./cart.js";
import { renderCartToggle } from "./cart-toggle.js";
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
    <div class="page-layout-with-cart">
      <div class="content-area">
        ${getCurrentPageHTML()}
      </div>
      <div class="cart-area">
        ${renderCart()}
      </div>
    </div>
    ${renderCartToggle()}
  `;
};

/**
 * Erstellt Layout ohne Warenkorb
 * @returns {string} HTML-String für Layout ohne Cart
 */
const createLayoutWithoutCart = () => {
  return `
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
      return renderProductsPagePlaceholder();
    case "contact":
      return renderContactPagePlaceholder();
    case "about":
      return renderAboutPagePlaceholder();
    case "impressum":
      return renderImpressumPagePlaceholder();
    case "datenschutz":
      return renderDatenschutzPagePlaceholder();
    case "kontaktformular":
      return renderKontaktformularPagePlaceholder();
    default:
      return renderHomePage();
  }
};

/**
 * Rendert Platzhalter für Products-Seite
 * @returns {string} HTML-String für Products-Platzhalter
 */
const renderProductsPagePlaceholder = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Unsere Produkte</h1>
      <p class="page-subtitle">Hier finden Sie unser komplettes Sortiment</p>
      <div class="placeholder-content">
        <p>Diese Seite wird gerade entwickelt...</p>
      </div>
    </section>
  `;
};

/**
 * Rendert Platzhalter für Contact-Seite
 * @returns {string} HTML-String für Contact-Platzhalter
 */
const renderContactPagePlaceholder = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Kontakt</h1>
      <p class="page-subtitle">Nehmen Sie Kontakt mit uns auf</p>
      <div class="placeholder-content">
        <p>Diese Seite wird gerade entwickelt...</p>
      </div>
    </section>
  `;
};

/**
 * Rendert Platzhalter für About-Seite
 * @returns {string} HTML-String für About-Platzhalter
 */
const renderAboutPagePlaceholder = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Über uns</h1>
      <p class="page-subtitle">Erfahren Sie mehr über Super~Rando</p>
      <div class="placeholder-content">
        <p>Diese Seite wird gerade entwickelt...</p>
      </div>
    </section>
  `;
};

/**
 * Rendert Platzhalter für Impressum-Seite
 * @returns {string} HTML-String für Impressum-Platzhalter
 */
const renderImpressumPagePlaceholder = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Impressum</h1>
      <div class="placeholder-content">
        <p>Diese Seite wird gerade entwickelt...</p>
      </div>
    </section>
  `;
};

/**
 * Rendert Platzhalter für Datenschutz-Seite
 * @returns {string} HTML-String für Datenschutz-Platzhalter
 */
const renderDatenschutzPagePlaceholder = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Datenschutz</h1>
      <div class="placeholder-content">
        <p>Diese Seite wird gerade entwickelt...</p>
      </div>
    </section>
  `;
};

/**
 * Rendert Platzhalter für Kontaktformular-Seite
 * @returns {string} HTML-String für Kontaktformular-Platzhalter
 */
const renderKontaktformularPagePlaceholder = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Kontaktformular</h1>
      <div class="placeholder-content">
        <p>Diese Seite wird gerade entwickelt...</p>
      </div>
    </section>
  `;
};
