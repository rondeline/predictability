const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8776;

console.log("Starting the server...");

app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});

// ✅ Serve all static files from the same directory
app.use(express.static(path.join(__dirname, 'jspsych')));

// ✅ Middleware to parse JSON and form data
app.use(express.urlencoded({ extended: true }));

// ✅ Serve `picture.html` at the root `/`
app.get("/", (req, res) => {
    console.log("Request received at /");
    res.sendFile(path.join(__dirname, "predictability.html"));
});

// ✅ Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// ✅ Start the server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
});