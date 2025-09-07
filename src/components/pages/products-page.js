import { getCategories, getSelectedCategory } from "../../state.js";
import { getFilteredDishes } from "../../services/category-filter.js";

/**
 * Renders the Products page.
 * @returns {string} HTML string for the Products page
 */
export const renderProductsPage = () => {
  return `
    <div class="products-wrapper">
      <section class="products-content">
        ${createProductsHeader()}
        ${createProductCategories()}
        ${createDishesSection()}
      </section>
    </div>
  `;
};

/**
 * Creates the Products header section.
 * @returns {string} HTML string for the Products header
 */
const createProductsHeader = () => {
  return `
    <div class="products-header">
      <h1 class="page-title">Our Product Categories</h1>
      <p class="page-subtitle">Discover our diverse fusion cuisine</p>
    </div>
  `;
};

/**
 * Creates the product categories section.
 * @returns {string} HTML string for categories
 */
const createProductCategories = () => {
  const categories = getCategories();
  return `
    <section class="product-categories">
      ${categories.map((category) => createCategoryCard(category)).join("")}
    </section>
  `;
};

/**
 * Creates a category card.
 * @param {Object} category - Category object
 * @returns {string} HTML string for the category card
 */
const createCategoryCard = (category) => {
  const selectedCategory = getSelectedCategory();
  const isActive = selectedCategory === category.id;

  return `
    <div class="category-card ${isActive ? "active" : ""}" 
         data-category="${category.id}" 
         id="category-${category.id}">
      <div class="category-icon">${category.icon}</div>
      <div class="line-products"></div>
      <h3 class="category-title">${category.name}</h3>
      <p class="category-description">${category.count} dishes</p>
    </div>
  `;
};

/**
 * Creates the dishes section.
 * @returns {string} HTML string for the dishes section
 */
const createDishesSection = () => {
  const filteredDishes = getFilteredDishes();
  const selectedCategory = getSelectedCategory();

  return `
    <section class="dishes-section">
      <div class="dishes-header">
        <h2 class="dishes-title">
          ${
            selectedCategory === "all"
              ? "All specialties"
              : getCategoryDisplayName()
          }
        </h2>
        <p class="dishes-subtitle">${filteredDishes.length} dishes found</p>
      </div>
      <div class="dishes-grid">
        ${
          filteredDishes.length > 0
            ? filteredDishes.map((dish) => createDishCard(dish)).join("")
            : createEmptyState()
        }
      </div>
    </section>
  `;
};

/**
 * Returns the display name of the current category.
 * @returns {string} Category display name
 */
const getCategoryDisplayName = () => {
  const categories = getCategories();
  const selectedCategory = getSelectedCategory();
  const category = categories.find((cat) => cat.id === selectedCategory);
  return category ? category.name : "All specialties";
};

/**
 * Creates the empty state message for no dishes found.
 * @returns {string} HTML string for the empty state
 */
const createEmptyState = () => {
  return `
    <div class="dishes-empty">
      <div class="empty-icon">🍽️</div>
      <h3 class="empty-title">No dishes found</h3>
      <p class="empty-description">There are currently no dishes available in this category.</p>
    </div>
  `;
};

/**
 * Creates a dish card.
 * @param {Object} dish - Dish object
 * @returns {string} HTML string for the dish card
 */
const createDishCard = (dish) => {
  return `
    <div class="dish-card">
      <img class="dish-image" src="${dish.image}" alt="${dish.name}" />
      <div class="dish-content">
        <h3 class="dish-name">${dish.name}</h3>
        <p class="dish-description">${dish.description}</p>
        <div class="dish-footer">
          <span class="dish-price">${dish.price.toFixed(2)} €</span>
          <button class="dish-order-btn" data-dish-name="${
            dish.name
          }" data-dish-price="${dish.price}">
            Order
          </button>
        </div>
      </div>
    </div>
  `;
};
