/** @type {Object} Zentraler Anwendungszustand */
const appState = {
  currentPage: "home",
  cart: [],
  dishes: [
    {
      name: "Pizza Margherita",
      price: 8.5,
      description:
        "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.",
      image: "./assets/images/Pizza-01.jpg",
    },
    {
      name: "Pizza Salami",
      price: 9.0,
      description:
        "Delicious pizza topped with spicy salami, mozzarella cheese, and tomato sauce.",
      image: "./assets/images/Pizza-02.jpg",
    },
    {
      name: "Pizza Funghi",
      price: 9.5,
      description:
        "Savory pizza with mushrooms, mozzarella cheese, and a hint of garlic.",
      image: "./assets/images/Pizza-03.jpg",
    },
    {
      name: "Spaghetti Carbonara",
      price: 10.0,
      description:
        "Traditional Roman pasta dish with eggs, cheese, pancetta, and pepper.",
      image: "./assets/images/Spagetti-01.jpg",
    },
    {
      name: "Spaghetti Bolognese",
      price: 10.5,
      description:
        "Hearty spaghetti with a rich meat sauce made from ground beef and tomatoes.",
      image: "./assets/images/Spagetti-02.jpg",
    },
    {
      name: "Caesar Salad",
      price: 7.0,
      description:
        "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
      image: "./assets/images/Salat-01.jpg",
    },
    {
      name: "Tiramisu",
      price: 5.5,
      description:
        "A classic Italian dessert made with coffee-soaked ladyfingers and mascarpone cheese.",
      image: "./assets/images/Tiramisu-01.jpg",
    },
  ],
  listeners: [],
};

/**
 * Lädt den Warenkorb aus dem LocalStorage
 */
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("superRandoCart");
    if (savedCart) {
      appState.cart = JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Fehler beim Laden des Warenkorbs:", error);
  }
};

/**
 * Speichert den Warenkorb im LocalStorage
 */
const saveCartToStorage = () => {
  try {
    localStorage.setItem("superRandoCart", JSON.stringify(appState.cart));
  } catch (error) {
    console.error("Fehler beim Speichern des Warenkorbs:", error);
  }
};

/**
 * Benachrichtigt alle Listener über State-Änderungen
 */
const notifyListeners = () => {
  appState.listeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.error("Fehler beim Benachrichtigen der Listener:", error);
    }
  });
};

export { appState, loadCartFromStorage, saveCartToStorage, notifyListeners };
