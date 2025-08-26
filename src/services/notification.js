import { appState, notifyListeners } from "../state.js";

/**
 * Erstellt eine neue Benachrichtigung
 * @param {string} message - Benachrichtigungstext
 * @param {string} type - Benachrichtigungstyp (success, error, info)
 * @param {number} duration - Anzeigedauer in Millisekunden
 */
export const showNotification = (
  message,
  type = "success",
  duration = 3000
) => {
  // Prüfen ob User Benachrichtigungen aktiviert hat
  if (!appState.userPreferences.showNotifications) {
    return; // Keine Benachrichtigung anzeigen
  }

  const notification = {
    id: Date.now() + Math.random(),
    message,
    type,
    duration,
    timestamp: Date.now(),
  };

  // Immutable Update: Neue Benachrichtigung hinzufügen
  appState.notifications = [...appState.notifications, notification];
  notifyListeners();

  // Auto-Remove nach duration
  setTimeout(() => {
    removeNotification(notification.id);
  }, duration);
};

/**
 * Entfernt eine Benachrichtigung
 * @param {number} notificationId - ID der zu entfernenden Benachrichtigung
 */
export const removeNotification = (notificationId) => {
  // Immutable Update: Benachrichtigung entfernen
  appState.notifications = appState.notifications.filter(
    (notification) => notification.id !== notificationId
  );
  notifyListeners();
};

/**
 * Zeigt eine Erfolgs-Benachrichtigung für hinzugefügte Gerichte
 * @param {string} dishName - Name des hinzugefügten Gerichts
 * @param {number} quantity - Anzahl der hinzugefügten Portionen
 */
export const showAddToCartNotification = (dishName, quantity = 1) => {
  const message =
    quantity === 1
      ? `"${dishName}" wurde zum Warenkorb hinzugefügt! 🛒`
      : `${quantity}x "${dishName}" wurden zum Warenkorb hinzugefügt! 🛒`;

  showNotification(message, "success", 3000);
};

/**
 * Zeigt eine Info-Benachrichtigung für Bestellungen
 * @param {string} message - Bestellungs-Nachricht
 */
export const showOrderNotification = (message) => {
  showNotification(message, "info", 4000);
};
