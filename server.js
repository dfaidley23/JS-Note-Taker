const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Display notes
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create new note
app.post("/api/notes", (req, res) => {
  console.log(req.body);

  const {title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note successfully saved to db.json`);
  } else {
    res.error('Error in adding note');
  }
});

// Delete note
app.delete('/api/notes/:id', (req, res) => {
  const noteTitle = req.params.title;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.title !== noteTitle);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteTitle} has been deleted 🗑️`);
    });
});


// Starts server to begin listening
app.listen(PORT, function () {
  console.log(`App is live on http://localhost:${PORT}/`);
});