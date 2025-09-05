# Copilot Instructions für Super-Rando-SPA

## Projekt-Konventionen

- Für DOM-Zugriffe in allen JavaScript-Dateien immer `getElementById` verwenden. Kein `querySelector` oder `getElementsByClassName`.
- Für Styling in CSS immer Klassen (`.css`) mit Bindestrich verwenden (z.B. `.main-header`).
- Für JavaScript-Selektoren immer IDs (`id="..."`) im HTML verwenden, im Kamelcase-Stil (z.B. `mainHeader`).
- IDs sind ausschließlich für JavaScript-Zugriffe reserviert.
- Klassen sind ausschließlich für CSS-Styles reserviert.
- Immer `const` und `let` verwenden, niemals `var`.

## JavaScript-Funktionsrichtlinien

- Jede Funktion darf maximal 14 Zeilen lang sein.
- Jede Funktion soll nur eine einzige, klar definierte Aufgabe erfüllen.
- Komplexe Funktionen in kleinere Hilfsfunktionen aufteilen.
- Keine verschachtelten Funktionen verwenden.
- Bei Überschreitung der Zeilenbegrenzung: Funktion in mehrere spezialisierte Funktionen aufteilen.
- Arrow Functions bevorzugen, außer bei Konstruktoren oder Event Handlers die `this` benötigen.

## JSDoc-Anforderungen

- Alle JavaScript-Funktionen müssen JSDoc-Kommentare auf Deutsch haben.
- JSDoc-Format verwenden: `/** */`
- Kurze, prägnante Beschreibung der Funktionsaufgabe.
- Parameter mit `@param {type} name - Beschreibung` dokumentieren.
- Rückgabewerte mit `@returns {type} Beschreibung` dokumentieren.
- Deutsche Beschreibungen und Parameter-Erklärungen verwenden.
- Bei async Funktionen: `@async` verwenden.

## Reactive UI Updates

- UI-Änderungen immer über zentrale State-Objekte und Render-Funktionen steuern.
- Keine direkten DOM-Manipulationen außerhalb der Render-Funktionen.
- State-Änderungen lösen immer ein Re-Rendering der betroffenen UI-Komponenten aus.
- Event Listeners nur einmalig beim Initialisieren registrieren.

## State Management Pattern

- Zentrales State-Objekt in `state.js` mit folgender Struktur:
  - `currentPage`: Aktuelle Seitenansicht
  - `cart`: Warenkorb-Items (Array mit {name, price, quantity})
  - `dishes`: Verfügbare Gerichte (Array mit {name, price, description, image})
  - `listeners`: Event-Listener für State-Änderungen
- State-Änderungen nur über spezialisierte Setter-Funktionen in separaten Modulen.
- Jede State-Änderung triggert ein Re-Rendern der betroffenen Komponenten über `notifyListeners()`.
- Keine globalen Variablen außerhalb des State-Objekts.
- Immutable Updates: State nie direkt mutieren, sondern neue Objekte/Arrays erstellen.
- LocalStorage für Warenkorb-Persistierung nutzen.
- State-Getter-Funktionen für sichere Datenzugriffe bereitstellen.

## File Structure

- `/index.html` – Einstiegspunkt, enthält nur minimale Struktur und Script-/Style-Einbindungen.
- `/src/app.js` – Einstiegspunkt für die SPA-Logik und State-Management.
- `/src/state.js` – Zentrales State-Objekt und State-Management-Funktionen.
- `/src/components/` – Wiederverwendbare UI-Komponenten als JS-Module.
- `/src/utils/` – Hilfsfunktionen und Konstanten.
- `/src/services/` – State-Manipulation-Services (cart.js, navigation.js).
- `/styles/` – Alle CSS-Dateien, nach Komponenten oder Features getrennt.
- `/assets/icons/` – Icon-Dateien (PNG, SVG).
- `/assets/images/` – Produkt- und Content-Bilder.

## Error Handling

- Try-catch Blöcke für potentiell fehlerhafte Operationen verwenden.
- Aussagekräftige Fehlermeldungen in deutscher Sprache.
- Console.error für Debugging-Informationen nutzen.

## API und Backend Integration

