import { setSelectedCategory } from "./category-filter.js";

/**
 * Initialisiert alle Kategorie-Event-Listener
 */
export const initializeCategoryEvents = () => {
  setupCategoryClickEvents();
};

/**
 * Setzt Event-Listener für Kategorie-Clicks
 */
const setupCategoryClickEvents = () => {
  const categoryCards = document.querySelectorAll(
    ".category-card[data-category]"
  );

  categoryCards.forEach((card) => {
    const categoryId = card.dataset.category;

    if (categoryId) {
      card.onclick = () => handleCategoryClick(categoryId);
    }
  });
};

/**
 * Behandelt Kategorie-Klicks
 * @param {string} categoryId - Kategorie-ID
 */
const handleCategoryClick = (categoryId) => {
  setSelectedCategory(categoryId);
};
