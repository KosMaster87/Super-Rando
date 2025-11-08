/**
 * @fileoverview Service to handle settings-related events and interactions.
 * @description This module sets up event listeners for the settings dropdown,
 *              manages user interactions with settings options, and updates the
 *              UI based on user preferences.
 * @module services/settings-events
 */

import { getUserPreferences } from "../state.js";
import { setTheme, toggleNotifications } from "./user-preferences.js";

/**
 * Initializes all settings event listeners.
 */
export const initializeSettingsEvents = () => {
  setupDropdownToggle();
  setupSettingsOptions();
  setupNotificationToggle();
  updateActiveSettings();
};

/**
 * Sets up event listeners for the settings dropdown toggle.
 */
const setupDropdownToggle = () => {
  const dropdownToggle = document.getElementById("settingsDropdown");
  const dropdownMenu = document.getElementById("settingsMenu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.onclick = (e) => {
      e.stopPropagation();
      toggleDropdown();
    };

    // Close dropdown when clicking outside
    document.onclick = () => {
      closeDropdown();
    };

    // Do not close dropdown when clicking inside
    dropdownMenu.onclick = (e) => {
      e.stopPropagation();
    };
  }
};

/**
 * Sets up event listeners for settings options.
 */
const setupSettingsOptions = () => {
  const settingOptions = document.querySelectorAll(".setting-option");

  settingOptions.forEach((option) => {
    option.onclick = () => handleSettingChange(option);
  });
};

/**
 * Sets up event listener for notification toggle.
 */
const setupNotificationToggle = () => {
  const notificationToggle = document.getElementById("notificationToggle");

  if (notificationToggle) {
    notificationToggle.onclick = () => {
      toggleNotifications();
      updateNotificationToggle();
    };
  }
};

/**
 * Toggles the dropdown menu open/closed.
 */
const toggleDropdown = () => {
  const dropdownMenu = document.getElementById("settingsMenu");
  const dropdownToggle = document.getElementById("settingsDropdown");

  if (dropdownMenu && dropdownToggle) {
    const isOpen = dropdownMenu.classList.contains("dropdown-open");

    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }
};

/**
 * Opens the dropdown menu.
 */
const openDropdown = () => {
  const dropdownMenu = document.getElementById("settingsMenu");
  const dropdownToggle = document.getElementById("settingsDropdown");

  if (dropdownMenu && dropdownToggle) {
    dropdownMenu.classList.add("dropdown-open");
    dropdownToggle.classList.add("dropdown-active");
  }
};

/**
 * Closes the dropdown menu.
 */
const closeDropdown = () => {
  const dropdownMenu = document.getElementById("settingsMenu");
  const dropdownToggle = document.getElementById("settingsDropdown");

  if (dropdownMenu && dropdownToggle) {
    dropdownMenu.classList.remove("dropdown-open");
    dropdownToggle.classList.remove("dropdown-active");
  }
};

/**
 * Updates the active settings options based on current user preferences.
 */
const updateActiveSettings = () => {
  const settingOptions = document.querySelectorAll(".setting-option");
  const userPreferences = getUserPreferences();

  settingOptions.forEach((option) => {
    const setting = option.dataset.setting;
    const value = option.dataset.value;
    const isActive = userPreferences[setting] === value;

    option.classList.toggle("setting-active", isActive);
  });

  updateNotificationToggle();
};

/**
 * Updates the notification toggle UI based on current user preferences.
 */
const updateNotificationToggle = () => {
  const toggle = document.getElementById("notificationToggle");

  if (toggle) {
    const userPreferences = getUserPreferences();
    const isEnabled = userPreferences.showNotifications;
    toggle.classList.toggle("toggle-active", isEnabled);

    const indicator = toggle.querySelector(".toggle-indicator");
    if (indicator) {
      indicator.textContent = isEnabled ? "●" : "○";
    }
  }
};

/**
 * Handles changes to a setting option.
 * @param {HTMLElement} option - Clicked setting option
 */
const handleSettingChange = (option) => {
  const setting = option.dataset.setting;
  const value = option.dataset.value;

  if (setting === "theme") {
    setTheme(value);
    updateActiveSettings();
    closeDropdown();
  }
};
