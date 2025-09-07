import {
  saveUserPreferences,
  notifyListeners,
  getUserPreferences,
  setUserPreferences,
} from "../state.js";

/**
 * Sets the theme.
 * Updates the user preferences and applies the theme to the HTML page.
 * @param {string} theme - Theme name ("dark", "light")
 */
export const setTheme = (theme) => {
  const currentPreferences = getUserPreferences();

  if (currentPreferences.theme !== theme) {
    setUserPreferences({ theme });
    applyTheme(theme);
    saveUserPreferences();
    notifyListeners();
  }
};

/**
 * Toggles notifications on or off.
 * Updates the user preferences accordingly.
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
 * Applies the theme to the HTML page.
 * Removes previous theme classes and adds the new theme class.
 * @param {string} theme - Theme name
 */
const applyTheme = (theme) => {
  document.body.className = document.body.className.replace(/theme-\w+/g, "");
  document.body.classList.add(`theme-${theme}`);
};

/**
 * Initializes user preferences at app start.
 * Applies the saved theme and persists user preferences.
 */
export const initializeUserPreferences = () => {
  const userPreferences = getUserPreferences();
  applyTheme(userPreferences.theme);
  saveUserPreferences();
};
