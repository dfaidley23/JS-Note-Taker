const path = require('path');
const router = require('express').Router();

// Setting home Route to the index.html page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// sending the notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// exporting router for the routes
module.exports = router;