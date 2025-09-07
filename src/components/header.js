import { ASSETS } from "../utils/constants.js";
import { getUserPreferences } from "../state.js";

/**
 * Rendert die Header-Komponente
 */
export const renderHeader = () => {
  const headerElement = document.getElementById("headerComponent");
  headerElement.innerHTML = createHeaderHTML();
};

/**
 * Erstellt das HTML für den Header
 * @returns {string} HTML-String für Header
 */
const createHeaderHTML = () => {
  return `
    <div class="header-container">
      ${createHeaderLeft()}
      ${createHeaderNav()}
    </div>
  `;
};

/**
 * Erstellt die linke Header-Sektion mit Logo
 * @returns {string} HTML-String für Header-Links
 */
const createHeaderLeft = () => {
  return `
    <div class="header-left">
      <a href="#" class="logo-link" id="logoLink">
        <img class="logo" src="${ASSETS.ICONS}star.png" alt="Super~Rando Logo" />
        <div class="brand-info">
          <h1 class="brand-name">Super~Rando</h1>
          <p class="brand-tagline">Fusion Küche erleben</p>
        </div>
      </a>
    </div>
  `;
};

/**
 * Erstellt die Header-Navigation
 * @returns {string} HTML-String für Navigation
 */
const createHeaderNav = () => {
  return `
    <nav class="header-nav">
      ${createNavigation()}
    </nav>
  `;
};

/**
 * Erstellt die Navigations-Links
 * @returns {string} HTML-String für Navigation
 */
const createNavigation = () => {
  return `
    <ul class="nav-list">
      ${createNavItem("navHome", "🏠", "Home")}
      ${createNavItem("navProducts", "🍽️", "Produkte")}
      ${createNotificationToggle()}
      ${createPhoneNavItem()}
    </ul>
  `;
};

/**
 * Erstellt ein Standard-Navigations-Item
 * @param {string} id - Element-ID
 * @param {string} icon - Icon für Navigation
 * @param {string} text - Text für Navigation
 * @returns {string} HTML-String für Nav-Item
 */
const createNavItem = (id, icon, text) => {
  return `
    <li class="nav-item">
      <a href="#" class="nav-link" id="${id}">
        <span class="nav-icon">${icon}</span>
        <span class="nav-text">${text}</span>
      </a>
    </li>
  `;
};

/**
 * Erstellt den Benachrichtigungs-Toggle-Button
 * @returns {string} HTML-String für Notification-Toggle
 */
const createNotificationToggle = () => {
  const userPreferences = getUserPreferences();
  const isActive = userPreferences.showNotifications;
  const icon = isActive ? "🔔" : "🔕";

  return `
    <li class="nav-item">
      <button class="nav-link notification-toggle" id="notificationToggle" data-active="${isActive}">
        <span class="nav-icon notification-icon">${icon}</span>
        <span class="nav-text">Benachrichtigungen</span>
      </button>
    </li>
  `;
};

/**
 * Erstellt das Telefon-Navigations-Item
 * @returns {string} HTML-String für Telefon-Nav-Item
 */
const createPhoneNavItem = () => {
  return `
    <li class="nav-item">
      <a href="tel:+49123456789" class="nav-link" id="phoneNavLink">
        <span class="nav-icon">📞</span>
        <span class="nav-text">+49 123 456 789</span>
      </a>
    </li>
  `;
};
