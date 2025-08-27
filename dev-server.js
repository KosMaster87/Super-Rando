import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connectLivereload from "connect-livereload";
import { createServer } from "net";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const DEFAULT_PORT = 3000;

// LiveReload Middleware nur in Development
if (process.env.NODE_ENV !== "production") {
  app.use(
    connectLivereload({
      port: 35729,
    })
  );
}

// Statische Dateien servieren
app.use(express.static(__dirname));

// SPA Fallback - ALLE Routen zu index.html
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

/**
 * Prüft ob ein Port verfügbar ist
 * @param {number} port - Port-Nummer
 * @returns {Promise<boolean>} Port ist verfügbar
 */
const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
};

/**
 * Findet einen verfügbaren Port ab dem Default-Port
 * @param {number} startPort - Start-Port
 * @returns {Promise<number>} Verfügbarer Port
 */
const findAvailablePort = async (startPort) => {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    port++;
    if (port > startPort + 10) {
      throw new Error("Kein verfügbarer Port gefunden");
    }
  }
  return port;
};

/**
 * Startet den Server mit verfügbarem Port
 */
const startServer = async () => {
  try {
    const port = await findAvailablePort(DEFAULT_PORT);

    app.listen(port, () => {
      console.log(`🚀 SPA läuft auf http://localhost:${port}`);
      if (port !== DEFAULT_PORT) {
        console.log(
          `⚠️  Port ${DEFAULT_PORT} war belegt, verwende Port ${port}`
        );
      }
      console.log(`📝 Öffne Chrome und navigiere zu den URLs:`);
      console.log(`   - http://localhost:${port}/`);
      console.log(`✨ F5/Reload funktioniert auf allen Seiten!`);

      if (process.env.NODE_ENV !== "production") {
        console.log(`🔄 LiveReload läuft auf Port 35729`);
        console.log(`💡 Browser lädt automatisch bei Datei-Änderungen neu!`);
      }
    });
  } catch (error) {
    console.error("❌ Fehler beim Starten des Servers:", error.message);
    process.exit(1);
  }
};

startServer();
