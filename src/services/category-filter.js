import {
  appState,
  notifyListeners,
  saveSessionToStorage,
  getDishes,
  getSelectedCategory,
} from "../state.js";

/**
 * Filtert Gerichte nach ausgewählter Kategorie
 * @param {string} categoryId - Kategorie-ID
 * @returns {Array} Gefilterte Gerichte
 */
export const getFilteredDishes = (categoryId = getSelectedCategory()) => {
  const dishes = getDishes();
  if (categoryId === "all") {
    return dishes;
  }

  return dishes.filter((dish) => dish.tags && dish.tags.includes(categoryId));
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
  const dishes = getDishes();
  appState.categories.forEach((category) => {
    if (category.id === "all") {
      category.count = dishes.length;
    } else {
      category.count = dishes.filter(
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
