import { getDishes, getSelectedCategory, getCategories } from "../state.js";

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
 * Aktualisiert die Kategorie-Zähler
 */
export const updateCategoryCounts = () => {
  const dishes = getDishes();
  const categories = getCategories();

  categories.forEach((category) => {
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
