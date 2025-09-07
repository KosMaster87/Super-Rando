import { setSelectedCategory } from "../state.js";

/**
 * Initializes all category event listeners.
 * Sets up click events for category cards.
 */
export const initializeCategoryEvents = () => {
  setupCategoryClickEvents();
};

/**
 * Sets up click event listeners for category cards.
 * Assigns click handlers to each card with a category ID.
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
 * Handles a category card click.
 * Sets the selected category in the state.
 * @param {string} categoryId - The selected category ID
 */
const handleCategoryClick = (categoryId) => {
  setSelectedCategory(categoryId);
};
