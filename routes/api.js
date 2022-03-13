const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json')
const path = require("path");
// const {
//   readFromFile,
//   readAndAppend,
//   writeToFile,
// } = require("../helpers/fsUtils.js");

// // Display notes
router.get("/notes", (req, res) => {
    res.send(db)
});

// Create new note
router.post("/notes", (req, res) => {
    let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const {title, text, id} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: randLetter + Date.now(),
      };
      readAndAppend(newNote, '../db/db.json');
      res.json("Note successfully saved to db.json");
    } else {
      res.error("Error in adding note");
    }
});

// Delete note
router.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    fs.readFile('../db/db.json', "utf-8", (err, data) => {
        if (err) throw err;
        let result = JSON.parse(data);

        for (let i = 0; i < result.length; i++) {
            if (noteId == result[i].id) {
                result.splice(i, 1);
                fs.writeFile('../db/db.json'), JSON.stringify(result), (err) => {
                    if (err) throw err;
                };
            };
            
        };
    });
    //   .then((data) => JSON.parse(data))
    //   .then((json) => {
    //     // Make a new array of all tips except the one with the ID provided in the URL
    //     const result = json.filter((note) => note.id !== noteId);
  
    //     // Save that array to the filesystem
    //     writeToFile('../db/db.json', result);
  
    //     // Respond to the DELETE request
    //     res.json(`Item ${noteId} has been deleted 🗑️`);
    //   });
    res.json(`Item ${noteId} has been deleted`)
});

module.exports = router