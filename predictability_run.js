const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 8776;

console.log("Starting the server...");

// ── Logging ────────────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});

// ── Static files (serves /jspsych/* from ./jspsych) ───────────────────────────
app.use("/jspsych", express.static(path.join(__dirname, "jspsych")));

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));     // form posts (if any)
app.use(express.json({ limit: "10mb" }));            // <-- needed for /save JSON

// ── Root: serve the experiment ────────────────────────────────────────────────
app.get("/", (req, res) => {
  console.log("Request received at /");
  res.sendFile(path.join(__dirname, "predictability.html"));
});

// ── Save endpoint: accepts {filedata: "<csv>"} and writes ./data/session-*.csv ─
app.post("/save", (req, res) => {
  try {
    const csv = req.body && req.body.filedata;
    if (typeof csv !== "string") {
      return res.status(400).send("Missing filedata");
    }

    const dir = path.join(__dirname, "data");
    fs.mkdirSync(dir, { recursive: true });

    const name = `session-${Date.now()}-${Math.random().toString(36).slice(2,8)}.csv`;
    const full = path.join(dir, name);

    fs.writeFileSync(full, csv);
    console.log("Saved", full);
    res.sendStatus(200);
  } catch (e) {
    console.error("Error saving CSV:", e);
    res.status(500).send("Error saving");
  }
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});