const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;
let note = require("./db/db.json");


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
app.post("/api/notes", function (req, res) {
  let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  let id = randLetter + Date.now();
  let newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text,
  };
  note.push(newNote);
  const stringifyNote = JSON.stringify(note);
  res.json(note);
  fs.writeFile("./db/db.json", stringifyNote, (err) => {
    if (err) console.log(err);
    else {
      console.log("Note successfully saved to db.json");
    }
  });
});

// Delete note
app.delete("/api/notes/:id", function (req, res) {
  let noteID = req.params.id;
  fs.readFile("./db/db.json",  function (err, data) {
    let updatedNotes = JSON.parse(data).filter((note) => {
      return note.id !== noteID;
    });
    note = updatedNotes;
    const stringifyNote = JSON.stringify(updatedNotes);
    fs.writeFile("./db/db.json", stringifyNote, (err) => {
      if (err) console.log(err);
      else {
        console.log("Note successfully deleted from db.json");
      }
    });
    res.json(stringifyNote);
  });
});


// Starts server to begin listening
app.listen(PORT, function () {
  console.log(`App is live on http://localhost:${PORT}/`);
});