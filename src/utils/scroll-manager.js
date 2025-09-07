import { isCartVisible } from "../state.js";

/**
 * Verwaltet das Ausblenden des Scrollbalkens auf Mobile-Geräten bei geöffnetem Warenkorb
 */
export class ScrollManager {
  /**
   * Initialisiert den ScrollManager als State-Listener
   * @param {Object} appState - State-Objekt für Listener-Registrierung
   */
  static init(appState) {
    appState.listeners.push(() => this.handleCartVisibilityChange());
    window.addEventListener("resize", () => this.handleCartVisibilityChange());
    this.handleCartVisibilityChange();
  }

  /**
   * Reagiert auf Änderungen der Warenkorb-Sichtbarkeit
   */
  static handleCartVisibilityChange() {
    const body = document.body;
    const isMobile = window.innerWidth <= 768;

    if (isMobile && isCartVisible()) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  }
}
