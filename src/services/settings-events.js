import { getUserPreferences } from "../state.js";
import { setTheme, toggleNotifications } from "./user-preferences.js";

/**
 * Initialisiert alle Settings-Event-Listener
 */
export const initializeSettingsEvents = () => {
  setupDropdownToggle();
  setupSettingsOptions();
  setupNotificationToggle();
  updateActiveSettings();
};

/**
 * Setzt Event-Listener für Dropdown-Toggle
 */
const setupDropdownToggle = () => {
  const dropdownToggle = document.getElementById("settingsDropdown");
  const dropdownMenu = document.getElementById("settingsMenu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.onclick = (e) => {
      e.stopPropagation();
      toggleDropdown();
    };

    // Dropdown schließen wenn außerhalb geklickt wird
    document.onclick = () => {
      closeDropdown();
    };

    // Dropdown nicht schließen wenn innen geklickt wird
    dropdownMenu.onclick = (e) => {
      e.stopPropagation();
    };
  }
};

/**
 * Setzt Event-Listener für Settings-Optionen
 */
const setupSettingsOptions = () => {
  const settingOptions = document.querySelectorAll(".setting-option");

  settingOptions.forEach((option) => {
    option.onclick = () => handleSettingChange(option);
  });
};

/**
 * Setzt Event-Listener für Notification-Toggle
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
 * Togglet das Dropdown-Menü
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
 * Öffnet das Dropdown-Menü
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
 * Schließt das Dropdown-Menü
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
 * Aktualisiert die aktiven Settings
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
 * Aktualisiert den Notification-Toggle
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

// ---------------
/**
 * Behandelt Setting-Änderungen
 * @param {HTMLElement} option - Geklickte Setting-Option
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
