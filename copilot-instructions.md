# Copilot Instructions for Super-Rando-SPA

## Project Conventions

- Always use `getElementById` for DOM access in all JavaScript files. No `querySelector` or `getElementsByClassName`.
- Always use classes (`.css`) with hyphens for CSS styling (e.g., `.main-header`).
- Always use IDs (`id="..."`) in HTML in camelCase style for JavaScript selectors (e.g. `mainHeader`).
- IDs are exclusively reserved for JavaScript access.
- Classes are exclusively reserved for CSS styles.
- Always use `const` and `let`, never `var`.

## JavaScript Function Guidelines

- Each function may be a maximum of 14 lines long.
- Each function should have only one single, clearly defined task.
- Split complex functions into smaller helper functions.
- Do not use nested functions.
- When exceeding the line limit: split function into multiple specialized functions.
- Prefer arrow functions, except for constructors or event handlers that need `this`.

## JSDoc Requirements

- All JavaScript functions must have JSDoc comments in English.
- Use JSDoc format: `/** */`
- Short, concise description of the function's task.
- Document parameters with `@param {type} name - Description`.
- Document return values with `@returns {type} Description`.
- For async functions: use `@async`.

## Reactive UI Updates

- Always control UI changes via central state objects and render functions.
- No direct DOM manipulations outside of render functions.
- State changes always trigger re-rendering of affected UI components.
- Register event listeners only once during initialization.

## State Management Pattern

- Central state object in `state.js` with the following structure:
  - `currentPage`: Current page view
  - `cart`: Shopping cart items (Array with {name, price, quantity})
  - `dishes`: Available dishes (Array with {name, price, description, image})
  - `listeners`: Event listeners for state changes
  - `userPreferences`: UI preferences (theme, notifications, etc.)
  - `notifications`: Notification messages array
  - `selectedCategory`: Currently selected product category
- **Getter Functions**: Always use getter functions for safe state access (e.g., `getCartItems()`, `getCurrentPage()`)
- **Setter Functions**: All state changes only through specialized setter functions (e.g., `setCurrentPage()`, `addCartItem()`)
- Each state change triggers re-rendering of affected components via `notifyListeners()`.
- No global variables outside the state object.
- Immutable updates: Never mutate state directly, always create new objects/arrays.
- LocalStorage for cart persistence and user preferences.
- Session storage for navigation state persistence.

## File Structure

- `/index.html` – Entry point, contains only minimal structure and script/style includes.
- `/src/app.js` – Entry point for SPA logic and state management.
- `/src/state.js` – Central state object and state management functions.
- `/src/components/` – Reusable UI components as JS modules.
- `/src/components/pages/` – Page-specific components (home-page.js, contact-page.js, etc.).
- `/src/utils/` – Helper functions and constants.
- `/src/services/` – State manipulation services and business logic (cart.js, navigation.js, contact-form.js).
- `/styles/` – All CSS files, separated by components or features.
- `/assets/icons/` – Icon files (PNG, SVG).
- `/assets/images/` – Product and content images.
- `/api/` – Backend API endpoints (PHP files).

## Error Handling

- Only in development mode:
  <!-- - Use try-catch blocks for potentially error-prone operations. -->
  <!-- - Meaningful error messages in English for consistency. -->
  <!-- - Use console.error for debugging information. -->

## API and Backend Integration

- Organize API endpoints in `/api/` directory.
- Use Fetch API for all HTTP requests, never XMLHttpRequest.
- Prefer async/await for asynchronous operations.
- Implement proper error handling for all API calls.
- Provide loading states for forms and user feedback.
- Configure CORS headers correctly for production domain.
- Perform input validation both client-side (JavaScript) and server-side (PHP).
- Do not store sensitive data in frontend code.

## Security

- XSS protection: Sanitize all user inputs before inserting into DOM.
- CSRF protection for forms where necessary.
- Consider rate limiting for API endpoints.
- Set Content Security Policy (CSP) headers.
- Implement input length validation.
- **Honeypot fields**: Hidden form fields for bot protection.
- **Math captcha**: Simple math problems as CAPTCHA alternative.
- **Rate limiting**: IP-based request limiting.

## Additional Best Practices

- No inline styles or inline event handlers in HTML.
- No magic numbers or strings – use constants instead.
- **ECMAScript Modules**: Use exclusively modern ES6+ modules (`import`/`export`). No CommonJS (`require`/`module.exports`). Target: `module: "es2020"`.
- **CSS Custom Properties (Variables)**: Define all colors via CSS variables in :root. No hex codes directly in CSS.
- **Relative Units**: Use `rem` for sizes, spacing, and font sizes. Use `px` for borders, box-shadow, and @media. Round to two decimal places.
- Consistent color palette: Define primary, secondary, accent, and neutral colors.
- Name components and functions clearly.
- No duplicate IDs or class names.
- **Mobile First Design**: Develop styles first for mobile devices, then extend with media queries for larger screens.
- Ensure responsive design with CSS - Breakpoints: 768px (Tablet), 1024px (Desktop), 1280px (Large Desktop).
- Touch-friendly buttons and interaction elements (min. 2.75rem height).
- Consider accessibility (a11y): Semantic HTML, ARIA attributes where necessary.
- Consistent code formatting (e.g., Prettier, EditorConfig).
- No external frameworks or libraries.
- No direct manipulation of state object outside setter functions.
- Performance: Use debouncing for frequent events (Input, Scroll).

## UI/UX Patterns

- **Notification System**: Use modal system instead of browser alerts. Types: success, error, warning, info.
- **Loading States**: Always provide visual feedback for asynchronous operations (change button text, spinner, etc.).
- **Form Validation**: Validate both client-side and server-side. User-friendly error messages in English.
- **Accessibility**: Focus management for modals, keyboard navigation, screen reader friendly.
- **Animation**: Subtle animations for better UX (fadeIn, slideUp, etc.).

## Service Layer Architecture

- **Separation of Concerns**: Split presentation logic (components) and business logic (services).
- **Form Services**: Extract form handling logic into dedicated service files (e.g., `contact-form.js`).
- **State Services**: Centralize state management in service files (e.g., `cart.js`, `navigation.js`).
- **Event Services**: Handle DOM events in dedicated service files (e.g., `cart-events.js`, `dish-events.js`).

## Email System

- **Dual Email System**: Notification to admin + confirmation to sender.
- **HTML Email Templates**: Responsive and attractively designed email templates.
- **Email Headers**: Set correct MIME types, From/Reply-To headers.
- **Logging**: Log all email activities for debugging.

## Language Standards

- **Code Comments**: All JSDoc comments and code comments in English.
- **User Interface**: All user-facing text in English for consistency.
- **Error Messages**: All error messages in English.
- **Console Logs**: All console outputs in English.
