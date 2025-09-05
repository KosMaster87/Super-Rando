/**
 * Rendert die Impressum-Seite
 * @returns {string} HTML-String für Impressum-Seite
 */
export const renderImprintPage = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Impressum</h1>
      <div class="imprint-content">
        ${renderCompanyInfo()}
        ${renderLegalInfo()}
        ${renderContactInfo()}
      </div>
    </section>
  `;
};

/**
 * Rendert die Firmeninformationen
 * @returns {string} HTML-String für Firmeninformationen
 */
const renderCompanyInfo = () => {
  return `
    <div class="imprint-section">
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Super~Rando Fusion Küche GmbH<br>
        Musterstraße 123<br>
        12345 Musterstadt<br>
        Deutschland
      </p>
    </div>
  `;
};

/**
 * Rendert die rechtlichen Informationen
 * @returns {string} HTML-String für rechtliche Informationen
 */
const renderLegalInfo = () => {
  return `
    <div class="imprint-section">
      <h2>Vertreten durch</h2>
      <p>Geschäftsführer: Konstantin Aksenov</p>
      
      <h2>Registereintrag</h2>
      <p>
        Eintragung im Handelsregister<br>
        Registergericht: Amtsgericht Musterstadt<br>
        Registernummer: HRB 12345
      </p>
      
      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br>
        DE123456789
      </p>
    </div>
  `;
};

/**
 * Rendert die Kontaktinformationen für Impressum
 * @returns {string} HTML-String für Kontaktinformationen
 */
const renderContactInfo = () => {
  return `
    <div class="imprint-section">
      <h2>Kontakt</h2>

          <p>
            <a href="tel:+595994221200">+595 994 221200</a><br>
            <a href="mailto:konstantin.aksenov@dev2k.org">konstantin.aksenov@dev2k.org</a>
          </p>

      
      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>
        Konstantin Aksenov<br>
        Concordia-Straße<br>
        9370 Loma Plata
      </p>
    </div>
  `;
};
