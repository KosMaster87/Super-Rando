# 🍜 Super~Rando SPA - Fusion Küche Restaurant

Eine moderne Single Page Application (SPA) für ein Fusion-Restaurant, entwickelt mit **Vanilla JavaScript, CSS und PHP Backend**. Das Projekt demonstriert professionelle Frontend-Architektur ohne externe Frameworks.

## ✨ Kern-Features

- 🌱 **100% Vanilla JavaScript** - Keine externen Dependencies
- 🎨 **Mobile First Responsive** - CSS Grid & Flexbox
- 🛒 **Smart Shopping Cart** - LocalStorage-persistent
- 📧 **Sicheres Kontaktformular** - Spam-Schutz & E-Mail-Bestätigung
- 🔔 **Toast-Benachrichtigungen** - Benutzerfreundliches Feedback
- ♿ **Accessibility-Ready** - ARIA & Keyboard-Navigation

## 🚀 Quick Start

```bash
npm install
npm run dev
# → Öffnet automatisch http://localhost:3000
```

## 🏗️ Architektur-Highlights

### State Management ✅

```js
// Getter/Setter Pattern für sicheren State-Zugriff
export const getCartItems = () => [...appState.cart];
export const setCurrentPage = (page) => { notifyListeners(); };

// Reactive UI Updates
State-Änderung → notifyListeners() → automatisches Re-Rendering
```

### Service Layer ✅

```
src/services/
├── cart.js           # Warenkorb-Logik
├── navigation.js     # SPA-Routing
├── contact-form.js   # Formular-Handling
└── notification.js   # Toast-System
```

### 14-Zeilen-Funktionen ✅

```js
// Jede Funktion max. 14 Zeilen, Single Responsibility
const handleCartClick = (itemName) => {
  updateCartItem(itemName, { quantity: item.quantity + 1 });
  saveCartToStorage();
  notifyListeners();
};
```

## 📁 Projektstruktur

```
Super-Rando-SPA/
├── src/
│   ├── app.js                   # App-Einstiegspunkt
│   ├── state.js                 # Zentraler State + Getter/Setter
│   ├── components/              # UI-Komponenten
│   │   ├── pages/               # Seiten-spezifische Komponenten
│   │   ├── cart.js, header.js   # Wiederverwendbare Komponenten
│   ├── services/                # Business Logic
│   └── utils/                   # Hilfsfunktionen & Konstanten
├── styles/components/           # Komponenten-basiertes CSS
├── assets/                      # Bilder, Icons, PWA-Manifest
└── api/contact.php              # Backend-Endpunkt
```

## 🔧 Implementierte Standards

### JavaScript ✅

- **ES6+ Modules** - Import/Export durchgängig
- **14-Zeilen-Regel** - Alle Funktionen eingehalten
- **JSDoc-Dokumentation** - Alle öffentlichen Funktionen
- **Immutable Updates** - State nie direkt mutiert
- **Arrow Functions** - Moderne Syntax

### CSS ✅

- **Mobile First** - Breakpoints: 768px, 1024px, 1280px
- **CSS Custom Properties** - Alle Farben als Variablen
- **Relative Einheiten** - rem für Größen, px für Borders
- **BEM-ähnliche Klassen** - Konsistente Namensgebung

### Sicherheit ✅

- **Honeypot-Felder** - Bot-Schutz
- **Math-Captcha** - Benutzerfreundliche Spam-Abwehr
- **Rate-Limiting** - IP-basierte Anfragebegrenzung (3/Stunde)
- **Input-Sanitization** - XSS-Schutz client- & serverseitig

## 🌟 Besonderheiten

### Reactive UI ohne Framework

```js
// Event-getriebene Architektur
cart.add() → notifyListeners() → renderAllComponents() → Events neu setzen
```

### Session-Wiederherstellung

```js
// Navigation & Warenkorb überleben Browser-Reload
localStorage: Warenkorb + User-Preferences
sessionStorage: Aktuelle Seite + Kategorie-Filter
```

### Service-orientierte Architektur

```js
// Klare Trennung: Presentation vs. Business Logic
Components: HTML - Rendering;
Services: State - Manipulation + API - Calls;
```

## 🎯 Nächste Features

### 🚧 In Entwicklung

- [ ] **Theme System** - Dark/Light Mode
- [ ] **Mehrsprachigkeit** - DE/EN Toggle
- [ ] **PWA-Features** - Offline-Funktionalität

### 📋 Roadmap

- [ ] **User Authentication** - Login/Registrierung
- [ ] **Order History** - Bestellübersicht
- [ ] **Advanced Search** - Zutaten-Filter
- [ ] **Push Notifications** - PWA-Benachrichtigungen

## 📧 API-Dokumentation

### Contact Endpoint

```bash
POST /api/contact.php
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "subject": "Reservierung",
  "message": "Tisch für 4 Personen...",
  "captcha": 42
}
```

**Features:**

