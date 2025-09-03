import { appState } from "../../state.js";

/**
 * Rendert die Home-Seite
 * @returns {string} HTML-String für Home-Seite
 */
export const renderHomePage = () => {
  return `
    <section class="welcome-content">
      <h1 class="page-title">Willkommen bei Super~Rando</h1>
      <p class="page-subtitle">Entdecken Sie unsere Fusion-Küche</p>

      ${createDailySpecials()}
      ${createPopularDish()}
    </section>
  `;
};

/**
 * Erstellt die Tagesspecials-Sektion
 * @returns {string} HTML-String für Tagesspecials
 */
const createDailySpecials = () => {
  return `
    <section class="daily-specials">
      ${createMenuBundle()}
    </section>
  `;
};

/**
 * Erstellt das Tagesmenü-Bundle
 * @returns {string} HTML-String für Menü-Bundle
 */
const createMenuBundle = () => {
  const menu = appState.menuBundle;

  return `
    <div class="menu-bundle">
      <h3 class="special-title">${menu.name}</h3>
      <p class="special-description">${menu.description}</p>
      
      <div class="menu-items">
        ${menu.items.map((item) => createMenuItem(item)).join("")}
        ${createDessertSelectionItem()}
      </div>
      
      <div class="menu-footer">
        <div class="menu-price">${menu.price.toFixed(2)} €</div>
        <p class="menu-savings">Sie sparen ${menu.savings.toFixed(
          2
        )} € gegenüber Einzelbestellung!</p>
        <button class="special-order-btn menu-order-btn" id="orderMenuBundle" disabled>
          ${menu.name} bestellen
        </button>
      </div>
    </div>
  `;
};

/**
 * Erstellt ein Menü-Item
 * @param {Object} item - Menü-Item Objekt
 * @returns {string} HTML-String für Menü-Item
 */
const createMenuItem = (item) => {
  return `
    <div class="menu-item">
      <div class="menu-item-image">
        <img class="dish-image" src="${item.image}" alt="${item.name}" />
      </div>
      <div class="menu-item-content">
        <h4 class="menu-item-name">${item.name}</h4>
        <p class="menu-item-desc">${item.description}</p>
      </div>
    </div>
    <div class="menu-item-plus">
      <span>➕</span>
    </div>

  `;
};

/**
 * Erstellt die Dessert-Auswahl
 * @returns {string} HTML-String für Dessert-Auswahl
 */
const createDessertSelectionItem = () => {
  const desserts = appState.menuBundle.dessertOptions;

  return `
    <div class="menu-item dessert-selection">
      <div class="menu-item-content">
        <h4 class="menu-item-name">Wählen Sie Ihren Nachgang</h4>
        <div class="dessert-options">
          ${desserts.map((dessert) => createDessertOption(dessert)).join("")}
        </div>
      </div>
    </div>
  `;
};

/**
 * Erstellt eine Dessert-Option
 * @param {Object} dessert - Dessert-Objekt
 * @returns {string} HTML-String für Dessert-Option
 */
const createDessertOption = (dessert) => {
  return `
    <div class="dessert-option">
      <input type="radio" id="${dessert.id}" name="menuDessert" value="${dessert.value}" />
      <label for="${dessert.id}" class="dessert-card">
        <div class="menu-item-image">
          <img class="dish-image" src="${dessert.image}" alt="${dessert.name}" />
        </div>
        <span class="dessert-name">${dessert.name}</span>
        <span class="dessert-desc">${dessert.description}</span>
      </label>
    </div>
  `;
};

/**
 * Erstellt das beliebte Gericht
 * @returns {string} HTML-String für beliebtes Gericht
 */
const createPopularDish = () => {
  const dish = appState.popularDish;

  return `
    <section class="popular-dish">
      <div class="special-badge">${dish.badge}</div>
      <div class="popular-dish-content">
        <div class="popular-dish-image">
          <img src="${dish.image}" alt="${dish.name}" />
        </div>
        <div class="popular-dish-info">
          <h3 class="popular-title">${dish.name}</h3>
          <p class="popular-description">${dish.description}</p>
          <div class="popular-features">
            ${dish.features.map((feature) => createFeature(feature)).join("")}
          </div>
          <div class="popular-footer">
            <div class="popular-price">${dish.price.toFixed(2)} €</div>
            <button class="popular-order-btn" id="orderCarbonara">
              Jetzt probieren!
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
};

/**
 * Erstellt ein Feature-Tag
 * @param {Object} feature - Feature-Objekt
 * @returns {string} HTML-String für Feature
 */
const createFeature = (feature) => {
  return `<span class="feature">${feature.icon} ${feature.text}</span>`;
};
