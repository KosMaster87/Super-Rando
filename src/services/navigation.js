import { appState, notifyListeners } from "../state.js";
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
  setupFooterNavigation();
};

/**
 * Setzt Browser-Navigation (Zurück/Vor-Buttons)
 */
const setupBrowserNavigation = () => {
  // Verwende hashchange statt popstate
  window.addEventListener("hashchange", () => {
    const page = extractPageFromURL();
    if (isValidPage(page)) {
      appState.currentPage = page;
      notifyListeners();
    }
  });
};

/**
 * Behandelt Browser-Navigation Events
 * @param {PopStateEvent} event - PopState Event
 */
const handlePopState = (event) => {
  const page = event.state?.page || extractPageFromURL();
  if (isValidPage(page)) {
    appState.currentPage = page;
    notifyListeners();
  }
};

/**
 * Lädt die initiale Seite basierend auf der URL
 */
const loadInitialPage = () => {
  const page = extractPageFromURL();
  if (isValidPage(page)) {
    appState.currentPage = page;
    updateDocumentTitle(page);
  }
};

/**
 * Setzt Header-Navigation
 */
const setupHeaderNavigation = () => {
  // Logo Navigation
  const logoLink = document.getElementById("logoLink");
  if (logoLink) {
    logoLink.onclick = (e) => handleNavigationClick(e, PAGES.HOME);
  }

  // Header Navigation Links
  const navLinks = [
    { id: "navHome", page: PAGES.HOME },
    { id: "navProducts", page: PAGES.PRODUCTS },
    { id: "navContact", page: PAGES.CONTACT },
    { id: "navAbout", page: PAGES.ABOUT },
  ];

  navLinks.forEach(({ id, page }) => {
    const element = document.getElementById(id);
    if (element) {
      element.onclick = (e) => handleNavigationClick(e, page);
    }
  });
};

/**
 * Setzt Footer-Navigation
 */
const setupFooterNavigation = () => {
  // Footer Logo
  const footerLogoLink = document.getElementById("footerLogoLink");
  if (footerLogoLink) {
    footerLogoLink.onclick = (e) => handleNavigationClick(e, PAGES.HOME);
  }

  // Footer Links
  const footerLinks = [
    { id: "footerImpressum", page: PAGES.IMPRESSUM },
    { id: "footerDatenschutz", page: PAGES.DATENSCHUTZ },
    { id: "footerKontakt", page: PAGES.KONTAKTFORMULAR },
  ];

  footerLinks.forEach(({ id, page }) => {
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
const handleNavigationClick = (event, page) => {
  event.preventDefault();
  navigateToPage(page);
};

/**
 * Navigiert zu einer Seite
 * @param {string} page - Zielseite
 */
export const navigateToPage = (page) => {
  if (!isValidPage(page)) return;

  appState.currentPage = page;
  updateBrowserHistory(page);
  updateDocumentTitle(page);
  notifyListeners();
};

/**
 * Aktualisiert die Browser-History
 * @param {string} page - Seitenname
 */
const updateBrowserHistory = (page) => {
  // Hash-basierte URLs verwenden statt pushState
  const hash = page === PAGES.HOME ? "" : `#${page}`;
  window.location.hash = hash;
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
  // Hash-basierte Navigation
  const hash = window.location.hash.substring(1);
  return hash || PAGES.HOME;
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
    [PAGES.HOME]: "Fusion Küche",
    [PAGES.PRODUCTS]: "Unsere Produkte",
    [PAGES.CONTACT]: "Kontakt",
    [PAGES.ABOUT]: "Über uns",
    [PAGES.IMPRESSUM]: "Impressum",
    [PAGES.DATENSCHUTZ]: "Datenschutz",
    [PAGES.KONTAKTFORMULAR]: "Kontaktformular",
  };
  return titles[page] || "Fusion Küche";
};
