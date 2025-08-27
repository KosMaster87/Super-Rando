import { appState, notifyListeners, saveSessionToStorage } from "../state.js";

/**
 * Filtert Gerichte nach ausgewählter Kategorie
 * @param {string} categoryId - Kategorie-ID
 * @returns {Array} Gefilterte Gerichte
 */
export const getFilteredDishes = (categoryId = appState.selectedCategory) => {
  if (categoryId === "all") {
    return appState.dishes;
  }

  return appState.dishes.filter(
    (dish) => dish.tags && dish.tags.includes(categoryId)
  );
};

/**
 * Setzt die ausgewählte Kategorie
 * @param {string} categoryId - Kategorie-ID
 */
export const setSelectedCategory = (categoryId) => {
  if (appState.selectedCategory !== categoryId) {
    appState.selectedCategory = categoryId;
    saveSessionToStorage(); // ← Session speichern bei Kategorie-Wechsel!
    notifyListeners();
  }
};

/**
 * Aktualisiert die Kategorie-Zähler
 */
export const updateCategoryCounts = () => {
  appState.categories.forEach((category) => {
    if (category.id === "all") {
      category.count = appState.dishes.length;
    } else {
      category.count = appState.dishes.filter(
        (dish) => dish.tags && dish.tags.includes(category.id)
      ).length;
    }
  });
};

/**
 * Initialisiert das Kategorie-System
 */
export const initializeCategorySystem = () => {
  updateCategoryCounts();
};
