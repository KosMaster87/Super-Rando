/**
 * Rendert die Home-Seite
 * @returns {string} HTML-String für Home-Seite
 */
export const renderHomePage = () => {
  return `
    <section class="welcome-content">
      <h1 class="page-title">Willkommen bei Super~Rando</h1>
      <p class="page-subtitle">Entdecken Sie unsere Fusion-Küche</p>

      ${createDailySpecials()}
      ${createPopularDish()}
    </section>
  `;
};

/**
 * Erstellt die Tagesspecials-Sektion
 * @returns {string} HTML-String für Tagesspecials
 */
const createDailySpecials = () => {
  return `
    <section class="daily-specials">
      ${createMainDishCard()}
      ${createAppetizerCard()}
      ${createDessertSelection()}
    </section>
  `;
};

/**
 * Erstellt die Hauptgericht-Karte
 * @returns {string} HTML-String für Hauptgericht
 */
const createMainDishCard = () => {
  return `
    <div class="special-card main-dish">
      <div class="special-badge">🍜 Tagesgericht</div>
      <h3 class="special-title">Ramen Fusion Bowl</h3>
      <p class="special-description">
        Hausgemachte Ramen-Nudeln mit gebratenem Hühnchen, Shiitake-Pilzen und Miso-Brühe
      </p>
      <div class="special-price">12.50 €</div>
      <button class="special-order-btn" id="orderRamenBowl">Bestellen</button>
    </div>
  `;
};

/**
 * Erstellt die Vorspeisen-Karte
 * @returns {string} HTML-String für Vorspeise
 */
const createAppetizerCard = () => {
  return `
    <div class="special-card appetizer">
      <div class="special-badge">🥗 Vorspeise</div>
      <h3 class="special-title">Gyoza-Salat</h3>
      <p class="special-description">
        Knusprige Gyoza auf gemischtem Salat mit hausgemachtem Sesam-Ingwer-Dressing
      </p>
      <div class="special-price">6.50 €</div>
      <button class="special-order-btn" id="orderGyozaSalad">Bestellen</button>
    </div>
  `;
};

/**
 * Erstellt die Dessert-Auswahl
 * @returns {string} HTML-String für Dessert-Auswahl
 */
const createDessertSelection = () => {
  return `
    <div class="dessert-selection">
      <div class="special-badge">🍰 Nachgang</div>
      <h3 class="special-title">Wählen Sie Ihren Nachgang</h3>
      
      <div class="dessert-options">
        <div class="dessert-option">
          <input type="radio" id="matchaTiramisu" name="dessert" value="matcha" />
          <label for="matchaTiramisu" class="dessert-card">
            <h4 class="dessert-name">Matcha Tiramisu</h4>
            <p class="dessert-desc">Italienisches Tiramisu mit japanischem Matcha-Twist</p>
            <span class="dessert-price">5.50 €</span>
          </label>
        </div>
        
        <div class="dessert-option">
          <input type="radio" id="mochiEis" name="dessert" value="mochi" />
          <label for="mochiEis" class="dessert-card">
            <h4 class="dessert-name">Mochi Eis Variation</h4>
            <p class="dessert-desc">3 verschiedene Mochi-Eis-Sorten: Vanille, Erdbeere, Grüner Tee</p>
            <span class="dessert-price">6.00 €</span>
          </label>
        </div>
      </div>
      
      <button class="special-order-btn dessert-order-btn" id="orderDessert" disabled>
        Nachgang bestellen
      </button>
    </div>
  `;
};

/**
 * Erstellt das beliebte Gericht
 * @returns {string} HTML-String für beliebtes Gericht
 */
const createPopularDish = () => {
  return `
    <section class="popular-dish">
      <div class="special-badge">⭐ Unser Beliebtestes</div>
      <div class="popular-dish-content">
        <div class="popular-dish-image">
          <img src="./assets/images/Spagetti-01.jpg" alt="Spaghetti Carbonara" />
        </div>
        <div class="popular-dish-info">
          <h3 class="popular-title">Spaghetti Carbonara Fusion</h3>
          <p class="popular-description">
            Unsere moderne Interpretation des italienischen Klassikers: Handgemachte Spaghetti 
            mit cremiger Eier-Parmesan-Sauce, knusprigem Pancetta und einem Hauch von Yuzu-Zitrus. 
            Ein perfektes Beispiel für unsere Fusion-Philosophie.
          </p>
          <div class="popular-features">
            <span class="feature">🌟 Meist bestellt</span>
            <span class="feature">👨‍🍳 Chef's Special</span>
            <span class="feature">🔥 Frisch zubereitet</span>
          </div>
          <div class="popular-footer">
            <div class="popular-price">10.00 €</div>
            <button class="popular-order-btn" id="orderCarbonara">
              Jetzt probieren!
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
};
