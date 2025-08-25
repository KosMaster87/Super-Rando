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
      ${createMenuBundle()}
    </section>
  `;
};

/**
 * Erstellt das Tagesmenü-Bundle
 * @returns {string} HTML-String für Menü-Bundle
 */
const createMenuBundle = () => {
  return `
    <div class="menu-bundle">
      <div class="special-badge">🍽️ Tagesmenü</div>
      <h3 class="special-title">Fusion Tagesmenü</h3>
      <p class="special-description">
        Unser beliebtes 3-Gang-Menü: Ramen Fusion Bowl, Gyoza-Salat und Ihr Wunsch-Dessert
      </p>
      
      <div class="menu-items">
        <div class="menu-item">
          <div class="menu-item-icon">🍜</div>
          <div class="menu-item-content">
            <h4 class="menu-item-name">Ramen Fusion Bowl</h4>
            <p class="menu-item-desc">Hausgemachte Ramen-Nudeln mit gebratenem Hühnchen, Shiitake-Pilzen und Miso-Brühe</p>
          </div>
        </div>
        
        <div class="menu-item">
          <div class="menu-item-icon">🥗</div>
          <div class="menu-item-content">
            <h4 class="menu-item-name">Gyoza-Salat</h4>
            <p class="menu-item-desc">Knusprige Gyoza auf gemischtem Salat mit hausgemachtem Sesam-Ingwer-Dressing</p>
          </div>
        </div>
        
        <div class="menu-item dessert-selection">
          <div class="menu-item-icon">🍰</div>
          <div class="menu-item-content">
            <h4 class="menu-item-name">Wählen Sie Ihren Nachgang</h4>
            <div class="dessert-options">
              <div class="dessert-option">
                <input type="radio" id="matchaTiramisu" name="menuDessert" value="matcha" />
                <label for="matchaTiramisu" class="dessert-card">
                  <span class="dessert-name">Matcha Tiramisu</span>
                  <span class="dessert-desc">Italienisches Tiramisu mit japanischem Matcha-Twist</span>
                </label>
              </div>
              
              <div class="dessert-option">
                <input type="radio" id="mochiEis" name="menuDessert" value="mochi" />
                <label for="mochiEis" class="dessert-card">
                  <span class="dessert-name">Mochi Eis Variation</span>
                  <span class="dessert-desc">3 verschiedene Mochi-Eis-Sorten: Vanille, Erdbeere, Grüner Tee</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="menu-footer">
        <div class="menu-price">18.50 €</div>
        <p class="menu-savings">Sie sparen 3.50 € gegenüber Einzelbestellung!</p>
        <button class="special-order-btn menu-order-btn" id="orderMenuBundle" disabled>
          Tagesmenü bestellen
        </button>
      </div>
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
