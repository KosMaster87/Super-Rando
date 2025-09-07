import {
  getUserPreferences,
  addNotification,
  removeNotification as removeNotificationState,
} from "../state.js";

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
  const userPreferences = getUserPreferences();
  if (!force && !userPreferences.showNotifications) {
    return;
  }

  const notification = {
    id: Date.now() + Math.random(),
    message,
    type,
    duration,
    timestamp: Date.now(),
  };

  addNotification(notification);

  setTimeout(() => {
    removeNotification(notification.id);
  }, duration);
};

/**
 * Entfernt eine Benachrichtigung
 * @param {number} notificationId - ID der zu entfernenden Benachrichtigung
 */
export const removeNotification = (notificationId) => {
  removeNotificationState(notificationId);
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
 * Zeigt eine Erfolgs-Notification an (immer sichtbar für wichtige Aktionen)
 * @param {string} message - Erfolgsmeldung
 */
export const showSuccessNotification = (message) => {
  showNotification(message, "success", 5000, true);
};

/**
 * Zeigt eine Fehler-Notification an (immer sichtbar für wichtige Aktionen)
 * @param {string} message - Fehlermeldung
 */
export const showErrorNotification = (message) => {
  showNotification(message, "error", 7000, true);
};

/**
 * Zeigt eine Info-Notification an
 * @param {string} message - Info-Meldung
 */
export const showInfoNotification = (message) => {
  showNotification(message, "info", 4000);
};
