import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// =============================
// VALID KEYS= ["AMBAREEN123", "TAQUI2074", "BABA4869", "ADEEBA4869", "SADIYA4869", "AAFIYA4869", "SAMREEN4869", "SAIMA4869", "SABA4869", "HADIYA4869"];
// =============================
const VALID_KEYS = ["MOMIN123", "TAQUI456", "BABA789"];

// =============================
// KEY VALIDATION ROUTE
// =============================
app.post("/validate-key", (req, res) => {
  const { key } = req.body;
  if (VALID_KEYS.includes(key)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// =============================
// CLOUD STORAGE (data.json)
// =============================
const DATA_FILE = path.join(__dirname, "data.json");
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({}), "utf8");

// 🔹 Save data
app.post("/save-data", (req, res) => {
  const { deviceID, notes } = req.body;
  if (!deviceID || notes === undefined) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const db = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  db[deviceID] = notes;
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
  res.json({ success: true });
});

// 🔹 Load data
app.get("/load-data", (req, res) => {
  const { deviceID } = req.query;
  if (!deviceID) return res.status(400).json({ success: false, message: "Missing deviceID" });

  const db = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  res.json({ success: true, notes: db[deviceID] || "" });
});

// 🔹 Delete data (optional)
app.delete("/delete-data", (req, res) => {
  const { deviceID } = req.body;
  const db = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  delete db[deviceID];
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
  res.json({ success: true });
});

// =============================
// START SERVER
// =============================
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
