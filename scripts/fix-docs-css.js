/**
 * Fix JSDoc CSS for Super-Rando-SPA Documentation
 * Node.js version for cross-platform compatibility
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, "..", "docs");

console.log("🎨 Applying custom styling to JSDoc documentation...");

/**
 * Checks if the documentation directory exists
 * @returns {boolean} True if directory exists
 */
const checkDocsDirectory = () => {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(
      "❌ Error: Documentation directory not found. Run 'npm run docs:generate' first."
    );
    process.exit(1);
  }
  return true;
};

/**
 * Adds custom CSS link to an HTML file
 * @param {string} filePath - Path to the HTML file
 */
const addCustomCSS = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Check if custom CSS link already exists
    if (content.includes("custom-jsdoc.css")) {
      console.log(
        `⏭️  Custom CSS already linked in ${path.basename(filePath)}`
      );
      return;
    }

    // Add custom CSS link after the existing jsdoc.css link
    content = content.replace(
      '<link type="text/css" rel="stylesheet" href="styles/jsdoc.css">',
      '<link type="text/css" rel="stylesheet" href="styles/jsdoc.css">\n    <link type="text/css" rel="stylesheet" href="styles/custom-jsdoc.css">'
    );

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Added custom CSS link to ${path.basename(filePath)}`);
  } catch (error) {
    console.error(
      `❌ Error processing ${path.basename(filePath)}:`,
      error.message
    );
  }
};

/**
 * Updates navigation and meta information in HTML file
 * @param {string} filePath - Path to the HTML file
 */
const updateNavigation = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Update page titles to be more descriptive
    content = content.replace(
      "<title>Home - Documentation</title>",
      "<title>Super-Rando-SPA - Restaurant Documentation</title>"
    );
    content = content.replace(
      /<title>(.*) - Documentation<\/title>/g,
      "<title>Super-Rando-SPA - $1</title>"
    );

    // Add meta description if not present
    if (!content.includes('meta name="description"')) {
      content = content.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="Complete documentation for Super-Rando Single Page Application - Modern restaurant ordering system built with vanilla JavaScript">'
      );
    }

    // Add favicon link if not present
    if (!content.includes("favicon")) {
      content = content.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <link rel="icon" type="image/x-icon" href="../assets/icons/favicon.ico">'
      );
    }

    fs.writeFileSync(filePath, content, "utf8");
  } catch (error) {
    console.error(
      `❌ Error updating navigation in ${path.basename(filePath)}:`,
      error.message
    );
  }
};

/**
 * Adds custom footer to HTML file
 * @param {string} filePath - Path to the HTML file
 */
const addCustomFooter = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Replace empty footer with custom content
    content = content.replace(
      /<footer>\s*<\/footer>/g,
      `<footer>
    <div class="footer-content">
        <p>&copy; 2024 Super-Rando-SPA Documentation | Built with ❤️ using JSDoc</p>
        <p>Modern restaurant ordering system with vanilla JavaScript</p>
    </div>
</footer>`
    );

    fs.writeFileSync(filePath, content, "utf8");
  } catch (error) {
    console.error(
      `❌ Error adding footer to ${path.basename(filePath)}:`,
      error.message
    );
  }
};

/**
 * Recursively finds all HTML files in a directory
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of HTML file paths
 */
const findHtmlFiles = (dir) => {
  const files = [];

  const scanDirectory = (currentDir) => {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        scanDirectory(itemPath);
      } else if (item.endsWith(".html")) {
        files.push(itemPath);
      }
    }
  };

  scanDirectory(dir);
  return files;
};

/**
 * Main function to process all HTML files
 */
const main = () => {
  checkDocsDirectory();

  const htmlFiles = findHtmlFiles(DOCS_DIR);

  console.log(`📁 Found ${htmlFiles.length} HTML files to process`);

  // Process each HTML file
  htmlFiles.forEach((file) => {
    addCustomCSS(file);
    updateNavigation(file);
    addCustomFooter(file);
  });

  console.log(
    "🎉 Custom styling successfully applied to all documentation files!"
  );
  console.log(`📁 Files processed: ${htmlFiles.length}`);
  console.log("🌐 Serve documentation with: npm run docs:serve");
};

// Run the script
main();
