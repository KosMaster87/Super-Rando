import { addToCart } from "./cart.js";
import { getMenuBundle, getPopularDish } from "../state.js";
import { initializeCategoryEvents } from "./category-events.js";

/**
 * Initialisiert alle Dish-Event-Listener
 */
export const initializeDishEvents = () => {
  setupMenuBundleEvents();
  setupPopularDishEvents();
  setupProductsPageDishEvents();
  initializeCategoryEvents();
};

/**
 * Setzt Event-Listener für Menü-Bundle
 */
const setupMenuBundleEvents = () => {
  const menuOrderBtn = document.getElementById("orderMenuBundle");
  const dessertRadios = document.querySelectorAll('input[name="menuDessert"]');

  // Dessert-Auswahl aktiviert Bestell-Button
  dessertRadios.forEach((radio) => {
    radio.onchange = () => {
      if (menuOrderBtn) {
        menuOrderBtn.disabled = false;
      }
    };
  });

  // Menü-Bestellung
  if (menuOrderBtn) {
    menuOrderBtn.onclick = () => handleMenuBundleOrder();
  }
};

/**
 * Behandelt Menü-Bundle-Bestellung
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

  // Reset selection
  selectedDessert.checked = false;
  const orderBtn = document.getElementById("orderMenuBundle");
  if (orderBtn) {
    orderBtn.disabled = true;
  }
};

/**
 * Setzt Event-Listener für Popular Dish
 */
const setupPopularDishEvents = () => {
  const carbonaraBtn = document.getElementById("orderCarbonara");

  if (carbonaraBtn) {
    const popularDish = getPopularDish();
    carbonaraBtn.onclick = () => addToCart(popularDish.name, popularDish.price);
  }
};

/**
 * Setzt Event-Listener für Products-Page Gerichte
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
