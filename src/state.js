/**
 * @fileoverview Central application state management for Super Rando.
 * @description This module defines the central state object for the Super Rando application,
 * including user preferences, cart items, dish data, and session management.
 * It also provides functions to manipulate and retrieve state data.
 * @module state
 */

/**
 * Central application state
 * @type {Object}
 */
const appState = {
  currentPage: "home",
  cart: [],
  cartVisible: false,
  selectedCategory: "all",
  notifications: [],

  userPreferences: {
    theme: "default",
    language: "en",
    showNotifications: true,
    cartAutoClose: false,
  },

  listeners: [],

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
    name: "Fusion Daily Menu",
    price: 18.5,
    badge: "🍽️ Daily Menu",
    description:
      "Our popular 3-course menu: Ramen Fusion Bowl, Gyoza Salad and your choice of dessert",
    tags: ["menu", "fusion", "special"],
    items: [
      {
        image: "./assets/images/Ramen-01.jpg",
        name: "Ramen Fusion Bowl",
        description:
          "Homemade ramen noodles with grilled chicken, shiitake mushrooms and miso broth",
      },
      {
        image: "./assets/images/Gyoza-Salat-01.jpg",
        name: "Gyoza Salad",
        description:
          "Crispy gyoza on mixed salad with homemade sesame-ginger dressing",
      },
    ],
    dessertOptions: [
      {
        id: "matchaTiramisu",
        value: "matcha",
        image: "./assets/images/Matcha Tiramisu-01.jpg",
        name: "Matcha Tiramisu",
        description: "Italian tiramisu with Japanese matcha twist",
      },
      {
        id: "mochiEis",
        value: "mochi",
        image: "./assets/images/Mochi-Eis-01.png",
        name: "Mochi Ice Cream Variation",
        description:
          "3 different mochi ice cream varieties: Vanilla, Strawberry, Green Tea",
      },
    ],
  },

  popularDish: {
    name: "Spaghetti Carbonara Fusion",
    price: 10.0,
    badge: "⭐ Our Most Popular",
    description:
      "Our modern interpretation of the Italian classic: Handmade spaghetti with creamy egg-parmesan sauce, crispy pancetta and a hint of yuzu citrus. A perfect example of our fusion philosophy.",
    image: "./assets/images/Spagetti-01.jpg",
    tags: ["popular", "fusion", "pasta", "meat"],
    features: [
      { icon: "🌟", text: "Most Ordered" },
      { icon: "👨‍🍳", text: "Chef's Special" },
      { icon: "🔥", text: "Freshly Prepared" },
    ],
  },

  categories: [
    { id: "all", name: "All", icon: "🍽️", count: 0 },
    { id: "pizza", name: "Pizza", icon: "🍕", count: 0 },
    { id: "pasta", name: "Pasta", icon: "🍝", count: 0 },
    { id: "salate", name: "Salads", icon: "🥗", count: 0 },
    { id: "desserts", name: "Desserts", icon: "🍰", count: 0 },
  ],
};

/**
 * Notifies all listeners about state changes.
 * The "listener" parameter refers to the function to be called.
 */
const notifyListeners = () => {
  appState.listeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.error("Error notifying listeners:", error);
    }
  });
};

/**
 * Loads the cart from LocalStorage.
 */
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("superRandoCart");
    if (savedCart) {
      appState.cart = JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Error loading cart:", error);
  }
};

/**
 * Saves the cart to LocalStorage.
 */
