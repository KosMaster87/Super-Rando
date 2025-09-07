import { getNotifications } from "../state.js";
import { removeNotification } from "../services/notification.js";

/**
 * Rendert alle aktiven Benachrichtigungen
 * @returns {string} HTML-String für Benachrichtigungen
 */
export const renderNotifications = () => {
  const notifications = getNotifications();
  if (notifications.length === 0) {
    return "";
  }

  return `
    <div class="notification-container" id="notificationContainer">
      ${notifications
        .map((notification) => createNotificationHTML(notification))
        .join("")}
    </div>
  `;
};

/**
 * Erstellt HTML für eine einzelne Benachrichtigung
 * @param {Object} notification - Benachrichtigungs-Objekt
 * @returns {string} HTML-String für Benachrichtigung
 */
const createNotificationHTML = (notification) => {
  const typeIcon = getNotificationIcon(notification.type);

  return `
    <div class="notification notification-${notification.type}" 
         id="notification-${notification.id}"
         data-notification-id="${notification.id}">
      <div class="notification-content">
        <span class="notification-icon">${typeIcon}</span>
        <span class="notification-message">${notification.message}</span>
      </div>
      <button class="notification-close" 
              onclick="handleNotificationClose(${notification.id})">
        ✕
      </button>
    </div>
  `;
};

/**
 * Gibt das passende Icon für den Benachrichtigungstyp zurück
 * @param {string} type - Benachrichtigungstyp
 * @returns {string} Icon-Emoji
 */
const getNotificationIcon = (type) => {
  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  };
  return icons[type] || "ℹ️";
};

/**
 * Globale Funktion für das Schließen von Benachrichtigungen
 * @param {number} notificationId - ID der zu schließenden Benachrichtigung
 */
window.handleNotificationClose = (notificationId) => {
  removeNotification(notificationId);
};
