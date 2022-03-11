const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./helpers/fsUtils");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Display notes
app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Create new note
app.post("/api/notes", (req, res) => {
    console.log(req.body);
    let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  
    const {title, text, id} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: randLetter + Date.now(),
      };
  
      readAndAppend(newNote, "./db/db.json");
      res.json("Note successfully saved to db.json");
    } else {
      res.error("Error in adding note");
    }
});

// Delete note
app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    readFromFile("./db/db.json")
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile("./db/db.json", result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Starts server to begin listening
app.listen(PORT, () => {
  console.log(`App is live on http://localhost:${PORT}/`);
});