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

## File Structure

- `/index.html` – Einstiegspunkt, enthält nur minimale Struktur und Script-/Style-Einbindungen.
- `/src/app.js` – Einstiegspunkt für die SPA-Logik und State-Management.
- `/src/components/` – Wiederverwendbare UI-Komponenten als JS-Module.
- `/src/state.js` – Zentrales State-Objekt und State-Management-Funktionen.
- `/src/utils/` – Hilfsfunktionen.
- `/styles/` – Alle CSS-Dateien, nach Komponenten oder Features getrennt.

## State Management Pattern

- Zentrales State-Objekt in `state.js`.
- State-Änderungen nur über spezialisierte Setter-Funktionen.
- Jede State-Änderung triggert ein Re-Rendern der betroffenen Komponenten.
- Keine globalen Variablen außerhalb des State-Objekts.
- Immutable Updates: State nie direkt mutieren, sondern neue Objekte/Arrays erstellen.

## Error Handling

- Try-catch Blöcke für potentiell fehlerhafte Operationen verwenden.
- Aussagekräftige Fehlermeldungen in deutscher Sprache.
- Console.error für Debugging-Informationen nutzen.

## Weitere Best Practices

- Keine Inline-Styles oder Inline-Eventhandler im HTML.
- Keine Magic Numbers oder Strings – stattdessen Konstanten verwenden.
- Komponenten und Funktionen klar benennen.
- Keine doppelten IDs oder Klassennamen.
- Responsive Design mit CSS sicherstellen.
- Accessibility (a11y) beachten: Semantisches HTML, ARIA-Attribute wo nötig.
- Konsistente Code-Formatierung (z.B. Prettier, EditorConfig).
- Keine externen Frameworks oder Libraries verwenden.
- Keine direkten Manipulationen am State-Objekt außerhalb der Setter-Funktionen.
- Performance: Debouncing für häufige Events (Input, Scroll) verwenden.
