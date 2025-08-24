import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Statische Dateien servieren
app.use(express.static(__dirname));

// SPA Fallback - ALLE Routen zu index.html
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 SPA läuft auf http://localhost:${PORT}`);
  console.log(`📝 Öffne Chrome und navigiere zu den URLs:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/products`);
  console.log(`   - http://localhost:${PORT}/contact`);
  console.log(`✨ F5/Reload funktioniert auf allen Seiten!`);
});
