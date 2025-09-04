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
          <p>Super~Rando Fusion Küche<br>
          Musterstraße 123<br>
          12345 Musterstadt</p>
        </div>

        <div class="contact-item">
          <h3>Telefon</h3>
          <p>+49 123 456 789</p>
        </div>

        <div class="contact-item">
          <h3>E-Mail</h3>
          <p>info@super-rando.de</p>
        </div>

        <div class="contact-item">
          <h3>Öffnungszeiten</h3>
          <p>Mo-Fr: 11:00 - 22:00 Uhr<br>
          Sa-So: 12:00 - 23:00 Uhr</p>
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
const handleContactFormSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  // Simulate form submission
  console.log("Kontaktformular gesendet:", data);

  // Show success message (you can integrate with notification system)
  alert("Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.");

  // Reset form
  event.target.reset();
};
