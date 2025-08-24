import { appState, loadCartFromStorage, notifyListeners } from "./state.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderMainContent } from "./components/main-content.js";
import {
  initializeNavigation,
  setupNavigationListeners,
} from "./services/navigation.js";
import { initializeCartEvents } from "./services/cart-events.js";

/**
 * Initialisiert die gesamte Anwendung
 */
const initializeApp = () => {
  loadCartFromStorage();
  initializeNavigation();
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
  initializeCartEvents();
};

/**
 * Startet die Anwendung nach DOM-Load
 */
document.addEventListener("DOMContentLoaded", initializeApp);
