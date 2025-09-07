import { ASSETS } from "../utils/constants.js";

/**
 * Renders the footer component.
 */
export const renderFooter = () => {
  const footerElement = document.getElementById("footerComponent");
  footerElement.innerHTML = createFooterHTML();
};

/**
 * Creates the HTML for the footer.
 * @returns {string} HTML string for the footer
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
 * Creates the footer logo section.
 * @returns {string} HTML string for the footer logo
 */
const createFooterLogo = () => {
  return `
    <a href="#" id="footerLogoLink" class="footer-logo-link">
      <img class="footer-logo" src="${ASSETS.ICONS}star.png" alt="Super~Rando Logo" />
    </a>
  `;
};

/**
 * Creates a divider line for the footer.
 * @returns {string} HTML string for the divider line
 */
const createFooterDivider = () => {
  return '<div class="line"></div>';
};

/**
 * Creates the footer navigation links.
 * @returns {string} HTML string for the footer links
 */
const createFooterLinks = () => {
  return `
    <div class="footer-links">
      ${createFooterNavItem("footerContact", "Contact")}
      ${createFooterNavItem("footerImpressum", "Imprint")}
      ${createFooterNavItem("footerDataProtection", "Data protection")}
    </div>
  `;
};

/**
 * Creates a single footer navigation item.
 * @param {string} id - Element ID
 * @param {string} text - Text for the navigation item
 * @returns {string} HTML string for a footer navigation item
 */
const createFooterNavItem = (id, text) => {
  return `
    <a href="#" class="footer-link" id="${id}">
      <span class="footer-text">${text}</span>
    </a>
  `;
};

/**
 * Creates the social media icons section in the footer.
 * @returns {string} HTML string for social media icons
 */
const createSocialMedia = () => {
  return `
    <div class="social-media">
      <a href="https://www.youtube.com/@kav87/" target="_blank" class="social-link">
        <img class="footer-icon" src="${ASSETS.ICONS}youtube-32px.png" alt="YouTube" />
      </a>
      <a href="https://github.com/KosMaster87/" target="_blank" class="social-link">
        <img class="footer-icon" src="${ASSETS.ICONS}github-32px.png" alt="GitHub" />
      </a>
      <a href="https://www.linkedin.com/in/konstantin-aksenov-802b88190/" target="_blank" class="social-link">
        <img class="footer-icon" src="${ASSETS.ICONS}linkedin-32px.png" alt="LinkedIn" />
      </a>
    </div>
  `;
};
