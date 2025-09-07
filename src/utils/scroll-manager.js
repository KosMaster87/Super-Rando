import { isCartVisible } from "../state.js";

/**
 * Manages hiding the scrollbar on mobile devices when the cart is open.
 */
export class ScrollManager {
  /**
   * Initializes the ScrollManager as a state listener.
   * Registers the cart visibility handler to state changes and window resize events.
   * @param {Object} appState - The state object for listener registration
   */
  static init(appState) {
    appState.listeners.push(() => this.handleCartVisibilityChange());
    window.addEventListener("resize", () => this.handleCartVisibilityChange());
    this.handleCartVisibilityChange();
  }

  /**
   * Handles changes in cart visibility.
   * Adds or removes the "no-scroll" class on the body depending on cart visibility and device width.
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
