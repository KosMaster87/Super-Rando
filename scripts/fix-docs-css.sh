#!/bin/bash

# Fix JSDoc CSS for Super-Rando-SPA Documentation
# Adds custom styling to all generated HTML files

echo "🎨 Applying custom styling to JSDoc documentation..."

# Directory containing the generated docs
DOCS_DIR="./docs"

# Check if docs directory exists
if [ ! -d "$DOCS_DIR" ]; then
    echo "❌ Error: Documentation directory not found. Run 'npm run docs:generate' first."
    exit 1
fi

# Function to add custom CSS link to HTML files
add_custom_css() {
    local file="$1"
    
    # Check if custom CSS link already exists
    if grep -q "custom-jsdoc.css" "$file"; then
        echo "⏭️  Custom CSS already linked in $(basename "$file")"
        return
    fi
    
    # Add custom CSS link after the existing jsdoc.css link
    sed -i 's|<link type="text/css" rel="stylesheet" href="styles/jsdoc.css">|<link type="text/css" rel="stylesheet" href="styles/jsdoc.css">\n    <link type="text/css" rel="stylesheet" href="styles/custom-jsdoc.css">|' "$file"
    
    echo "✅ Added custom CSS link to $(basename "$file")"
}

# Process all HTML files in the docs directory
find "$DOCS_DIR" -name "*.html" -type f | while read -r file; do
    add_custom_css "$file"
done

# Update navigation titles and meta information
update_navigation() {
    local file="$1"
    
    # Update page titles to be more descriptive
    sed -i 's|<title>Home - Documentation</title>|<title>Super-Rando-SPA - Restaurant Documentation</title>|' "$file"
    sed -i 's|<title>\(.*\) - Documentation</title>|<title>Super-Rando-SPA - \1</title>|' "$file"
    
    # Add meta description if not present
    if ! grep -q "meta name=\"description\"" "$file"; then
        sed -i 's|<meta name="viewport" content="width=device-width, initial-scale=1.0">|<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="Complete documentation for Super-Rando Single Page Application - Modern restaurant ordering system built with vanilla JavaScript">|' "$file"
    fi
    
    # Add favicon link if not present
    if ! grep -q "favicon" "$file"; then
        sed -i 's|<meta name="viewport" content="width=device-width, initial-scale=1.0">|<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <link rel="icon" type="image/x-icon" href="../assets/icons/favicon.ico">|' "$file"
    fi
}

# Apply navigation updates to all HTML files
find "$DOCS_DIR" -name "*.html" -type f | while read -r file; do
    update_navigation "$file"
done

# Create a custom footer for better branding
add_custom_footer() {
    local file="$1"
    
    # Replace empty footer with custom content
    sed -i 's|<footer>\s*</footer>|<footer>\n    <div class="footer-content">\n        <p>&copy; 2024 Super-Rando-SPA Documentation | Built with ❤️ using JSDoc</p>\n        <p>Modern restaurant ordering system with vanilla JavaScript</p>\n    </div>\n</footer>|' "$file"
}

# Apply custom footer to all HTML files
find "$DOCS_DIR" -name "*.html" -type f | while read -r file; do
    add_custom_footer "$file"
done

echo "🎉 Custom styling successfully applied to all documentation files!"
echo "📁 Files processed: $(find "$DOCS_DIR" -name "*.html" -type f | wc -l)"
echo "🌐 Serve documentation with: npm run docs:serve"