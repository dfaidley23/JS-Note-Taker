const router = require('express').Router();
const fs = require('fs');

// sending the Notes data when the API is called
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

// Displaying the notes on that page
router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let newNote = JSON.parse(data);
        newNote.push(req.body);

        fs.writeFile('./db/db.json', JSON.stringify(newNote), (err) => {
            if (err) return err;
        });
    });
    res.end();
});

// deleting notes from the db
router.delete('/notes/:id', (req, res) => {
    const tobe = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let newNote = JSON.parse(data);
        for (let i = 0; i < newNote.length; i++) {
            if (tobe == newNote[i].id) {
                newNote.splice(i,1);
                fs.writeFile('./db/db.json', JSON.stringify(newNote), (err) => {
                    if (err) throw err;
                });
            };
            
        };
    });
    res.end();
});

module.exports = router;