import {
  getUserPreferences,
  addNotification,
  removeNotification as removeNotificationState,
} from "../state.js";

/**
 * Creates a new notification.
 * Displays the notification if user preferences allow it, or if forced.
 * @param {string} message - Notification text
 * @param {string} type - Notification type ("success", "error", "info")
 * @param {number} duration - Display duration in milliseconds
 * @param {boolean} force - Forces display even if notifications are disabled
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
 * Removes a notification.
 * @param {number} notificationId - ID of the notification to remove
 */
export const removeNotification = (notificationId) => {
  removeNotificationState(notificationId);
};

/**
 * Shows a success notification for added dishes.
 * @param {string} dishName - Name of the added dish
 * @param {number} quantity - Number of portions added
 */
export const showAddToCartNotification = (dishName, quantity = 1) => {
  const message =
    quantity === 1
      ? `"${dishName}" was added to the cart! 🛒`
      : `${quantity}x "${dishName}" were added to the cart! 🛒`;

  showNotification(message, "success", 3000);
};

/**
 * Shows an info notification for orders (always visible)
 * @param {string} message - Order message
 */
export const showOrderNotification = (message) => {
  showNotification(message, "info", 4000, true);
};

/**
 * Shows a success notification (always visible for important actions).
 * @param {string} message - Success message
 */
export const showSuccessNotification = (message) => {
  showNotification(message, "success", 5000, true);
};

/**
 * Shows an error notification (always visible for important actions).
 * @param {string} message - Error message
 */
export const showErrorNotification = (message) => {
  showNotification(message, "error", 7000, true);
};

/**
 * Shows an info notification.
 * @param {string} message - Info message
 */
export const showInfoNotification = (message) => {
  showNotification(message, "info", 4000);
};
