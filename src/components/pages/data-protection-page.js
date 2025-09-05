/**
 * Rendert die Datenschutz-Seite
 * @returns {string} HTML-String für Datenschutz-Seite
 */
export const renderDataProtectionPage = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Datenschutzerklärung</h1>
      <div class="data-protection-content">
        ${renderGeneralInfo()}
        ${renderDataCollection()}
        ${renderDataUsage()}
        ${renderUserRights()}
      </div>
    </section>
  `;
};

/**
 * Rendert allgemeine Datenschutzinformationen
 * @returns {string} HTML-String für allgemeine Informationen
 */
const renderGeneralInfo = () => {
  return `
    <div class="data-protection-section">
      <h2>1. Datenschutz auf einen Blick</h2>
      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
        personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
        Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
      </p>
    </div>
  `;
};

/**
 * Rendert Informationen zur Datenerfassung
 * @returns {string} HTML-String für Datenerfassung
 */
const renderDataCollection = () => {
  return `
    <div class="data-protection-section">
      <h2>2. Datenerfassung auf dieser Website</h2>
      <h3>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
      <p>
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
        Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
      </p>
      
      <h3>Wie erfassen wir Ihre Daten?</h3>
      <p>
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
        Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
      </p>
    </div>
  `;
};

/**
 * Rendert Informationen zur Datenverwendung
 * @returns {string} HTML-String für Datenverwendung
 */
const renderDataUsage = () => {
  return `
    <div class="data-protection-section">
      <h2>3. Wofür nutzen wir Ihre Daten?</h2>
      <p>
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website 
        zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
      </p>
      
      <h3>Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
      <p>
        Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und 
        Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
      </p>
    </div>
  `;
};

/**
 * Rendert Informationen zu Nutzerrechten
 * @returns {string} HTML-String für Nutzerrechte
 */
const renderUserRights = () => {
  return `
    <div class="data-protection-section">
      <h2>4. Ihre Rechte</h2>
      <p>
        Sie haben das Recht:
      </p>
      <ul>
        <li>Auskunft über Ihre bei uns gespeicherten Daten zu verlangen</li>
        <li>Berichtigung unrichtiger Daten zu fordern</li>
        <li>Löschung Ihrer Daten zu verlangen</li>
        <li>Einschränkung der Datenverarbeitung zu fordern</li>
        <li>Widerspruch gegen die Verarbeitung einzulegen</li>
      </ul>
      
      <p>
        Bei Fragen wenden Sie sich gerne an uns unter:
        <a href="mailto:konstantin.aksenov@dev2k.org">konstantin.aksenov@dev2k.org</a>
      </p>
    </div>
  `;
};
