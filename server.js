const express = require('express');
const api = require('./routes/api');
const html = require('./routes/html');
const PORT = process.env.PORT || 3001;
const app = express();

// Boilerplate Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// middleware for the routes
app.use('/api', api);
app.use('/', html);

// App listening on port 3001
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);