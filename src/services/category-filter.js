/**
 * @fileoverview Service for filtering dishes by category.
 * @description This module provides functions to filter dishes based on selected categories
 *              and to update category counts dynamically.
 * @module services/category-filter
 */

import { getDishes, getSelectedCategory, getCategories } from "../state.js";

/**
 * Returns dishes filtered by selected category.
 * @param {string} categoryId - Category ID to filter by
 * @returns {Array} Filtered dishes
 */
export const getFilteredDishes = (categoryId = getSelectedCategory()) => {
  const dishes = getDishes();
  if (categoryId === "all") {
    return dishes;
  }

  return dishes.filter((dish) => dish.tags && dish.tags.includes(categoryId));
};

/**
 * Initializes the category system by updating category counts.
 */
export const initializeCategorySystem = () => {
  updateCategoryCounts();
};

/**
 * Updates the count for each category based on current dishes.
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
