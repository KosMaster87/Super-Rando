import { appState, loadAllStoredData } from "./state.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderMainContent } from "./components/main-content.js";
import { initializeCartEvents } from "./services/cart-events.js";
import { initializeDishEvents } from "./services/dish-events.js";
import { initializeCategorySystem } from "./services/category-filter.js";
import { initializeUserPreferences } from "./services/user-preferences.js";
import { initializeSettingsEvents } from "./services/settings-events.js";
import { initializeCartStatus } from "./services/cart.js";
import {
  initializeFooterNavigation,
  setupFooterNavigationListeners,
} from "./services/footer-navigation.js";
import {
  initializeNavigation,
  setupNavigationListeners,
} from "./services/navigation.js";

/**
 * Initialisiert die gesamte Anwendung
 */
const initializeApp = () => {
  loadAllStoredData();
  initializeUserPreferences();
  initializeCategorySystem();
  initializeCartStatus();
  initializeNavigation();
  initializeFooterNavigation();
  registerStateListeners();
  renderAllComponents();
};

/**
 * Registriert alle State-Listener für automatische UI-Updates
 */
const registerStateListeners = () => {
  appState.listeners.push(renderAllComponents);
};

/**
 * Rendert alle Hauptkomponenten der Anwendung
 */
const renderAllComponents = () => {
  renderHeader();
  renderMainContent();
  renderFooter();
  setupComponentEventListeners();
};

/**
 * Setzt Event-Listener die bei jedem Re-Render neu gesetzt werden müssen
 */
const setupComponentEventListeners = () => {
  setupNavigationListeners();
  setupFooterNavigationListeners();
  initializeCartEvents();
  initializeDishEvents();
  initializeSettingsEvents();
};

/**
 * Startet die Anwendung nach DOM-Load
 */
document.addEventListener("DOMContentLoaded", initializeApp);
