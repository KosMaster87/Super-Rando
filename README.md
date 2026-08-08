# 🍜 Super~Rando SPA - Fusion Cuisine Restaurant

A modern Single Page Application (SPA) for a fusion restaurant, developed with **Vanilla JavaScript, CSS, and PHP backend**. This project demonstrates professional frontend architecture without any external frameworks.

---

## 🚀 Live Demo

🔗 [Live Demo – super-rando.dev2k.org](https://super-rando.dev2k.org)

🔗 [API Dokumentation](https://super-rando.dev2k.org/docs/index.html)

---

## 📸 Preview

![Portfolio Screenshot](./assets/images/Super~Rando.avif)

---

## ✨ Core Features

- 🌱 **100% Vanilla JavaScript** - No external dependencies
- 🎨 **Mobile First Responsive** - CSS Grid & Flexbox
- 🛒 **Smart Shopping Cart** - LocalStorage persistent
- 📧 **Secure Contact Form** - Spam protection & email confirmation
- 🔔 **Toast Notifications** - User-friendly feedback
- ♿ **Accessibility Ready** - ARIA & keyboard navigation

## 🚀 Quick Start

```bash
npm install
npm run dev
# → Automatically opens http://localhost:3000
```

## 🏗️ Architecture Highlights

### State Management ✅

```js
// Getter/Setter pattern for secure state access
export const getCartItems = () => [...appState.cart];
export const setCurrentPage = (page) => { notifyListeners(); };

// Reactive UI Updates
State change → notifyListeners() → automatic re-rendering
```

### Service Layer ✅

```
src/services/
├── cart.js           # Cart logic
├── navigation.js     # SPA routing
├── contact-form.js   # Form handling
└── notification.js   # Toast system
```

### 14-Line Functions ✅

```js
// Each function max. 14 lines, single responsibility
const handleCartClick = (itemName) => {
  updateCartItem(itemName, { quantity: item.quantity + 1 });
  saveCartToStorage();
  notifyListeners();
};
```

## 📁 Project Structure

```
Super-Rando-SPA/
├── src/
│   ├── app.js                   # App entry point
│   ├── state.js                 # Central state + getter/setter
│   ├── components/              # UI components
│   │   ├── pages/               # Page-specific components
│   │   ├── cart.js, header.js   # Reusable components
│   ├── services/                # Business logic
│   └── utils/                   # Utility functions & constants
├── styles/components/           # Component-based CSS
├── assets/                      # Images, icons, PWA manifest
└── api/contact.php              # Backend endpoint
```

## 🔧 Implemented Standards

### JavaScript ✅

- **ES6+ Modules** - Consistent import/export usage
- **14-Line Rule** - All functions comply
- **JSDoc Documentation** - All public functions
- **Immutable Updates** - State never mutated directly
- **Arrow Functions** - Modern syntax

### CSS ✅

- **Mobile First** - Breakpoints: 768px, 1024px, 1280px
- **CSS Custom Properties** - All colors as variables
- **Relative Units** - rem for sizing, px for borders
- **BEM-like Classes** - Consistent naming convention

### Security ✅

- **Honeypot Fields** - Bot protection
- **Math Captcha** - User-friendly spam prevention
- **Rate Limiting** - IP-based request limit (3/hour)
- **Input Sanitization** - XSS protection on client & server

## 🌟 Special Features

### Reactive UI Without Framework

```js
// Event-driven architecture
cart.add() → notifyListeners() → renderAllComponents() → reset events
```

### Session Restoration

```js
// Navigation & cart persist across browser reloads
localStorage: Cart + user preferences
sessionStorage: Current page + category filter
```

### Service-Oriented Architecture

```js
// Clear separation: presentation vs. business logic
Components: HTML rendering;
Services: State manipulation + API calls;
```

## 🎯 Upcoming Features

### 🚧 In Development

- [ ] **Theme System** - Dark/Light mode
- [ ] **Multi-language Support** - DE/EN toggle
- [ ] **PWA Features** - Offline functionality

### 📋 Roadmap

- [ ] **User Authentication** - Login/registration
- [ ] **Order History** - View past orders
- [ ] **Advanced Search** - Ingredient filtering
- [ ] **Push Notifications** - PWA notifications

## 📧 API Documentation

### Contact Endpoint

```bash
POST /api/contact.php
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "subject": "Reservation",
  "message": "Table for 4 persons...",
  "captcha": 42
}
```

**Features:**

- Rate limiting (3 requests/hour per IP)
- Dual email system (admin + confirmation)
- HTML email templates
- Comprehensive input validation

## 🎨 Design System

```css
:root {
  --color-primary: #ff6b6b; /* Coral */
  --color-secondary: #4ecdc4; /* Teal */
  --color-accent: #ffe66d; /* Yellow */
  --color-surface: #ffffff; /* White */
  --color-background: #f8f9fa; /* Light Gray */
}
```

**Typography:** Comic Neue (locally hosted) + system-ui fallback

## 💻 Development

### Browser Support

- ✅ Chrome/Edge/Firefox (modern versions)
- ✅ Safari (modern versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- ⚡ No framework overhead
- 📱 Touch-optimized interactions
- 💾 Aggressive LocalStorage usage
- 🎯 CSS-only animations

## 📄 License

No project license file is currently included.

---

**🍜 Built with ❤️ for modern web development**

_A showcase for professional frontend architecture with Vanilla JavaScript_

- [ ] **Order History** - Personal order overview
- [ ] **Push Notifications** - PWA notifications
- [ ] **Advanced Search** - Ingredient/allergen filtering
- [ ] **Social Sharing** - Share dishes on social media
- [ ] **Admin Dashboard** - Content Management System

### 🔍 Code Quality & Testing

- [ ] **Unit Tests** - Jest test suite
- [ ] **E2E Tests** - Playwright integration
- [ ] **Performance Monitoring** - Lighthouse CI
- [ ] **Error Logging** - Sentry integration
- [ ] **Code Coverage** - Targeting 90%+ coverage

## 🛠️ Development

### Coding Standards ✅

- All JavaScript functions max. 14 lines
- JSDoc comments for all public functions
- Consistent naming conventions (camelCase for JS, kebab-case for CSS)
- Mobile first CSS development
- No inline styles or event handlers

### Browser Support ✅

- ✅ Chrome/Edge (modern versions)
- ✅ Firefox (modern versions)
- ✅ Safari (modern versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance ✅

- ⚡ Vanilla JavaScript (no framework overhead)
- 🗜️ CSS-only animations
- 📱 Touch-optimized interactions
- 🎯 Lazy loading for images
- 💾 Aggressive LocalStorage usage

## 📧 API Endpoints

### POST /api/contact.php ✅

```js
// Contact form with spam protection
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "subject": "Reservation",
  "message": "Table for 4 persons...",
  "captcha": 42
}
```

**Features:**

- Rate limiting (3 requests/hour per IP)
- Honeypot spam protection
- HTML email templates
- Dual email system (admin + confirmation)
- Comprehensive input validation

## 🎨 Design System

### Color Palette ✅

```css
:root {
  --color-primary: #ff6b6b; /* Coral */
  --color-secondary: #4ecdc4; /* Teal */
  --color-accent: #ffe66d; /* Yellow */
  --color-surface: #ffffff; /* White */
  --color-background: #f8f9fa; /* Light Gray */
}
```

### Typography ✅

- **Primary Font:** Comic Neue (locally hosted)
- **Fallback:** system-ui, -apple-system, sans-serif
- **Sizing System:** rem-based for scalability

## 📱 Progressive Web App

### Manifest ✅

- App icons (32px to 512px)
- Offline-ready basic structure
- Theme color integration
- Display mode: standalone

### Performance Optimizations ✅

- CSS custom properties for fast theme switching
- Event delegation for better performance
- Minimal DOM manipulations via virtual-DOM-like updates

## 🔒 Security Features

### Frontend Security ✅

- XSS protection via HTML escaping
- Input length validation
- CSRF token preparation
- Honeypot anti-spam

### Backend Security ✅

- Rate limiting with IP tracking
- Input sanitization
- Email header injection protection
- Comprehensive error handling

## 🌟 Highlights

This project demonstrates modern frontend development **without external dependencies** and shows how to build a professional SPA with vanilla technologies:

- **🏆 100% Vanilla** - No framework lock-in
- **📐 Clean Architecture** - Service layer + state management
- **♿ Accessibility First** - Developed WCAG-compliant
- **🚀 Performance** - Optimized for mobile & desktop
- **🔧 Maintainable** - Modular, testable code
- **📱 Modern** - PWA-ready & future-proof

## 💻 Local Development

```bash
# Clone repository
git clone [repository-url]
cd Super-Rando-SPA

# Install dependencies
npm install

# Start development server
npm run dev

# Browser will automatically open http://localhost:3000
```

## 📄 License

No project license file is currently included.

---

**🍜 Built with ❤️ for modern web development**

_A showcase for professional frontend architecture with Vanilla JavaScript_
