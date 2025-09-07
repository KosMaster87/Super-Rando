import {
  saveUserPreferences,
  notifyListeners,
  getUserPreferences,
  setUserPreferences,
} from "../state.js";

/**
 * Setzt das Theme
 * @param {string} theme - Theme-Name ("dark", "light")
 */
export const setTheme = (theme) => {
  const currentPreferences = getUserPreferences();
  console.log("Theme wird gesetzt:", theme); // Debug-Log
  if (currentPreferences.theme !== theme) {
    setUserPreferences({ theme });
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
  setUserPreferences({
    showNotifications: !currentPreferences.showNotifications,
  });
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
