/**
 * @fileoverview Imprint page component.
 * @description This module exports a function to render the Imprint page,
 * including company information, legal details, and contact information.
 * @module components/pages/imprint-page
 */

/**
 * Renders the Imprint page.
 * @returns {string} HTML string for the Imprint page
 */
export const renderImprintPage = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Imprint</h1>
      <div class="imprint-content">
        ${renderResponsibleInfo()}
        ${renderContactInfo()}
        ${renderTechnicalInfo()}
      </div>
    </section>
  `;
};

/**
 * Renders the section identifying who is responsible for this website's content.
 * @returns {string} HTML string for the responsible-party information
 */
const renderResponsibleInfo = () => {
  return `
    <div class="imprint-section">
      <h2>Responsible for content</h2>
      <p>
        Developer2K Software<br>
        Sole proprietor: Konstantin Aksenov<br>
        Remote
      </p>
    </div>
  `;
};

/**
 * Renders the contact information for the Imprint.
 * @returns {string} HTML string for contact information
 */
const renderContactInfo = () => {
  return `
    <div class="imprint-section">
      <h2>Contact</h2>
      <p>
        Email: <a href="mailto:konstantin@dev2ksoftware.com">konstantin@dev2ksoftware.com</a><br>
        Website: <a href="https://super-rando.dev2ksoftware.com/">https://super-rando.dev2ksoftware.com/</a>
      </p>
    </div>
  `;
};

/**
 * Renders the technical information section.
 * @returns {string} HTML string for technical information
 */
const renderTechnicalInfo = () => {
  return `
    <div class="imprint-section">
      <h2>Technical Information</h2>
      <p>
        This website is built with Vanilla JavaScript and a Node.js/Express development
        server. For technical inquiries, please contact us via the email address above.
      </p>
    </div>
  `;
};