const saveCartToStorage = () => {
  try {
    localStorage.setItem("superRandoCart", JSON.stringify(appState.cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

/**
 * Loads all user preferences from LocalStorage.
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
    console.error("Error loading user preferences:", error);
  }
};

/**
 * Saves all user preferences to LocalStorage.
 */
const saveUserPreferences = () => {
  try {
    localStorage.setItem(
      "superRandoPreferences",
      JSON.stringify(appState.userPreferences)
    );
  } catch (error) {
    console.error("Error saving user preferences:", error);
  }
};

/**
 * Checks if a page is valid (for session restore).
 * @param {string} page - Page name
 * @returns {boolean} Is valid
 */
const isValidPage = (page) => {
  const validPages = [
    "home",
    "products",
    "contact",
    "imprint",
    "dataProtection",
  ];
  return validPages.includes(page);
};

/**
 * Loads session data from LocalStorage.
 */
const loadSessionFromStorage = () => {
  try {
    const savedSession = localStorage.getItem("superRandoSession");
    if (savedSession) {
      const session = JSON.parse(savedSession);

      if (session.lastPage && isValidPage(session.lastPage)) {
        appState.currentPage = session.lastPage;
      }

      if (session.selectedCategory) {
        appState.selectedCategory = session.selectedCategory;
      }

      notifyListeners();
    }
  } catch (error) {
    console.error("Error loading session:", error);
  }
};

/**
 * Saves session data to LocalStorage.
 */
const saveSessionToStorage = () => {
  try {
    const sessionData = {
      lastPage: getCurrentPage(),
      selectedCategory: getSelectedCategory(),
      timestamp: Date.now(),
    };
    localStorage.setItem("superRandoSession", JSON.stringify(sessionData));
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

/**
 * Loads all stored data at app start.
 */
const loadAllStoredData = () => {
  loadCartFromStorage();
  loadUserPreferences();
  loadSessionFromStorage();
  saveUserPreferences();
};

/**
 * Returns a copy of the cart items.
 * @returns {Array} Copy of cart items
 */
export const getCartItems = () => [...appState.cart];

/**
 * Checks if the cart is empty.
 * @returns {boolean} Is cart empty
 */
export const isCartEmpty = () => appState.cart.length === 0;

/**
 * Calculates the total amount of the cart.
 * @returns {number} Total amount
 */
export const getCartTotal = () =>
  appState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

/**
 * Returns the total number of items in the cart.
 * @returns {number} Item count
 */
export const getCartItemCount = () =>
  appState.cart.reduce((sum, item) => sum + item.quantity, 0);

/**
 * Returns the cart visibility status.
 * @returns {boolean} Is cart visible
 */
export const isCartVisible = () => appState.cartVisible;

/**
 * Returns a copy of the categories.
 * @returns {Array} Copy of categories
 */
export const getCategories = () => [...appState.categories];

/**
 * Returns the selected category.
 * @returns {string} Selected category
 */
export const getSelectedCategory = () => appState.selectedCategory;

/**
 * Returns a copy of the dishes.
 * @returns {Array} Copy of dishes
 */
export const getDishes = () => [...appState.dishes];

/**
 * Returns the menu bundle.
 * @returns {Object} Menu bundle
 */
export const getMenuBundle = () => ({ ...appState.menuBundle });

/**
 * Returns the popular dish.
 * @returns {Object} Popular dish
 */
export const getPopularDish = () => ({ ...appState.popularDish });

/**
 * Returns a copy of the notifications.
 * @returns {Array} Copy of notifications
 */
export const getNotifications = () => [...appState.notifications];

/**
 * Returns the user preferences.
 * @returns {Object} User preferences
 */
export const getUserPreferences = () => ({ ...appState.userPreferences });

/**
 * Returns the current page.
 * @returns {string} Current page
 */
export const getCurrentPage = () => appState.currentPage;

/**
 * Sets the current page.
 * @param {string} page - Page name
 */
export const setCurrentPage = (page) => {
  if (appState.currentPage !== page) {
    appState.currentPage = page;
    notifyListeners();
  }
};

/**
 * Adds an item to the cart.
 * @param {Object} item - Cart item
 */
export const addCartItem = (item) => {
  appState.cart = [...appState.cart, item];
  notifyListeners();
};

/**
 * Updates a cart item.
 * @param {string} itemName - Name of the item
 * @param {Object} updates - Item updates
 */
export const updateCartItem = (itemName, updates) => {
  appState.cart = appState.cart.map((item) =>
    item.name === itemName ? { ...item, ...updates } : item
  );
  notifyListeners();
};

/**
 * Removes an item from the cart.
 * @param {string} itemName - Name of the item to remove
 */
export const removeCartItem = (itemName) => {
  appState.cart = appState.cart.filter((item) => item.name !== itemName);
  notifyListeners();
};

/**
 * Sets the cart visibility status and triggers scroll management.
 * @param {boolean} visible - Should the cart be visible
 */
const setCartVisible = (visible) => {
  appState.cartVisible = visible;
  notifyListeners();
};

/**
 * Sets the cart.
 * @param {Array} cartItems - New cart items
 */
export const setCart = (cartItems) => {
  appState.cart = [...cartItems];
  notifyListeners();
};

/**
 * Sets the selected category.
 * @param {string} categoryId - Category ID
 */
export const setSelectedCategory = (categoryId) => {
  if (appState.selectedCategory !== categoryId) {
    appState.selectedCategory = categoryId;
    saveSessionToStorage();
    notifyListeners();
  }
};

/**
 * Sets user preferences.
 * @param {Object} preferences - New preferences
 */
export const setUserPreferences = (preferences) => {
  appState.userPreferences = {
    ...appState.userPreferences,
    ...preferences,
  };
  notifyListeners();
};

/**
 * Adds a notification.
 * @param {Object} notification - Notification object
 */
export const addNotification = (notification) => {
  appState.notifications = [...appState.notifications, notification];
  notifyListeners();
};

/**
 * Removes a notification.
 * @param {number} notificationId - ID of the notification to remove
 */
export const removeNotification = (notificationId) => {
  appState.notifications = appState.notifications.filter(
    (notification) => notification.id !== notificationId
  );
  notifyListeners();
};

/**
 * Exports the central application state and relevant functions.
 */
export {
  appState,
  loadCartFromStorage,
  saveCartToStorage,
  loadUserPreferences,
  saveUserPreferences,
  saveSessionToStorage,
  loadAllStoredData,
  notifyListeners,
  setCartVisible,
};
