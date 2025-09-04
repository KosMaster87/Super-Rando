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
 * honeypotField - verstecktes Feld zur Spam-Erkennung - Bots defender
 * @param {Event} event - Submit-Event
 */
const handleContactFormSubmit = async (event) => {
  event.preventDefault();

  const submitBtn = event.target.querySelector(".contact-submit-btn");
  const originalText = submitBtn.textContent;

  try {
    const honeypotField = event.target.querySelector('input[name="website"]');
    if (honeypotField && honeypotField.value.trim() !== "") {
      throw new Error("Spam erkannt");
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet...";

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    console.log("Sending data:", data);

    const response = await fetch("/api/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(`Server Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    console.log("Result:", result);

    if (result.success) {
      showSuccessMessage(
        "Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen."
      );
      event.target.reset();
    } else {
      throw new Error(result.message || "Unbekannter Fehler");
    }
  } catch (error) {
    console.error("Fehler beim Senden:", error);
    showErrorMessage(`Fehler beim Senden der Nachricht: ${error.message}`);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
};

/**
 * Zeigt Erfolgsmeldung an
 * @param {string} message - Erfolgsmeldung
 */
const showSuccessMessage = (message) => {
  // TODO: Integration mit Notification-System
  alert(message);
};

/**
 * Zeigt Fehlermeldung an
 * @param {string} message - Fehlermeldung
 */
const showErrorMessage = (message) => {
  // TODO: Integration mit Notification-System
  alert(message);
};
