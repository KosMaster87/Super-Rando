import { addToCart } from "./cart.js";
import { getMenuBundle, getPopularDish } from "../state.js";
import { initializeCategoryEvents } from "./category-events.js";

/**
 * Initializes all dish event listeners.
 * Sets up events for menu bundle, popular dish, products page, and category events.
 */
export const initializeDishEvents = () => {
  setupMenuBundleEvents();
  setupPopularDishEvents();
  setupProductsPageDishEvents();
  initializeCategoryEvents();
};

/**
 * Sets up event listeners for the menu bundle order button and dessert selection.
 */
const setupMenuBundleEvents = () => {
  const menuOrderBtn = document.getElementById("orderMenuBundle");
  const dessertRadios = document.querySelectorAll('input[name="menuDessert"]');

  dessertRadios.forEach((radio) => {
    radio.onchange = () => {
      if (menuOrderBtn) {
        menuOrderBtn.disabled = false;
      }
    };
  });

  if (menuOrderBtn) {
    menuOrderBtn.onclick = () => handleMenuBundleOrder();
  }
};

/**
 * Handles ordering the menu bundle and adds it to the cart.
 */
const handleMenuBundleOrder = () => {
  const selectedDessert = document.querySelector(
    'input[name="menuDessert"]:checked'
  );

  const menuBundle = getMenuBundle();
  const dessertOption = menuBundle.dessertOptions.find(
    (option) => option.value === selectedDessert.value
  );

  const menuName = `${menuBundle.name} (mit ${dessertOption.name})`;
  const menuPrice = menuBundle.price;

  addToCart(menuName, menuPrice);

  selectedDessert.checked = false;
  const orderBtn = document.getElementById("orderMenuBundle");
  if (orderBtn) {
    orderBtn.disabled = true;
  }
};

/**
 * Sets up event listener for ordering the popular dish.
 */
const setupPopularDishEvents = () => {
  const carbonaraBtn = document.getElementById("orderCarbonara");

  if (carbonaraBtn) {
    const popularDish = getPopularDish();
    carbonaraBtn.onclick = () => addToCart(popularDish.name, popularDish.price);
  }
};

/**
 * Sets up event listeners for ordering dishes on the products page.
 */
const setupProductsPageDishEvents = () => {
  const dishButtons = document.querySelectorAll(".dish-order-btn");

  dishButtons.forEach((button) => {
    const dishName = button.dataset.dishName;
    const dishPrice = parseFloat(button.dataset.dishPrice);

    if (dishName && dishPrice) {
      button.onclick = () => addToCart(dishName, dishPrice);
    }
  });
};
