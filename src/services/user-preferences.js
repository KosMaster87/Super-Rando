import {
  appState,
  saveUserPreferences,
  notifyListeners,
  getUserPreferences,
} from "../state.js";

/**
 * TODO
 * Setzt das Theme
 * @param {string} theme - Theme-Name ("dark", "light")
 */
export const setTheme = (theme) => {
  const currentPreferences = getUserPreferences();
  console.log("Theme wird gesetzt:", theme); // Debug-Log
  if (currentPreferences.theme !== theme) {
    appState.userPreferences = {
      ...currentPreferences,
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
  const currentPreferences = getUserPreferences();
  appState.userPreferences = {
    ...currentPreferences,
    showNotifications: !currentPreferences.showNotifications,
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
  const userPreferences = getUserPreferences();
  applyTheme(userPreferences.theme);
  saveUserPreferences();
};
