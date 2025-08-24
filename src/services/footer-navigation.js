import { navigateToPage } from "./navigation.js";
import { PAGES } from "../utils/constants.js";

/**
 * Initialisiert die Footer-Navigation
 */
export const initializeFooterNavigation = () => {
  setupFooterLogoNavigation();
  setupFooterLinksNavigation();
};

/**
 * Setzt die Navigation für das Footer-Logo
 */
const setupFooterLogoNavigation = () => {
  const footerLogoLink = document.getElementById("footerLogoLink");
  if (footerLogoLink) {
    // Alte Event-Listener entfernen
    footerLogoLink.replaceWith(footerLogoLink.cloneNode(true));
    const newFooterLogoLink = document.getElementById("footerLogoLink");
    newFooterLogoLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigateToPage(PAGES.HOME);
    });
  }
};

/**
 * Setzt die Footer-Links Navigation
 */
const setupFooterLinksNavigation = () => {
  const footerLinks = [
    { id: "footerImpressum", page: PAGES.IMPRESSUM },
    { id: "footerDatenschutz", page: PAGES.DATENSCHUTZ },
    { id: "footerKontakt", page: PAGES.KONTAKTFORMULAR },
  ];

  footerLinks.forEach(({ id, page }) => {
    const element = document.getElementById(id);
    if (element) {
      // Alte Event-Listener entfernen
      element.replaceWith(element.cloneNode(true));
      const newElement = document.getElementById(id);
      newElement.addEventListener("click", (e) => {
        e.preventDefault();
        navigateToPage(page);
      });
    }
  });
};
