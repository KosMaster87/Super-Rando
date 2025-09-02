/** @type {Object} Zentraler Anwendungszustand */
const appState = {
  currentPage: "home",
  cart: [],
  cartVisible: false,
  selectedCategory: "all",
  notifications: [],

  // UI-Preferences für erweiterte Features
  userPreferences: {
    theme: "default", // "default", "dark", "light"
    layout: "standard", // "standard", "compact", "wide"
    language: "de", // "de", "en"
    showNotifications: true,
    cartAutoClose: false,
  },

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
        image: "./assets/images/Ramen-01.jpg",
        name: "Ramen Fusion Bowl",
        description:
          "Hausgemachte Ramen-Nudeln mit gebratenem Hühnchen, Shiitake-Pilzen und Miso-Brühe",
      },
      {
        image: "./assets/images/Gyoza-Salat-01.jpg",
        name: "Gyoza-Salat",
        description:
          "Knusprige Gyoza auf gemischtem Salat mit hausgemachtem Sesam-Ingwer-Dressing",
      },
    ],
    dessertOptions: [
      {
        id: "matchaTiramisu",
        value: "matcha",
        image: "./assets/images/Matcha Tiramisu-01.jpg",
        name: "Matcha Tiramisu",
        description: "Italienisches Tiramisu mit japanischem Matcha-Twist",
      },
      {
        id: "mochiEis",
        value: "mochi",
        image: "./assets/images/Mochi-Eis-01.png",
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
 * Benachrichtigt alle Listener über State-Änderungen
 * Der "listener" Parameter stellt hier den aufruf der jeweiligen Listener-Funktion dar.
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

// ---------------------------------

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

// ---------------------------------

/**
 * Lädt alle User-Preferences aus dem LocalStorage
 */
const loadUserPreferences = () => {
  try {
    const savedPrefs = localStorage.getItem("superRandoPreferences");
    if (savedPrefs) {
      const preferences = JSON.parse(savedPrefs);
      appState.userPreferences = {
        ...appState.userPreferences,
        ...preferences,
      };
    }
  } catch (error) {
    console.error("Fehler beim Laden der User-Preferences:", error);
  }
};

/**
 * Speichert alle User-Preferences im LocalStorage
 */
const saveUserPreferences = () => {
  try {
    localStorage.setItem(
      "superRandoPreferences",
      JSON.stringify(appState.userPreferences)
    );
  } catch (error) {
    console.error("Fehler beim Speichern der User-Preferences:", error);
  }
};

// ---------------------------------

/**
 * Prüft ob Seite gültig ist (für Session-Wiederherstellung)
 * @param {string} page - Seitenname
 * @returns {boolean} Ist gültig
 */
const isValidPage = (page) => {
  const validPages = [
    "home",
    "products",
    "contact",
    "about",
    "impressum",
    "datenschutz",
    "kontaktformular",
  ];
  return validPages.includes(page);
};

/**
 * Lädt die Session-Daten aus dem LocalStorage
 */
const loadSessionFromStorage = () => {
  try {
    const savedSession = localStorage.getItem("superRandoSession");
    if (savedSession) {
      const session = JSON.parse(savedSession);

      // Wiederherstellen der letzten Seite
      if (session.lastPage && isValidPage(session.lastPage)) {
        appState.currentPage = session.lastPage;
      }

      // Wiederherstellen der Kategorie-Auswahl
      if (session.selectedCategory) {
        appState.selectedCategory = session.selectedCategory;
      }

      console.log("Session wiederhergestellt:", {
        page: appState.currentPage,
        category: appState.selectedCategory,
      });
    }
  } catch (error) {
    console.error("Fehler beim Laden der Session:", error);
  }
};

/**
 * Speichert die Session-Daten im LocalStorage
 */
const saveSessionToStorage = () => {
  try {
    const sessionData = {
      lastPage: appState.currentPage,
      selectedCategory: appState.selectedCategory,
      timestamp: Date.now(),
    };
    localStorage.setItem("superRandoSession", JSON.stringify(sessionData));
    console.log("Session gespeichert:", sessionData); // Debug-Log
  } catch (error) {
    console.error("Fehler beim Speichern der Session:", error);
  }
};

/**
 * Lädt alle gespeicherten Daten beim App-Start
 */
const loadAllStoredData = () => {
  loadCartFromStorage();
  loadUserPreferences();
  loadSessionFromStorage(); // ← Session-Wiederherstellung

  // Sofort einmal speichern um LocalStorage zu initialisieren
  saveUserPreferences();
};

export {
  appState,
  loadCartFromStorage,
  saveCartToStorage,
  loadUserPreferences,
  saveUserPreferences,
  saveSessionToStorage,
  loadAllStoredData,
  notifyListeners,
};
