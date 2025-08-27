##

## 🔄 Der komplette Lifecycle:

```js
// 1. App-Start
initializeApp();
├── loadCartFromStorage();
├── initializeCategorySystem();
├── initializeNavigation();
├── registerStateListeners();         // ← Listener registrieren
└── renderAllComponents();            // ← Erstes Rendering + Event-Setup

// 2. User-Interaktion
user.click("Add to Cart");
├── addToCart();
├── notifyListeners();                // ← State-Change-Event
└── renderAllComponents();            // ← Re-Render + Event-Refresh
└── setupComponentEventListeners();   // ← Events neu setzen

// 3. UI ist wieder funktional!
```

## 🔄 Kompletter Navigation-Flow:

```js
/**
 * App verhält sich wie eine Multi-Page-Website, läuft aber komplett client-seitig ohne Server-Requests für Navigation.
 */

// navigation.js - Navigation zu neuer Seite
export const navigateToPage = (page) => {
  appState.currentPage = page; // State ändern
  window.history.pushState({ page }, "", `/${page}`); // URL + History
  updateDocumentTitle(page); // Tab-Titel
  notifyListeners(); // UI-Update
};

// Browser-Navigation abfangen
window.addEventListener("popstate", (event) => {
  const page = event.state?.page || extractPageFromURL(); // Seite ermitteln
  appState.currentPage = page; // State synchronisieren
  notifyListeners(); // UI neu rendern
});
```

## next
