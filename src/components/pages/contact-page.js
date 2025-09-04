// contact-page.js
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../services/notification.js";

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
 * Generiert ein einfaches mathematisches Captcha
 * @returns {Object} Captcha-Daten mit Frage und Antwort
 */
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ["+", "-", "*"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let answer;
  let question;

  switch (operation) {
    case "+":
      answer = num1 + num2;
      question = `${num1} + ${num2}`;
      break;
    case "-":
      answer = Math.max(num1, num2) - Math.min(num1, num2);
      question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
      break;
    case "*":
      answer = num1 * num2;
      question = `${num1} × ${num2}`;
      break;
  }

  return { question, answer };
};

/**
 * Rendert das Kontaktformular
 * @returns {string} HTML-String für Kontaktformular
 */
const renderContactForm = () => {
  const captcha = generateCaptcha();

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

        <div class="form-group captcha-group">
          <label for="captchaAnswer">Sicherheitsfrage: <br />
            Was ist ${captcha.question}? *</label>
          <input 
            type="number" 
            id="captchaAnswer" 
            name="captcha" 
            required
            placeholder="Ihre Antwort"
            data-correct-answer="${captcha.answer}"
          >
          <button type="button" class="captcha-refresh-btn" id="refreshCaptcha">🔄 Neue Frage</button>
        </div>

        <button type="submit" class="contact-submit-btn">Nachricht senden</button>
      </form>
    </div>
  `;
};

/**
 * Erneuert das Captcha
 */
const refreshCaptcha = () => {
  const captcha = generateCaptcha();
  const label = document.querySelector(".captcha-group label");
  const input = document.getElementById("captchaAnswer");

  if (label && input) {
    label.textContent = `Sicherheitsfrage: Was ist ${captcha.question}? *`;
    input.setAttribute("data-correct-answer", captcha.answer);
    input.value = "";
  }
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
  const refreshBtn = document.getElementById("refreshCaptcha");

  if (!form) return;

  form.addEventListener("submit", handleContactFormSubmit);

  if (refreshBtn) {
    refreshBtn.addEventListener("click", refreshCaptcha);
  }
};

/**
 * Parst Response als JSON mit Fallback auf Text
 * @param {Response} response - Fetch Response
 * @returns {Object} Geparste Daten oder Fehler-Info
 */
const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type");

  // Versuche JSON zu parsen wenn Content-Type stimmt
  if (contentType && contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (jsonError) {
      console.error("JSON parse error:", jsonError);
      const text = await response.text();
      throw new Error(`Invalid JSON response: ${text}`);
    }
  }

  // Fallback auf Text
  const text = await response.text();
  console.error("Non-JSON response:", text);
  throw new Error(`Server returned invalid response format: ${text}`);
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

    // Captcha-Prüfung
    const captchaInput = document.getElementById("captchaAnswer");
    const userAnswer = parseInt(captchaInput.value);
    const correctAnswer = parseInt(
      captchaInput.getAttribute("data-correct-answer")
    );

    if (isNaN(userAnswer) || userAnswer !== correctAnswer) {
      showErrorNotification("Die Antwort auf die Sicherheitsfrage ist falsch.");
      refreshCaptcha();
      return; // Stoppe hier, aber resette das Formular NICHT
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
      captcha: userAnswer,
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

    // Parse Response (funktioniert für sowohl Erfolg als auch Fehler)
    const result = await parseResponse(response);

    // Behandle HTTP-Status-Codes
    if (!response.ok) {
      throw new Error(result.message || `Server Error (${response.status})`);
    }

    // Erfolgreiche Response
    if (result.success) {
      showSuccessNotification(
        "Vielen Dank für Ihre Nachricht! Sie erhalten eine Bestätigungsmail und wir melden uns bald bei Ihnen."
      );
      event.target.reset();
      refreshCaptcha();
    } else {
      throw new Error(result.message || "Unbekannter Fehler");
    }
  } catch (error) {
    console.error("Error sending:", error);
    showErrorNotification(`Error sending message: ${error.message}`);
    // Nur bei echten Fehlern das Captcha erneuern, nicht das ganze Formular
    refreshCaptcha();
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
};
