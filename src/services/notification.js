import { appState, notifyListeners } from "../state.js";

/**
 * Erstellt eine neue Benachrichtigung
 * @param {string} message - Benachrichtigungstext
 * @param {string} type - Benachrichtigungstyp (success, error, info)
 * @param {number} duration - Anzeigedauer in Millisekunden
 */

/**
 * Erstellt eine neue Benachrichtigung
 * @param {string} message - Benachrichtigungstext
 * @param {string} type - Benachrichtigungstyp (success, error, info)
 * @param {number} duration - Anzeigedauer in Millisekunden
 * @param {boolean} force - Erzwingt Anzeige, auch wenn Notifications deaktiviert
 */
export const showNotification = (
  message,
  type = "success",
  duration = 3000,
  force = false
) => {
  // Prüfen ob User Benachrichtigungen aktiviert hat, außer force=true
  if (!force && !appState.userPreferences.showNotifications) {
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
 * Zeigt eine Info-Benachrichtigung für Bestellungen (immer sichtbar)
 * @param {string} message - Bestellungs-Nachricht
 */
export const showOrderNotification = (message) => {
  showNotification(message, "info", 4000, true);
};

/**
 * Zeigt eine Erfolgs-Notification an
 * @param {string} message - Erfolgsmeldung
 */
export const showSuccessNotification = (message) => {
  showNotification(message, "success", 5000);
};

/**
 * Zeigt eine Fehler-Notification an
 * @param {string} message - Fehlermeldung
 */
export const showErrorNotification = (message) => {
  showNotification(message, "error", 7000);
};

/**
 * Zeigt eine Info-Notification an
 * @param {string} message - Info-Meldung
 */
export const showInfoNotification = (message) => {
  showNotification(message, "info", 4000);
};
