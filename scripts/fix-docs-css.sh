#!/bin/bash

# Super-Rando-SPA Documentation CSS Fixer
# Adds Super-Rando theme CSS link to all generated JSDoc HTML files

DOCS_DIR="./docs"
CSS_LINK='    <link rel="stylesheet" href="styles/super-rando-theme.css" />'

echo "🎨 Adding Super-Rando theme CSS to JSDoc documentation..."
echo ""

# Check if docs directory exists
if [ ! -d "$DOCS_DIR" ]; then
    echo "❌ Docs directory not found. Please run JSDoc first."
    exit 1
fi

# Counter for processed files
count=0

# Find all HTML files and process them
for file in $(find "$DOCS_DIR" -name "*.html" -type f); do
    # Check if CSS link already exists
    if grep -q "super-rando-theme.css" "$file"; then
        echo "⚠️  CSS already exists in: $(basename "$file")"
        continue
    fi
    
    # Add CSS link after jsdoc.css line
    if grep -q "jsdoc.css" "$file"; then
        # Create backup
        cp "$file" "${file}.bak"
        
        # Insert CSS link after jsdoc.css
        sed '/jsdoc\.css/a\
    <link rel="stylesheet" href="styles/super-rando-theme.css" />' "${file}.bak" > "$file"
        
        # Remove backup if successful
        if [ $? -eq 0 ]; then
            rm "${file}.bak"
            echo "✅ Added Super-Rando theme CSS to: $(basename "$file")"
            ((count++))
        else
            # Restore backup on error
            mv "${file}.bak" "$file"
            echo "❌ Failed to process: $(basename "$file")"
        fi
    else
        echo "⚠️  No jsdoc.css found in: $(basename "$file")"
    fi
done

echo ""
if [ $count -gt 0 ]; then
    echo "🎉 Successfully processed $count documentation files!"
    echo "💡 Your documentation now uses the Super-Rando-SPA theme."
else
    echo "ℹ️  No files needed processing (CSS links already exist)."
fi

# Check if CSS file exists
if [ ! -f "$DOCS_DIR/styles/super-rando-theme.css" ]; then
    echo ""
    echo "⚠️  Warning: super-rando-theme.css not found in docs/styles directory!"
    echo "   Make sure the CSS file exists in the docs/styles folder."
fi