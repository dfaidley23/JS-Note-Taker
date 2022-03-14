const router = require('express').Router();
const fs = require('fs');

// sending the Notes data when the API is called
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        if (error) throw error;
        res.json(JSON.parse(data));
    });
});

// Displaying the notes on that page
router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        if (error) throw error;
        let working = JSON.parse(data);
        working.push(req.body);

        fs.writeFile('./db/db.json', JSON.stringify(working), (error) => {
            if (error) return error;
        });
    });
    res.end();
});

// deleting notes from the db
router.delete('/notes/:id', (req, res) => {
    const tobe = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        if (error) throw error;
        let working = JSON.parse(data);
        for (let i = 0; i < working.length; i++) {
            if (tobe == working[i].id) {
                working.splice(i,1);
                fs.writeFile('./db/db.json', JSON.stringify(working), (error) => {
                    if (error) throw error;
                });
            };
            
        };
    });
    res.end();
});

module.exports = router;