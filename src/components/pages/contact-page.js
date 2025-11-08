/**
 * @fileoverview Renders the contact page with a contact form and contact information.
 * @description This module exports a function to render the contact page,
 * including a contact form with validation features and a section for contact details.
 * @module components/pages/contact-page
 */

import {
  setupContactFormHandler,
  generateCaptcha,
} from "../../services/contact-form.js";

/**
 * Renders the contact page.
 * @returns {string} HTML string for the contact page
 */
export const renderContactPage = () => {
  setTimeout(() => {
    setupContactFormHandler();
  }, 0);

  return `
    <section class="page-content">
      <h1 class="page-title">Contact</h1>
      <p class="page-subtitle">Get in touch with us</p>
      <div class="contact-content">
        ${renderContactForm()}
        ${renderContactInfo()}
      </div>
    </section>
  `;
};

/**
 * Renders the contact form.
 * @returns {string} HTML string for the contact form
 */
const renderContactForm = () => {
  const captcha = generateCaptcha();

  return `
    <div class="contact-form-section">
      <h2>Send Message</h2>

      <form class="contact-form" id="contactForm">
        <!-- Honeypot Field (hidden for bots) -->
        <div class="honeypot-field" style="position: absolute; left: -9999px; opacity: 0;">
          <label for="website">Website (please leave empty)</label>
          <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
        </div>

        <div class="form-group">
          <label for="contactName">Name *</label>
          <input
            type="text"
            id="contactName"
            name="name"
            required
            placeholder="Your full name"
            aria-describedby="nameHelp"
          >
        </div>

        <div class="form-group">
          <label for="contactEmail">Email *</label>
          <input
            type="email"
            id="contactEmail"
            name="email"
            required
            placeholder="your.email@example.com"
            aria-describedby="emailHelp"
          >
        </div>

        <div class="form-group">
          <label for="contactSubject">Subject *</label>
          <input
            type="text"
            id="contactSubject"
            name="subject"
            required
            placeholder="What is this about?"
            aria-describedby="subjectHelp"
          >
        </div>

        <div class="form-group">
          <label for="contactMessage">Message *</label>
          <textarea
            id="contactMessage"
            name="message"
            rows="5"
            required
            placeholder="Your message to us..."
            aria-describedby="messageHelp"
          ></textarea>
        </div>

        <div class="form-group captcha-group">
          <label for="captchaAnswer">Security question: <br />
            What is ${captcha.question}? *</label>
          <input
            type="number"
            id="captchaAnswer"
            name="captcha"
            required
            placeholder="Your answer"
            data-correct-answer="${captcha.answer}"
          >
          <button type="button" class="captcha-refresh-btn" id="refreshCaptcha">🔄 New Question</button>
        </div>

        <button type="submit" class="contact-submit-btn">Send Message</button>
      </form>
    </div>
  `;
};

/**
 * Renders the contact information.
 * @returns {string} HTML string for contact information
 */
const renderContactInfo = () => {
  return `
    <div class="contact-info-section">
      <h2>Contact Information</h2>

      <div class="contact-details">
        <div class="contact-item">
          <h3>Address</h3>
          <p>Konstantin Aksenov<br>
          Concordia-Straße<br>
          9370 Loma Plata<br>
          Paraguay</p>
        </div>

        <div class="contact-item">
          <h3>Phone</h3>
          <p><a href="tel:+595994221200">+595 994 221200</a></p>
        </div>

        <div class="contact-item">
          <h3>Email</h3>
          <p><a href="mailto:konstantin.aksenov@dev2k.org">konstantin.aksenov@dev2k.org</a></p>
        </div>

        <div class="contact-item">
          <h3>Opening Hours</h3>
          <p>Mon-Sun: 09:00 - 15:00</p>
        </div>
      </div>
    </div>
  `;
};
