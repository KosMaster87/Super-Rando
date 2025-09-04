// contact-page.js

/**
 * Rendert die Kontakt-Seite
 * @returns {string} HTML-String für Kontakt-Seite
 */
export const renderContactPage = () => {
  // Add event listener setup after rendering
  setTimeout(() => {
    setupContactFormHandler();
  }, 0);

  return `
    <section class="page-content">
      <h1 class="page-title">Kontakt</h1>
      <p class="page-subtitle">Nehmen Sie Kontakt mit uns auf</p>
      <div class="contact-content">
        ${renderContactForm()}
        ${renderContactInfo()}
      </div>
    </section>
  `;
};

/**
 * Rendert das Kontaktformular
 * @returns {string} HTML-String für Kontaktformular
 */
const renderContactForm = () => {
  return `
    <div class="contact-form-section">
      <h2>Nachricht senden</h2>
      
      <form class="contact-form" id="contactForm">
        <!-- Honeypot Field (versteckt für Bots) -->
        <div class="honeypot-field" style="position: absolute; left: -9999px; opacity: 0;">
          <label for="website">Website (bitte leer lassen)</label>
          <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
        </div>

        <div class="form-group">
          <label for="contactName">Name *</label>
          <input 
            type="text" 
            id="contactName" 
            name="name" 
            required
            placeholder="Ihr vollständiger Name"
            aria-describedby="nameHelp"
          >
        </div>

        <div class="form-group">
          <label for="contactEmail">E-Mail *</label>
          <input 
            type="email" 
            id="contactEmail" 
            name="email" 
            required
            placeholder="ihre.email@beispiel.de"
            aria-describedby="emailHelp"
          >
        </div>

        <div class="form-group">
          <label for="contactSubject">Betreff *</label>
          <input 
            type="text" 
            id="contactSubject" 
            name="subject" 
            required
            placeholder="Worum geht es?"
            aria-describedby="subjectHelp"
          >
        </div>

        <div class="form-group">
          <label for="contactMessage">Nachricht *</label>
          <textarea 
            id="contactMessage" 
            name="message" 
            rows="5" 
            required
            placeholder="Ihre Nachricht an uns..."
            aria-describedby="messageHelp"
          ></textarea>
        </div>

        <button type="submit" class="contact-submit-btn">Nachricht senden</button>
      </form>
    </div>
  `;
};

/**
 * Rendert die Kontaktinformationen
 * @returns {string} HTML-String für Kontaktinformationen
 */
const renderContactInfo = () => {
  return `
    <div class="contact-info-section">
      <h2>Kontaktinformationen</h2>

      <div class="contact-details">
        <div class="contact-item">
          <h3>Adresse</h3>
          <p>Konstantin Aksenov<br>
          Concordia-Straße<br>
          9370 Loma Plata<br>
          Paraguay</p>
        </div>

        <div class="contact-item">
          <h3>Telefon</h3>
          <p><a href="tel:+595994221200">+595 994 221200</a></p>
        </div>

        <div class="contact-item">
          <h3>E-Mail</h3>
          <p><a href="mailto:konstantin.aksenov@dev2k.org">konstantin.aksenov@dev2k.org</a></p>
        </div>

        <div class="contact-item">
          <h3>Öffnungszeiten</h3>
          <p>Mo-So: 09:00 - 15:00 Uhr</p>
        </div>
      </div>
    </div>
  `;
};

/**
 * Richtet Event-Handler für Kontaktformular ein
 */
const setupContactFormHandler = () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", handleContactFormSubmit);
};

/**
 * Behandelt Formular-Absendung
 * @param {Event} event - Submit-Event
 */
const handleContactFormSubmit = async (event) => {
  event.preventDefault();

  const submitBtn = event.target.querySelector(".contact-submit-btn");
  const originalText = submitBtn.textContent;

  try {
    // Honeypot-Prüfung
    const honeypotField = event.target.querySelector('input[name="website"]');
    if (honeypotField && honeypotField.value.trim() !== "") {
      throw new Error("Spam erkannt");
    }

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet...";

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();

    if (result.success) {
      showNotificationModal(
        "success",
        "Nachricht gesendet!",
        "Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen. Sie erhalten eine Bestätigungsmail."
      );
      event.target.reset();
    } else {
      throw new Error(result.message || "Unbekannter Fehler");
    }
  } catch (error) {
    console.error("Fehler beim Senden:", error);
    showNotificationModal(
      "error",
      "Fehler beim Senden",
      `Ihre Nachricht konnte nicht gesendet werden: ${error.message}`
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
};

/**
 * Zeigt Notification Modal an
 * @param {string} type - success, error, warning
 * @param {string} title - Modal-Titel
 * @param {string} message - Modal-Nachricht
 */
const showNotificationModal = (type, title, message) => {
  createNotificationModal(type, title, message);
};

/**
 * Erstellt und zeigt Notification Modal
 * @param {string} type - Modal-Typ
 * @param {string} title - Modal-Titel
 * @param {string} message - Modal-Nachricht
 */
const createNotificationModal = (type, title, message) => {
  const modal = document.createElement("div");
  modal.className = `notification-modal notification-${type}`;
  modal.id = "notificationModal";

  modal.innerHTML = `
    <div class="notification-overlay" id="notificationOverlay">
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-icon">${getNotificationIcon(type)}</span>
          <h3 class="notification-title">${title}</h3>
          <button class="notification-close" id="notificationClose">&times;</button>
        </div>
        <div class="notification-body">
          <p>${message}</p>
        </div>
        <div class="notification-footer">
          <button class="notification-btn notification-btn-primary" id="notificationOk">OK</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Event listeners
  const closeModal = () => {
    modal.remove();
  };

  document
    .getElementById("notificationClose")
    .addEventListener("click", closeModal);
  document
    .getElementById("notificationOk")
    .addEventListener("click", closeModal);
  document
    .getElementById("notificationOverlay")
    .addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

  // Auto-focus OK button
  setTimeout(() => {
    document.getElementById("notificationOk").focus();
  }, 100);
};

/**
 * Gibt Icon für Notification-Typ zurück
 * @param {string} type - Notification-Typ
 * @returns {string} Icon-HTML
 */
const getNotificationIcon = (type) => {
  switch (type) {
    case "success":
      return "✅";
    case "error":
      return "❌";
    case "warning":
      return "⚠️";
    default:
      return "ℹ️";
  }
};
