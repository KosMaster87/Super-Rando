import { appState } from "../state.js";

/**
 * Verwaltet das Ausblenden des Scrollbalkens auf Mobile-Geräten bei geöffnetem Warenkorb
 */
export class ScrollManager {
  /**
   * Initialisiert den ScrollManager als State-Listener
   */
  static init() {
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

    if (isMobile && appState.cartVisible) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  }
}
