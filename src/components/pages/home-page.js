/**
 * @fileoverview Renders the Home page of the Super~Rando SPA.
 * @description This module exports a function that generates the HTML structure
 * for the Home page, including daily specials and the popular dish section.
 * @module components/pages/home-page
 */

import { getMenuBundle, getPopularDish } from "../../state.js";

/**
 * Renders the Home page.
 * @returns {string} HTML string for the Home page
 */
export const renderHomePage = () => {
  return `
    <section class="welcome-content">
      <h1 class="page-title">Welcome to Super~Rando</h1>
      <p class="page-subtitle">Discover our fusion cuisine</p>

      ${createDailySpecials()}
      ${createPopularDish()}
    </section>
  `;
};

/**
 * Creates the daily specials section.
 * @returns {string} HTML string for daily specials
 */
const createDailySpecials = () => {
  return `
    <section class="daily-specials">
      ${createMenuBundle()}
    </section>
  `;
};

/**
 * Creates the daily menu bundle section.
 * @returns {string} HTML string for the menu bundle
 */
const createMenuBundle = () => {
  const menu = getMenuBundle();

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
        <button class="menu-order-btn" id="orderMenuBundle" disabled>
          Order ${menu.name}
        </button>
      </div>
    </div>
  `;
};

/**
 * Creates a menu item.
 * @param {Object} item - Menu item object
 * @returns {string} HTML string for a menu item
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
 * Creates the dessert selection section.
 * @returns {string} HTML string for dessert selection
 */
const createDessertSelectionItem = () => {
  const menuBundle = getMenuBundle();
  const desserts = menuBundle.dessertOptions;

  return `
    <div class="menu-item dessert-selection">
      <div class="menu-item-content">
        <h4 class="menu-item-name">Choose your dessert</h4>
        <div class="dessert-options">
          ${desserts.map((dessert) => createDessertOption(dessert)).join("")}
        </div>
      </div>
    </div>
  `;
};

/**
 * Creates a dessert option.
 * @param {Object} dessert - Dessert object
 * @returns {string} HTML string for a dessert option
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
 * Creates the popular dish section.
 * @returns {string} HTML string for the popular dish
 */
const createPopularDish = () => {
  const dish = getPopularDish();

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
              Try now!
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
};

/**
 * Creates a feature tag.
 * @param {Object} feature - Feature object
 * @returns {string} HTML string for a feature
 */
const createFeature = (feature) => {
  return `<span class="feature">${feature.icon} ${feature.text}</span>`;
};
