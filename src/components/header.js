import { ASSETS } from "../utils/constants.js";
import { getUserPreferences } from "../state.js";

/**
 * Renders the header component.
 */
export const renderHeader = () => {
  const headerElement = document.getElementById("headerComponent");
  headerElement.innerHTML = createHeaderHTML();
};

/**
 * Creates the HTML for the header.
 * @returns {string} HTML string for the header
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
 * Creates the left section of the header containing the logo.
 * @returns {string} HTML string for the header left section
 */
const createHeaderLeft = () => {
  return `
    <div class="header-left">
      <a href="#" class="logo-link" id="logoLink">
        <img class="logo" src="${ASSETS.ICONS}star.png" alt="Super~Rando Logo" />
        <div class="brand-info">
          <h1 class="brand-name">Super~Rando</h1>
          <p class="brand-tagline">Experience fusion cuisine</p>
        </div>
      </a>
    </div>
  `;
};

/**
/**
 * Creates the header navigation section.
 * @returns {string} HTML string for the navigation section
 */
const createHeaderNav = () => {
  return `
    <nav class="header-nav">
      ${createNavigation()}
    </nav>
  `;
};

/**
 * Creates the navigation links for the header.
 * @returns {string} HTML string for the navigation links
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
 * Creates a standard navigation item.
 * @param {string} id - Element ID
 * @param {string} icon - Icon for the navigation item
 * @param {string} text - Text for the navigation item
 * @returns {string} HTML string for a navigation item
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
 * Creates the notification toggle button for the navigation.
 * @returns {string} HTML string for the notification toggle
 */
const createNotificationToggle = () => {
  const userPreferences = getUserPreferences();
  const isActive = userPreferences.showNotifications;
  const icon = isActive ? "🔔" : "🔕";

  return `
    <li class="nav-item">
      <button class="nav-link notification-toggle" id="notificationToggle" data-active="${isActive}">
        <span class="nav-icon notification-icon">${icon}</span>
        <span class="nav-text">Notifications</span>
      </button>
    </li>
  `;
};

/**
 * Creates the phone navigation item.
 * @returns {string} HTML string for the phone navigation item
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
