const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
let api = require("./routes/api.js")
let html = require("./routes/html.js")

const PORT = process.env.PORT || 3001;

app.use("/api", api)
app.use("/", html)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts server to begin listening
app.listen(PORT, () => {
  console.log(`App is live on http://localhost:${PORT}/`);
});