import { addToCart } from "./cart.js";

/**
 * Initialisiert alle Dish-Event-Listener
 */
export const initializeDishEvents = () => {
  setupHomePageDishEvents();
  setupProductsPageDishEvents();
  setupDessertSelection();
};

/**
 * Setzt Event-Listener für Home-Page Gerichte
 */
const setupHomePageDishEvents = () => {
  // Tagesspecials Buttons
  const ramenBtn = document.getElementById("orderRamenBowl");
  const gyozaBtn = document.getElementById("orderGyozaSalad");
  const carbonaraBtn = document.getElementById("orderCarbonara");
  const dessertBtn = document.getElementById("orderDessert");

  if (ramenBtn) {
    ramenBtn.onclick = () => addToCart("Ramen Fusion Bowl", 12.5);
  }

  if (gyozaBtn) {
    gyozaBtn.onclick = () => addToCart("Gyoza-Salat", 6.5);
  }

  if (carbonaraBtn) {
    carbonaraBtn.onclick = () => addToCart("Spaghetti Carbonara Fusion", 10.0);
  }

  if (dessertBtn) {
    dessertBtn.onclick = () => handleDessertOrder();
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

/**
 * Setzt Event-Listener für Dessert-Auswahl
 */
const setupDessertSelection = () => {
  const dessertRadios = document.querySelectorAll('input[name="dessert"]');
  const orderBtn = document.getElementById("orderDessert");

  dessertRadios.forEach((radio) => {
    radio.onchange = () => {
      if (orderBtn) {
        orderBtn.disabled = false;
      }
    };
  });
};

/**
 * Behandelt Dessert-Bestellung
 */
const handleDessertOrder = () => {
  const selectedDessert = document.querySelector(
    'input[name="dessert"]:checked'
  );

  if (!selectedDessert) {
    alert("Bitte wählen Sie einen Nachgang aus.");
    return;
  }

  const dessertName =
    selectedDessert.value === "matcha"
      ? "Matcha Tiramisu"
      : "Mochi Eis Variation";

  const dessertPrice = selectedDessert.value === "matcha" ? 5.5 : 6.0;

  addToCart(dessertName, dessertPrice);

  // Reset selection
  selectedDessert.checked = false;
  const orderBtn = document.getElementById("orderDessert");
  if (orderBtn) {
    orderBtn.disabled = true;
  }
};
