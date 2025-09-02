import { appState, saveUserPreferences, notifyListeners } from "../state.js";

/**
 * Setzt das Theme
 * @param {string} theme - Theme-Name ("dark", "light")
 */
export const setTheme = (theme) => {
  console.log("Theme wird gesetzt:", theme); // Debug-Log
  if (appState.userPreferences.theme !== theme) {
    appState.userPreferences = {
      ...appState.userPreferences,
      theme: theme,
    };
    applyTheme(theme);
    saveUserPreferences();
    notifyListeners();
  }
};

/**
 * Togglet Benachrichtigungen an/aus
 */
export const toggleNotifications = () => {
  appState.userPreferences = {
    ...appState.userPreferences,
    showNotifications: !appState.userPreferences.showNotifications,
  };
  saveUserPreferences();
  notifyListeners();
};

/**
 * Wendet das Theme auf die HTML-Seite an
 * @param {string} theme - Theme-Name
 */
const applyTheme = (theme) => {
  document.body.className = document.body.className.replace(/theme-\w+/g, "");
  document.body.classList.add(`theme-${theme}`);
};

/**
 * Initialisiert User-Preferences beim App-Start
 */
export const initializeUserPreferences = () => {
  applyTheme(appState.userPreferences.theme);
  saveUserPreferences();
};
