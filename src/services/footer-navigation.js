import { handleNavigationClick } from "./navigation.js";
import { PAGES } from "../utils/constants.js";

/**
 * Setzt Event-Listener für Footer-Navigation (bei jedem Re-Render)
 */
export const setupFooterNavigationListeners = () => {
  setupFooterLogoNavigation();
  setupFooterLinksNavigation();
};

/**
 * Initialisiert die Footer-Navigation (nur einmal)
 */
export const initializeFooterNavigation = () => {
  // Kann leer bleiben oder für einmalige Initialisierungen verwendet werden
};

/**
 * Setzt die Navigation für das Footer-Logo
 */
const setupFooterLogoNavigation = () => {
  const footerLogoLink = document.getElementById("footerLogoLink");
  if (footerLogoLink) {
    footerLogoLink.onclick = (e) => handleNavigationClick(e, PAGES.HOME);
  }
};

/**
 * Setzt die Footer-Links Navigation
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
      element.onclick = (e) => handleNavigationClick(e, page);
    }
  });
};
