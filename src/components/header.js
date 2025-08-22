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
      ${createHeaderRight()}
    </div>
  `;
};

/**
 * Erstellt den linken Header-Bereich mit Logo
 * @returns {string} HTML-String für linken Header-Bereich
 */
const createHeaderLeft = () => {
  return `
    <div class="header-left">
      <a href="#" id="logoLink" class="logo-link">
        <img class="logo" src="${ASSETS.ICONS}star.png" alt="Super~Rando Logo" />
        <div class="brand-info">
          <h1 class="brand-name">Super~Rando</h1>
          <span class="brand-tagline">Fusion Küche</span>
        </div>
      </a>
    </div>
  `;
};

/**
 * Erstellt die Hauptnavigation
 * @returns {string} HTML-String für Navigation
 */
const createHeaderNav = () => {
  return `
    <nav class="header-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <a href="#" id="navHome" class="nav-link">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Home</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" id="navProducts" class="nav-link">
            <span class="nav-icon">🍽️</span>
            <span class="nav-text">Produkte</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" id="navContact" class="nav-link">
            <span class="nav-icon">📞</span>
            <span class="nav-text">Kontakt</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" id="navAbout" class="nav-link">
            <span class="nav-icon">ℹ️</span>
            <span class="nav-text">Über uns</span>
          </a>
        </li>
      </ul>
    </nav>
  `;
};

/**
 * Erstellt den rechten Header-Bereich mit Kontaktinfo
 * @returns {string} HTML-String für rechten Header-Bereich
 */
const createHeaderRight = () => {
  return `
    <div class="header-right">
      <div class="contact-info">
        <span class="phone-number">📞 +49 123 456789</span>
      </div>
    </div>
  `;
};
