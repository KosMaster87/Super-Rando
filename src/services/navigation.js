import { setCurrentPage, saveSessionToStorage } from "../state.js";
import { PAGES } from "../utils/constants.js";

let isNavigationInitialized = false;

/**
 * Initialisiert das Navigations-System
 */
export const initializeNavigation = () => {
  if (isNavigationInitialized) return;

  setupBrowserNavigation();
  loadInitialPage();
  isNavigationInitialized = true;
};

/**
 * Setzt Event-Listener für Navigation-Links
 */
export const setupNavigationListeners = () => {
  setupHeaderNavigation();
};

/**
 * Setzt Browser-Navigation (Zurück/Vor-Buttons)
 */
const setupBrowserNavigation = () => {
  window.addEventListener("popstate", handlePopState);
};

/**
 * Behandelt Browser-Navigation Events
 * @param {PopStateEvent} event - PopState Event
 */
const handlePopState = (event) => {
  const page = event.state?.page || extractPageFromURL();
  if (isValidPage(page)) {
    setCurrentPage(page);
  }
};

/**
 * Lädt die initiale Seite basierend auf der URL
 */
const loadInitialPage = () => {
  const page = extractPageFromURL();
  if (isValidPage(page)) {
    setCurrentPage(page);
    updateDocumentTitle(page);
  }
};

/**
 * Setzt Header-Navigation
 */
const setupHeaderNavigation = () => {
  const logoLink = document.getElementById("logoLink");
  if (logoLink) {
    logoLink.onclick = (e) => handleNavigationClick(e, PAGES.HOME);
  }

  const navLinks = [
    { id: "navHome", page: PAGES.HOME },
    { id: "navProducts", page: PAGES.PRODUCTS },
  ];

  navLinks.forEach(({ id, page }) => {
    const element = document.getElementById(id);
    if (element) {
      element.onclick = (e) => handleNavigationClick(e, page);
    }
  });
};

/**
 * Behandelt Navigation-Klicks
 * @param {Event} event - Click Event
 * @param {string} page - Zielseite
 */
export const handleNavigationClick = (event, page) => {
  event.preventDefault();
  navigateToPage(page);
};

/**
 * Navigiert zu einer Seite
 * @param {string} page - Zielseite
 */
export const navigateToPage = (page) => {
  if (!isValidPage(page)) return;

  setCurrentPage(page);
  updateBrowserHistory(page);
  updateDocumentTitle(page);
  saveSessionToStorage();
};

/**
 * Aktualisiert die Browser-History
 * @param {string} page - Seitenname
 */
const updateBrowserHistory = (page) => {
  const url = page === PAGES.HOME ? "/" : `/${page}`;
  window.history.pushState({ page }, "", url);
};

/**
 * Aktualisiert den Dokument-Titel
 * @param {string} page - Seitenname
 */
const updateDocumentTitle = (page) => {
  const title = `Super~Rando - ${getPageTitle(page)}`;
  document.title = title;
};

/**
 * Extrahiert Seite aus URL
 * @returns {string} Seitenname
 */
const extractPageFromURL = () => {
  const path = window.location.pathname;
  return path.substring(1) || PAGES.HOME;
};

/**
 * Prüft ob Seite gültig ist
 * @param {string} page - Seitenname
 * @returns {boolean} Ist gültig
 */
const isValidPage = (page) => {
  return Object.values(PAGES).includes(page);
};

/**
 * Gibt Seitentitel zurück
 * @param {string} page - Seitenname
 * @returns {string} Titel
 */
const getPageTitle = (page) => {
  const titles = {
    [PAGES.HOME]: "Fusion cuisine",
    [PAGES.PRODUCTS]: "Our Products",
    [PAGES.CONTACT]: "Contact",
    [PAGES.IMPRINT]: "Imprint",
    [PAGES.DATAPROTECTION]: "Data Protection",
  };
  return titles[page] || "Fusion cuisine";
};
