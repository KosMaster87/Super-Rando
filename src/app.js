/**
 * @fileoverview Main application entry point for Super Rando.
 * @description This module initializes the application by loading stored data,
 * setting up event listeners, and rendering the main components.
 * @module app
 */

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
import { ScrollManager } from "./utils/scroll-manager.js";

/**
 * Initializes the entire application:
 * Loads stored data, sets up user preferences, category system, cart status,
 * navigation, footer navigation, state listeners, renders all components,
 * and enables scroll management.
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
  ScrollManager.init(appState);
};

/**
 * Registers all state listeners for automatic UI updates.
 * Adds the main render function to the appState listeners array.
 */
const registerStateListeners = () => {
  appState.listeners.push(renderAllComponents);
};

/**
 * Renders all main components of the application:
 * Header, main content, footer, and sets up component-specific event listeners.
 */
const renderAllComponents = () => {
  renderHeader();
  renderMainContent();
  renderFooter();
  setupComponentEventListeners();
};

/**
 * Sets up event listeners that need to be re-initialized on each re-render.
 * Includes navigation, footer navigation, cart, dish, and settings event handlers.
 */
const setupComponentEventListeners = () => {
  setupNavigationListeners();
  setupFooterNavigationListeners();
  initializeCartEvents();
  initializeDishEvents();
  initializeSettingsEvents();
};

/**
 * Starts the application after the DOM has loaded.
 */
document.addEventListener("DOMContentLoaded", initializeApp);
