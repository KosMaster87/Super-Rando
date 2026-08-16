# Super~Rando SPA - Fusion Cuisine Restaurant

A Single Page Application for a fictional fusion restaurant, built with Vanilla JavaScript,
CSS, and a PHP contact-form backend. No external frontend framework.

---

## Live

| Environment       | URL                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **App**           | [super-rando.dev2ksoftware.com](https://super-rando.dev2ksoftware.com)                      |
| **Documentation** | [super-rando.dev2ksoftware.com/docs](https://super-rando.dev2ksoftware.com/docs/index.html) |

---

## Preview

![Super~Rando Screenshot](./assets/images/Super~Rando.avif)

---

## Core Features

- 100% Vanilla JavaScript - no external dependencies
- Mobile-first responsive layout (CSS Grid & Flexbox)
- Shopping cart with LocalStorage persistence
- Contact form with honeypot + math-captcha spam protection
- Toast notifications
- Accessibility: ARIA attributes, keyboard navigation

## Quick Start

```bash
pnpm install
pnpm run dev
# → opens http://localhost:3000
```

## Structure

```text
super-rando/
├── src/
│   ├── app.js                   # App entry point
│   ├── state.js                 # Central state + getter/setter
│   ├── components/              # UI components (incl. pages/)
│   ├── services/                # Business logic
│   └── utils/                   # Utility functions & constants
├── styles/components/           # Component-based CSS
├── assets/                      # Images, icons, PWA manifest
└── api/contact.php              # Contact-form backend endpoint
```

## Architecture

**State management** - getter/setter pattern, no direct mutation:

```js
export const getCartItems = () => [...appState.cart];
export const setCurrentPage = (page) => {
  notifyListeners();
};
```

**Event-driven rendering** - state change triggers a full re-render:

```js
cart.add() → notifyListeners() → renderAllComponents()
```

**Coding standard** - every function stays under 14 lines, single responsibility.

## Contact API

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

Rate-limited to 3 requests/hour per IP, honeypot + math-captcha spam protection, dual email
system (admin + confirmation), HTML email templates, input sanitization on client and
server.

The productive PHP configuration for the contact form stays local and is gitignored; only an
example file without real credentials is versioned.

## JSDoc

```bash
pnpm run docs         # generate into docs/
pnpm run docs:serve   # serve locally on port 8080
```

## License

No project license file is currently included.