- Rate-Limiting (3 Anfragen/Stunde pro IP)
- Dual-E-Mail-System (Admin + Bestätigung)
- HTML-E-Mail-Templates
- Umfassende Eingabe-Validierung

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

**Typography:** Comic Neue (lokal gehostet) + system-ui Fallback

## 💻 Entwicklung

### Browser-Support

- ✅ Chrome/Edge/Firefox (moderne Versionen)
- ✅ Safari (moderne Versionen)
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)

### Performance

- ⚡ Kein Framework-Overhead
- 📱 Touch-optimierte Interaktionen
- 💾 Aggressive LocalStorage-Nutzung
- 🎯 CSS-only Animationen

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

---

**🍜 Entwickelt mit ❤️ für moderne Web-Entwicklung**

_Ein Showcase für professionelle Frontend-Architektur mit Vanilla JavaScript_

- [ ] **Bestellhistorie** - Persönliche Bestellübersicht
- [ ] **Push Notifications** - PWA-Benachrichtigungen
- [ ] **Erweiterte Suche** - Filterung nach Zutaten/Allergenen
- [ ] **Social Sharing** - Gerichte in sozialen Medien teilen
- [ ] **Admin Dashboard** - Content Management System

### 🔍 Code Quality & Testing

- [ ] **Unit Tests** - Jest Test Suite
- [ ] **E2E Tests** - Playwright Integration
- [ ] **Performance Monitoring** - Lighthouse CI
- [ ] **Error Logging** - Sentry Integration
- [ ] **Code Coverage** - 90%+ Abdeckung anstreben

## 🛠️ Entwicklung

### Coding Standards ✅

- Alle JavaScript-Funktionen max. 14 Zeilen
- JSDoc-Kommentare für alle öffentlichen Funktionen
- Konsistente Namenskonventionen (camelCase für JS, kebab-case für CSS)
- Mobile First CSS-Entwicklung
- Keine inline Styles oder Event-Handler

### Browser-Unterstützung ✅

- ✅ Chrome/Edge (moderne Versionen)
- ✅ Firefox (moderne Versionen)
- ✅ Safari (moderne Versionen)
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)

### Performance ✅

- ⚡ Vanilla JavaScript (kein Framework-Overhead)
- 🗜️ CSS-only Animationen
- 📱 Touch-optimierte Interaktionen
- 🎯 Lazy Loading für Bilder
- 💾 Aggressive LocalStorage-Nutzung

## 📧 API-Endpunkte

### POST /api/contact.php ✅

```js
// Kontaktformular mit Spam-Schutz
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "subject": "Reservierung",
  "message": "Tisch für 4 Personen...",
  "captcha": 42
}
```

**Features:**

- Rate-Limiting (3 Anfragen/Stunde pro IP)
- Honeypot-Spam-Schutz
- HTML-E-Mail-Templates
- Dual-E-Mail-System (Admin + Bestätigung)
- Umfassende Eingabe-Validierung

## 🎨 Design System

### Farbpalette ✅

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

- **Primary Font:** Comic Neue (lokal gehostet)
- **Fallback:** system-ui, -apple-system, sans-serif
- **Größensystem:** rem-basiert für Skalierbarkeit

## 📱 Progressive Web App

### Manifest ✅

- App-Icons (32px bis 512px)
- Offline-fähige Grundstruktur
- Theme-Color Integration
- Display-Mode: standalone

### Performance-Optimierungen ✅

- CSS Custom Properties für schnelle Theme-Wechsel
- Event-Delegation für bessere Performance
- Minimal-DOM-Manipulationen durch Virtual-DOM-ähnliche Updates

## 🔒 Sicherheitsfeatures

### Frontend-Sicherheit ✅

- XSS-Schutz durch HTML-Escaping
- Input-Längen-Validierung
- CSRF-Token-Vorbereitung
- Honeypot-Anti-Spam

### Backend-Sicherheit ✅

- Rate-Limiting mit IP-Tracking
- Input-Sanitization
- E-Mail-Header-Injection-Schutz
- Umfassende Error-Behandlung

## 🌟 Highlights

Das Projekt demonstriert moderne Frontend-Entwicklung **ohne externe Abhängigkeiten** und zeigt, wie ein professionelles SPA mit Vanilla-Technologien umgesetzt werden kann:

- **🏆 100% Vanilla** - Kein Framework-Lock-in
- **📐 Saubere Architektur** - Service Layer + State Management
- **♿ Accessibility First** - WCAG-konform entwickelt
- **🚀 Performance** - Optimiert für Mobile & Desktop
- **🔧 Wartbar** - Modularer, testbarer Code
- **📱 Modern** - PWA-Ready & Future-Proof

## 💻 Lokale Entwicklung

```bash
# Repository klonen
git clone [repository-url]
cd Super-Rando-SPA

# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Browser öffnet automatisch http://localhost:3000
```

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

---

**🍜 Entwickelt mit ❤️ für moderne Web-Entwicklung**

_Ein Showcase für professionelle Frontend-Architektur mit Vanilla JavaScript_
