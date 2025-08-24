import { appState } from "../../state.js";

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
  return `
    <section class="product-categories">
      ${createCategoryCard("🍕", "Pizza", "Steinofen-Pizza")}
      ${createCategoryCard("🍝", "Pasta", "Hausgemachte Nudeln")}
      ${createCategoryCard("🥗", "Salate", "Frische Salate")}
      ${createCategoryCard("🍰", "Desserts", "Süße Verführungen")}
    </section>
  `;
};

/**
 * Erstellt eine Kategorie-Karte
 * @param {string} emoji - Kategorie-Emoji
 * @param {string} title - Kategorie-Titel
 * @param {string} description - Kategorie-Beschreibung
 * @returns {string} HTML-String für Kategorie-Karte
 */
const createCategoryCard = (emoji, title, description) => {
  return `
    <div class="category-card" data-category="${title.toLowerCase()}">
      <div class="category-icon">${emoji}</div>
      <h3 class="category-title">${title}</h3>
      <p class="category-description">${description}</p>
    </div>
  `;
};

/**
 * Erstellt die Gerichte-Sektion
 * @returns {string} HTML-String für Gerichte-Sektion
 */
const createDishesSection = () => {
  return `
    <section class="dishes-section">
      <div class="dishes-grid">
        ${appState.dishes.map((dish) => createDishCard(dish)).join("")}
      </div>
    </section>
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
