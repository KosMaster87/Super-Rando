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
    footerLogoLink.addEventListener("click", (e) => {
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
      element.addEventListener("click", (e) => {
        e.preventDefault();
        navigateToPage(page);
      });
    }
  });
};
