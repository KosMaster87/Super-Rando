import { getCategories, getSelectedCategory } from "../../state.js";
import { getFilteredDishes } from "../../services/category-filter.js";

/**
 * Rendert die Products-Seite
 * @returns {string} HTML-String für Products-Seite
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
 * Erstellt den Products-Header
 * @returns {string} HTML-String für Products-Header
 */
const createProductsHeader = () => {
  return `
    <div class="products-header">
      <h1 class="page-title">Unsere Produktkategorien</h1>
      <p class="page-subtitle">Entdecken Sie unsere vielfältige Fusion-Küche</p>
    </div>
  `;
};

/**
 * Erstellt die Produktkategorien
 * @returns {string} HTML-String für Kategorien
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
 * Erstellt eine Kategorie-Karte
 * @param {Object} category - Kategorie-Objekt
 * @returns {string} HTML-String für Kategorie-Karte
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
      <p class="category-description">${category.count} Gerichte</p>
    </div>
  `;
};

/**
 * Erstellt die Gerichte-Sektion
 * @returns {string} HTML-String für Gerichte-Sektion
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
              ? "Alle Spezialitäten"
              : getCategoryDisplayName()
          }
        </h2>
        <p class="dishes-subtitle">${
          filteredDishes.length
        } Gerichte gefunden</p>
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
 * Gibt den Anzeigenamen der aktuellen Kategorie zurück
 * @returns {string} Kategorie-Anzeigename
 */
const getCategoryDisplayName = () => {
  const categories = getCategories();
  const selectedCategory = getSelectedCategory();
  const category = categories.find((cat) => cat.id === selectedCategory);
  return category ? category.name : "Alle Spezialitäten";
};

/**
 * Erstellt den Empty State für keine Gerichte
 * @returns {string} HTML-String für Empty State
 */
const createEmptyState = () => {
  return `
    <div class="dishes-empty">
      <div class="empty-icon">🍽️</div>
      <h3 class="empty-title">Keine Gerichte gefunden</h3>
      <p class="empty-description">In dieser Kategorie sind momentan keine Gerichte verfügbar.</p>
    </div>
  `;
};

/**
 * Erstellt eine Gericht-Karte
 * @param {Object} dish - Gericht-Objekt
 * @returns {string} HTML-String für Gericht-Karte
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
            Bestellen
          </button>
        </div>
      </div>
    </div>
  `;
};