- API-Endpunkte im `/api/` Verzeichnis organisieren.
- Fetch API für alle HTTP-Requests verwenden, niemals XMLHttpRequest.
- Async/Await für asynchrone Operationen bevorzugen.
- Proper Error Handling für alle API-Calls implementieren.
- Loading States für Formulare und User-Feedback bereitstellen.
- CORS-Headers korrekt für die Produktions-Domain konfigurieren.
- Input-Validierung sowohl clientseitig (JavaScript) als auch serverseitig (PHP) durchführen.
- Keine sensiblen Daten im Frontend-Code speichern.

## Sicherheit

- XSS-Schutz: Alle User-Inputs sanitizen bevor sie ins DOM eingefügt werden.
- CSRF-Schutz für Formulare implementieren wo nötig.
- Rate-Limiting für API-Endpunkte beachten.
- Content Security Policy (CSP) Headers setzen.
- Input-Längen-Validierung implementieren.

## Weitere Best Practices

- Keine Inline-Styles oder Inline-Eventhandler im HTML.
- Keine Magic Numbers oder Strings – stattdessen Konstanten verwenden.
- **ECMAScript Modules**: Ausschließlich moderne ES6+ Module verwenden (`import`/`export`). Keine CommonJS (`require`/`module.exports`). Target: `module: "es2020"`.
- **CSS Custom Properties (Variablen)**: Alle Farben über CSS-Variablen im :root definieren. Keine Hex-Codes direkt im CSS verwenden.
- **Relative Einheiten**: `rem` für Größen, Abstände und Schriftgrößen verwenden. `px` bei Borders, box-shadow und @media verwenden. Auf zwei Dezimalstellen runden.
- Konsistente Farbpalette: Haupt-, Sekundär-, Akzent- und Neutralfarben definieren.
- Komponenten und Funktionen klar benennen.
- Keine doppelten IDs oder Klassennamen.
- **Mobile First Design**: Styles zuerst für mobile Geräte entwickeln, dann mit Media Queries für größere Bildschirme erweitern.
- Responsive Design mit CSS sicherstellen - Breakpoints: 768px (Tablet), 1024px (Desktop), 1200px (Large Desktop).
- Touch-freundliche Buttons und Interaktionselemente (min. 2.75rem Höhe).
- Accessibility (a11y) beachten: Semantisches HTML, ARIA-Attribute wo nötig.
- Konsistente Code-Formatierung (z.B. Prettier, EditorConfig).
- Keine externen Frameworks oder Libraries verwenden.
- Keine direkten Manipulationen am State-Objekt außerhalb der Setter-Funktionen.
- Performance: Debouncing für häufige Events (Input, Scroll) verwenden.

## UI/UX Patterns

- **Notification System**: Modales System statt Browser-Alerts verwenden. Typen: success, error, warning, info.
- **Loading States**: Immer visuelles Feedback bei asynchronen Operationen (Button-Text ändern, Spinner, etc.).
- **Form Validation**: Clientseitig und serverseitig validieren. Benutzerfreundliche Fehlermeldungen auf Deutsch.
- **Accessibility**: Focus-Management bei Modals, Keyboard-Navigation, Screen-Reader-freundlich.
- **Animation**: Subtile Animationen für bessere UX (fadeIn, slideUp, etc.).

## Spam-Schutz und Sicherheit

- **Honeypot-Felder**: Versteckte Formularfelder zum Bot-Schutz.
- **Math-Captcha**: Einfache Rechenaufgaben als Captcha-Alternative.
- **Rate-Limiting**: IP-basierte Begrenzung von Anfragen implementieren.
- **Input-Sanitization**: Alle Eingaben sowohl client- als auch serverseitig sanitizen.
- **Email-Validierung**: RFC-konforme Email-Validierung verwenden.

## Email-System

- **Dual-Email-System**: Benachrichtigung an Admin + Bestätigung an Absender.
- **HTML-Email-Templates**: Responsive und ansprechend gestaltete E-Mail-Vorlagen.
- **Email-Headers**: Korrekte MIME-Types, From/Reply-To Headers setzen.
- **Logging**: Alle Email-Aktivitäten protokollieren für Debugging.
