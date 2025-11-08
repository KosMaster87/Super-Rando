/**
 * @fileoverview Renders the Data Protection page content.
 * @description This module provides functions to render the Data Protection page,
 * including sections on general information, data collection, data usage, and user rights.
 * @module components/pages/data-protection-page
 */

/**
 * Renders the Data Protection page.
 * @returns {string} HTML string for the Data Protection page
 */
export const renderDataProtectionPage = () => {
  return `
    <section class="page-content">
      <h1 class="page-title">Privacy Policy</h1>
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
 * Renders general privacy information.
 * @returns {string} HTML string for general information
 */
const renderGeneralInfo = () => {
  return `
    <div class="data-protection-section">
      <h2>1. Privacy at a Glance</h2>
      <h3>General Notes</h3>
      <p>
        The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data by which you can be personally identified.
      </p>
    </div>
  `;
};

/**
 * Renders information about data collection.
 * @returns {string} HTML string for data collection
 */
const renderDataCollection = () => {
  return `
    <div class="data-protection-section">
      <h2>2. Data Collection on this Website</h2>
      <h3>Who is responsible for data collection on this website?</h3>
      <p>
        Data processing on this website is carried out by the website operator. You can find the contact details in the imprint of this website.
      </p>

      <h3>How do we collect your data?</h3>
      <p>
        Your data is collected by you providing it to us. This can be, for example, data that you enter in a contact form.
      </p>
    </div>
  `;
};

/**
 * Renders information about data usage.
 * @returns {string} HTML string for data usage
 */
const renderDataUsage = () => {
  return `
    <div class="data-protection-section">
      <h2>3. How do we use your data?</h2>
      <p>
        Part of the data is collected to ensure the error-free provision of the website. Other data can be used to analyze your user behavior.
      </p>

      <h3>What rights do you have regarding your data?</h3>
      <p>
        You have the right at any time to receive information free of charge about the origin, recipient, and purpose of your stored personal data.
      </p>
    </div>
  `;
};

/**
 * Renders information about user rights.
 * @returns {string} HTML string for user rights
 */
const renderUserRights = () => {
  return `
    <div class="data-protection-section">
      <h2>4. Your Rights</h2>
      <p>
        You have the right to:
      </p>
      <ul>
        <li>Request information about your data stored with us</li>
        <li>Request correction of incorrect data</li>
        <li>Request deletion of your data</li>
        <li>Request restriction of data processing</li>
        <li>Object to data processing</li>
      </ul>

      <p>
        If you have any questions, feel free to contact us at:
        <a href="mailto:konstantin.aksenov@dev2k.org">konstantin.aksenov@dev2k.org</a>
      </p>
    </div>
  `;
};
