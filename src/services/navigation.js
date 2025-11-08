/**
 * @fileoverview Navigation service for handling page navigation and browser history.
 * @description This module manages navigation within the SPA, including updating the browser history,
 * handling back/forward navigation, and updating the document title based on the current page.
 * @module services/navigation
 */

import { setCurrentPage, saveSessionToStorage } from "../state.js";
import { PAGES } from "../utils/constants.js";

let isNavigationInitialized = false;

/**
 * Initializes the navigation system.
 * Sets up browser history navigation and loads the initial page from the URL.
 */
export const initializeNavigation = () => {
  if (isNavigationInitialized) return;

  setupBrowserNavigation();
  loadInitialPage();
  isNavigationInitialized = true;
};

/**
 * Sets event listeners for navigation links in the header.
 */
export const setupNavigationListeners = () => {
  setupHeaderNavigation();
};

/**
 * Sets up browser navigation event listeners (back/forward buttons).
 */
const setupBrowserNavigation = () => {
  window.addEventListener("popstate", handlePopState);
};

/**
 * Handles browser navigation events.
 * Updates the page state according to browser history.
 * @param {PopStateEvent} event - PopState event
 */
const handlePopState = (event) => {
  const page = event.state?.page || extractPageFromURL();
  if (isValidPage(page)) {
    setCurrentPage(page);
  }
};

/**
 * Loads the initial page based on the current URL.
 */
const loadInitialPage = () => {
  const page = extractPageFromURL();
  if (isValidPage(page)) {
    setCurrentPage(page);
    updateDocumentTitle(page);
  }
};

/**
 * Sets up header navigation link event listeners.
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
 * Handles navigation clicks.
 * Prevents the default behavior and navigates to the selected page.
 * @param {Event} event - Click event
 * @param {string} page - Target page
 */
export const handleNavigationClick = (event, page) => {
  event.preventDefault();
  navigateToPage(page);
};

/**
 * Navigates to a page.
 * Updates state, browser history, document title, and saves session.
 * @param {string} page - Target page
 */
export const navigateToPage = (page) => {
  if (!isValidPage(page)) return;

  setCurrentPage(page);
  updateBrowserHistory(page);
  updateDocumentTitle(page);
  saveSessionToStorage();
};

/**
 * Updates the browser history with the new page.
 * @param {string} page - Page name
 */
const updateBrowserHistory = (page) => {
  const url = page === PAGES.HOME ? "/" : `/${page}`;
  window.history.pushState({ page }, "", url);
};

/**
 * Updates the document title based on the current page.
 * @param {string} page - Page name
 */
const updateDocumentTitle = (page) => {
  const title = `Super~Rando - ${getPageTitle(page)}`;
  document.title = title;
};

/**
 * Extracts the page name from the current URL.
 * @returns {string} Page name
 */
const extractPageFromURL = () => {
  const path = window.location.pathname;
  return path.substring(1) || PAGES.HOME;
};

/**
 * Checks if a page is valid.
 * @param {string} page - Page name
 * @returns {boolean} Is valid
 */
const isValidPage = (page) => {
  return Object.values(PAGES).includes(page);
};

/**
 * Returns the page title for a given page.
 * @param {string} page - Page name
 * @returns {string} Title
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
