#!/usr/bin/env node

/**
 * Script to automatica    // Check if the CSS link already exists
    if (content.includes('super-rand  // Verify CSS file exists
  const cssPath = path.join(DOCS_DIR, 'styles', 'super-rando-theme.css');
  if (!fs.existsSync(cssPath)) {
    console.log('');
    console.log('Warning: super-rando-theme.css not found in docs/styles directory!');
    console.log('Make sure to copy the CSS file to the docs/styles folder.');
  }.css')) {
      console.log(`Skip: CSS already exists in ${path.basename(filePath)}`);
      return;
    }dd dark theme CSS link to all generated JSDoc HTML files
 * Runs after JSDoc generation to ensure the custom CSS is always included
 */

const fs = require("fs");
const path = require("path");

const DOCS_DIR = path.join(__dirname, "../docs");
const CSS_LINK =
  '    <link rel="stylesheet" href="styles/super-rando-theme.css" />';

/**
 * Recursively finds all HTML files in the docs directory
 * @param {string} dir - Directory to search
 * @param {Array} files - Array to store found files
 * @returns {Array} Array of HTML file paths
 */
function findHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (path.extname(item) === ".html") {
      files.push(fullPath);
    }
  });

  return files;
}

/**
 * Adds the CSS link to an HTML file if it doesn't already exist
 * @param {string} filePath - Path to the HTML file
 */
function addCssLinkToFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Check if the CSS link already exists
    if (content.includes("docdash-dark.css")) {
      console.log(`Skip: CSS already exists in ${path.basename(filePath)}`);
      return;
    }

    // Find the position to insert the CSS link (after jsdoc.css)
    const jsdocCssPattern = /(<link[^>]*jsdoc\.css[^>]*>)/;
    const match = content.match(jsdocCssPattern);

    if (match) {
      // Insert CSS link after jsdoc.css line
      const newContent = content.replace(
        jsdocCssPattern,
        match[1] + "\n" + CSS_LINK
      );

      fs.writeFileSync(filePath, newContent, "utf8");
      console.log(`Added CSS to: ${path.basename(filePath)}`);
    } else {
      // Fallback: Insert before </head>
      const headEndPattern = /(\s*<\/head>)/;
      if (content.match(headEndPattern)) {
        const newContent = content.replace(
          headEndPattern,
          "\n" + CSS_LINK + "\n$1"
        );

        fs.writeFileSync(filePath, newContent, "utf8");
        console.log(`Added CSS (fallback) to: ${path.basename(filePath)}`);
      } else {
        console.log(`Could not process: ${path.basename(filePath)}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main function to process all HTML files
 */
function main() {
  console.log("Adding dark theme CSS to JSDoc documentation...");
  console.log("");

  if (!fs.existsSync(DOCS_DIR)) {
    console.error("Docs directory not found. Please run JSDoc first.");
    process.exit(1);
  }

  const htmlFiles = findHtmlFiles(DOCS_DIR);

  if (htmlFiles.length === 0) {
    console.log("No HTML files found in docs directory.");
    return;
  }

  console.log(`Found ${htmlFiles.length} HTML files to process...`);
  console.log("");

  let processed = 0;
  htmlFiles.forEach((file) => {
    const sizeBefore = fs.statSync(file).size;
    addCssLinkToFile(file);
    const sizeAfter = fs.statSync(file).size;

    if (sizeAfter > sizeBefore) {
      processed++;
    }
  });

  console.log("");
  console.log(`Successfully processed ${processed} documentation files!`);
  console.log("Your documentation now uses the Super-Rando-SPA color scheme.");

  // Verify CSS file exists
  const cssPath = path.join(DOCS_DIR, "docdash-dark.css");
  if (!fs.existsSync(cssPath)) {
    console.log("");
    console.log("Warning: docdash-dark.css not found in docs directory!");
    console.log("Make sure to copy the CSS file to the docs folder.");
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
