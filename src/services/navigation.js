import { appState, notifyListeners } from "../state.js";
import { PAGES } from "../utils/constants.js";

/**
 * Initialisiert alle Navigations-Event-Listener
 */
export const initializeNavigation = () => {
  setupLogoNavigation();
  setupMainNavigation();
};

/**
 * Setzt die Navigation für das Logo
 */
const setupLogoNavigation = () => {
  const logoLink = document.getElementById("logoLink");
  if (logoLink) {
    logoLink.addEventListener("click", (e) => handleNavClick(e, PAGES.HOME));
  }
};

/**
 * Setzt die Hauptnavigation
 */
const setupMainNavigation = () => {
  const navLinks = [
    { id: "navHome", page: PAGES.HOME },
    { id: "navProducts", page: PAGES.PRODUCTS },
    { id: "navContact", page: PAGES.CONTACT },
    { id: "navAbout", page: PAGES.ABOUT },
  ];

  navLinks.forEach(({ id, page }) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("click", (e) => handleNavClick(e, page));
    }
  });
};

/**
 * Behandelt Navigation-Klicks
 * @param {Event} event - Click-Event
 * @param {string} page - Zielseite
 */
const handleNavClick = (event, page) => {
  event.preventDefault();
  navigateToPage(page);
};

/**
 * Navigiert zu einer bestimmten Seite
 * @param {string} page - Zielseite
 */
export const navigateToPage = (page) => {
  if (Object.values(PAGES).includes(page)) {
    appState.currentPage = page;
    notifyListeners();
  }
};
