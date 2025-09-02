import { ASSETS } from "../utils/constants.js";

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
      ${createSettingsDropdown()}
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

/**
 * Erstellt das Settings-Dropdown
 * TODO ${createThemeSettings()}
 * TODO ${createLanguageSettings()}
 * @returns {string} HTML-String für Settings-Dropdown
 */
const createSettingsDropdown = () => {
  return `
    <li class="nav-item nav-dropdown">
      <button class="nav-link dropdown-toggle" id="settingsDropdown">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text">Einstellungen</span>
        <span class="dropdown-arrow">▼</span>
      </button>
      <div class="dropdown-menu" id="settingsMenu">

        ${createNotificationSettings()}
      </div>
    </li>
  `;
};

/**
 * Erstellt die Theme-Einstellungen
 * @returns {string} HTML-String für Theme-Settings
 */
const createThemeSettings = () => {
  return `
    <div class="dropdown-section">
      <h4 class="dropdown-title">Theme</h4>
      <div class="setting-group">
        <button class="setting-option" data-setting="theme" data-value="light">
          <span class="setting-icon">☀️</span>
          <span class="setting-text">Hell</span>
        </button>

        <button class="setting-option" data-setting="theme" data-value="dark">
          <span class="setting-icon">🌙</span>
          <span class="setting-text">Dunkel</span>
        </button>
      </div>
    </div>
  `;
};

/**
 * Erstellt die Benachrichtigungs-Einstellungen
 * @returns {string} HTML-String für Notification-Settings
 */
const createNotificationSettings = () => {
  return `
    <div class="dropdown-section">
      <h4 class="dropdown-title">Benachrichtigungen</h4>
      <div class="setting-group">
        <button class="setting-toggle" id="notificationToggle">
          <span class="setting-icon">🔔</span>
          <span class="setting-text">Popup-Benachrichtigungen</span>
          <span class="toggle-indicator">●</span>
        </button>
      </div>
    </div>
  `;
};
