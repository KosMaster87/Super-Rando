/**
 * @fileoverview Service for handling footer navigation interactions.
 * @description This module sets up event listeners for footer navigation elements,
 * allowing users to navigate to different pages and scroll to the top of the page
 * when footer links are clicked.
 * @module services/footer-navigation
 */

import { handleNavigationClick } from "./navigation.js";
import { PAGES } from "../utils/constants.js";

/**
 * Sets up event listeners for footer navigation.
 * Should be called on every re-render.
 */
export const setupFooterNavigationListeners = () => {
  setupFooterLogoNavigation();
  setupFooterLinksNavigation();
};

/**
 * Initializes the footer navigation.
 * Use for one-time initializations if needed.
 */
export const initializeFooterNavigation = () => {
  // Reserved for one-time initializations.
};

/**
 * Sets up navigation for the footer logo.
 * Navigates to the home page and scrolls to top when clicked.
 */
const setupFooterLogoNavigation = () => {
  const footerLogoLink = document.getElementById("footerLogoLink");
  if (footerLogoLink) {
    footerLogoLink.onclick = (e) => {
      handleNavigationClick(e, PAGES.HOME);
      scrollToTop();
    };
  }
};

/**
 * Sets up navigation for footer links.
 * Navigates to the corresponding page and scrolls to top when a link is clicked.
 */
const setupFooterLinksNavigation = () => {
  const footerLinks = [
    { id: "footerContact", page: PAGES.CONTACT },
    { id: "footerImpressum", page: PAGES.IMPRINT },
    { id: "footerDataProtection", page: PAGES.DATAPROTECTION },
  ];

  footerLinks.forEach(({ id, page }) => {
    const element = document.getElementById(id);
    if (element) {
      element.onclick = (e) => {
        handleNavigationClick(e, page);
        scrollToTop();
      };
    }
  });
};

/**
 * Scrolls the page to the top smoothly.
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
