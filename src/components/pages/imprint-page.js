/**
 * Renders the Imprint page.
 * @returns {string} HTML string for the Imprint page
 */
export const renderImprintPage = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Imprint</h1>
      <div class="imprint-content">
        ${renderCompanyInfo()}
        ${renderLegalInfo()}
        ${renderContactInfo()}
      </div>
    </section>
  `;
};

/**
 * Renders the company information section.
 * @returns {string} HTML string for company information
 */
const renderCompanyInfo = () => {
  return `
    <div class="imprint-section">
      <h2>Information according to § 5 TMG</h2>
      <p>
        Super~Rando Fusion Cuisine GmbH<br>
        Musterstraße 123<br>
        12345 Musterstadt<br>
        Germany
      </p>
    </div>
  `;
};

/**
 * Renders the legal information section.
 * @returns {string} HTML string for legal information
 */
const renderLegalInfo = () => {
  return `
    <div class="imprint-section">
      <h2>Represented by</h2>
      <p>Managing Director: Konstantin Aksenov</p>
      
      <h2>Commercial Register Entry</h2>
      <p>
        Entry in the Commercial Register<br>
        Register Court: District Court Musterstadt<br>
        Register Number: HRB 12345
      </p>
      
      <h2>VAT ID</h2>
      <p>
        VAT Identification Number according to §27 a VAT Act:<br>
        DE123456789
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
        <a href="tel:+595994221200">+595 994 221200</a><br>
        <a href="mailto:konstantin.aksenov@dev2k.org">konstantin.aksenov@dev2k.org</a>
      </p>
      <h2>Responsible for content according to § 55 Abs. 2 RStV</h2>
      <p>
        Konstantin Aksenov<br>
        Concordia-Straße<br>
        9370 Loma Plata
      </p>
    </div>
  `;
};
