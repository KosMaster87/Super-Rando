import { getNotifications } from "../state.js";
import { removeNotification } from "../services/notification.js";

/**
 * Renders all active notifications.
 * @returns {string} HTML string for notifications
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
 * Creates HTML for a single notification.
 * @param {Object} notification - Notification object
 * @returns {string} HTML string for the notification
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
 * Returns the appropriate icon for the notification type.
 * @param {string} type - Notification type
 * @returns {string} Icon emoji
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
 * Global function to close a notification.
 * @param {number} notificationId - ID of the notification to close
 */
window.handleNotificationClose = (notificationId) => {
  removeNotification(notificationId);
};
