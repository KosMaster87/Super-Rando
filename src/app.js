import { appState, loadCartFromStorage, notifyListeners } from "./state.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderMainContent } from "./components/main-content.js";
import { initializeNavigation } from "./services/navigation.js";
import { initializeFooterNavigation } from "./services/footer-navigation.js";
import { initializeCartEvents } from "./services/cart-events.js";

/**
 * Initialisiert die gesamte Anwendung
 */
const initializeApp = () => {
  loadCartFromStorage();
  registerStateListeners();
  renderAllComponents();
  initializeEventListeners();
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
};

/**
 * Initialisiert alle Event-Listener
 */
const initializeEventListeners = () => {
  initializeNavigation();
  initializeFooterNavigation();
  initializeCartEvents();
};

/**
 * Startet die Anwendung nach DOM-Load
 */
document.addEventListener("DOMContentLoaded", initializeApp);
