/** @type {Object} Zentraler Anwendungszustand */
const appState = {
  currentPage: "home",
  cart: [],
  cartVisible: false,
  selectedCategory: "all",
  notifications: [],
  dishes: [
    {
      name: "Pizza Margherita",
      price: 8.5,
      description:
        "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.",
      image: "./assets/images/Pizza-01.jpg",
      tags: ["pizza", "vegetarian", "italian"],
    },
    {
      name: "Pizza Salami",
      price: 9.0,
      description:
        "Delicious pizza topped with spicy salami, mozzarella cheese, and tomato sauce.",
      image: "./assets/images/Pizza-02.jpg",
      tags: ["pizza", "meat", "italian"],
    },
    {
      name: "Pizza Funghi",
      price: 9.5,
      description:
        "Savory pizza with mushrooms, mozzarella cheese, and a hint of garlic.",
      image: "./assets/images/Pizza-03.jpg",
      tags: ["pizza", "vegetarian", "italian"],
    },
    {
      name: "Spaghetti Carbonara",
      price: 10.0,
      description:
        "Traditional Roman pasta dish with eggs, cheese, pancetta, and pepper.",
      image: "./assets/images/Spagetti-01.jpg",
      tags: ["pasta", "meat", "italian"],
    },
    {
      name: "Spaghetti Bolognese",
      price: 10.5,
      description:
        "Hearty spaghetti with a rich meat sauce made from ground beef and tomatoes.",
      image: "./assets/images/Spagetti-02.jpg",
      tags: ["pasta", "meat", "italian"],
    },
    {
      name: "Caesar Salad",
      price: 7.0,
      description:
        "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
      image: "./assets/images/Salat-01.jpg",
      tags: ["salate", "vegetarian", "fresh"],
    },
    {
      name: "Tiramisu",
      price: 5.5,
      description:
        "A classic Italian dessert made with coffee-soaked ladyfingers and mascarpone cheese.",
      image: "./assets/images/Tiramisu-01.jpg",
      tags: ["desserts", "sweet", "italian"],
    },
  ],
  menuBundle: {
    name: "Fusion Tagesmenü",
    price: 18.5,
    savings: 3.5,
    badge: "🍽️ Tagesmenü",
    description:
      "Unser beliebtes 3-Gang-Menü: Ramen Fusion Bowl, Gyoza-Salat und Ihr Wunsch-Dessert",
    tags: ["menu", "fusion", "special"],
    items: [
      {
        icon: "🍜",
        name: "Ramen Fusion Bowl",
        description:
          "Hausgemachte Ramen-Nudeln mit gebratenem Hühnchen, Shiitake-Pilzen und Miso-Brühe",
      },
      {
        icon: "🥗",
        name: "Gyoza-Salat",
        description:
          "Knusprige Gyoza auf gemischtem Salat mit hausgemachtem Sesam-Ingwer-Dressing",
      },
    ],
    dessertOptions: [
      {
        id: "matchaTiramisu",
        value: "matcha",
        name: "Matcha Tiramisu",
        description: "Italienisches Tiramisu mit japanischem Matcha-Twist",
      },
      {
        id: "mochiEis",
        value: "mochi",
        name: "Mochi Eis Variation",
        description:
          "3 verschiedene Mochi-Eis-Sorten: Vanille, Erdbeere, Grüner Tee",
      },
    ],
  },
  popularDish: {
    name: "Spaghetti Carbonara Fusion",
    price: 10.0,
    badge: "⭐ Unser Beliebtestes",
    description:
      "Unsere moderne Interpretation des italienischen Klassikers: Handgemachte Spaghetti mit cremiger Eier-Parmesan-Sauce, knusprigem Pancetta und einem Hauch von Yuzu-Zitrus. Ein perfektes Beispiel für unsere Fusion-Philosophie.",
    image: "./assets/images/Spagetti-01.jpg",
    tags: ["popular", "fusion", "pasta", "meat"],
    features: [
      { icon: "🌟", text: "Meist bestellt" },
      { icon: "👨‍🍳", text: "Chef's Special" },
      { icon: "🔥", text: "Frisch zubereitet" },
    ],
  },
  categories: [
    { id: "all", name: "Alle", icon: "🍽️", count: 0 },
    { id: "pizza", name: "Pizza", icon: "🍕", count: 0 },
    { id: "pasta", name: "Pasta", icon: "🍝", count: 0 },
    { id: "salate", name: "Salate", icon: "🥗", count: 0 },
    { id: "desserts", name: "Desserts", icon: "🍰", count: 0 },
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
