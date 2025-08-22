import { ASSETS } from "../utils/constants.js";

/**
 * Rendert die Footer-Komponente
 */
export const renderFooter = () => {
  const footerElement = document.getElementById("footerComponent");
  footerElement.innerHTML = createFooterHTML();
};

/**
 * Erstellt das HTML für den Footer
 * @returns {string} HTML-String für Footer
 */
const createFooterHTML = () => {
  return `
    <div class="footer-container">
      ${createFooterLogo()}
      ${createFooterDivider()}
      ${createFooterLinks()}
      ${createFooterDivider()}
      ${createSocialMedia()}
    </div>
  `;
};

/**
 * Erstellt das Footer-Logo
 * @returns {string} HTML-String für Footer-Logo
 */
const createFooterLogo = () => {
  return `
    <a href="#" id="footerLogoLink" class="footer-logo-link">
      <img class="footer-logo" src="${ASSETS.ICONS}star.png" alt="Super~Rando Logo" />
    </a>
  `;
};

/**
 * Erstellt einen Trennstrich
 * @returns {string} HTML-String für Trennlinie
 */
const createFooterDivider = () => {
  return '<div class="line"></div>';
};

/**
 * Erstellt die Footer-Links
 * @returns {string} HTML-String für Footer-Links
 */
const createFooterLinks = () => {
  return `
    <div class="footer-links">
      <a href="#" id="footerImpressum" class="footer-link">Impressum</a>
      <a href="#" id="footerDatenschutz" class="footer-link">Datenschutz</a>
      <a href="#" id="footerKontakt" class="footer-link">Kontaktformular</a>
    </div>
  `;
};

/**
 * Erstellt die Social Media Icons
 * @returns {string} HTML-String für Social Media
 */
const createSocialMedia = () => {
  return `
    <div class="social-media">
      <a href="https://www.facebook.com/" target="_blank" class="social-link">
        <img class="footer-icon" src="${ASSETS.ICONS}facebook_white.png" alt="Facebook" />
      </a>
      <a href="https://www.instagram.com/" target="_blank" class="social-link">
        <img class="footer-icon" src="${ASSETS.ICONS}instagram_white.png" alt="Instagram" />
      </a>
      <a href="https://twitter.com/" target="_blank" class="social-link">
        <img class="footer-icon" src="${ASSETS.ICONS}twitter_white.png" alt="Twitter" />
      </a>
    </div>
  `;
};
