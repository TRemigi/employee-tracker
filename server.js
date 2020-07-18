const express = require('express');
const db = require('./db/database');
const PORT = process.env.PORT || parseInt(process.env.port);
const app = express();
const apiRoutes = require('./apiRoutes');

// express middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// use routes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
});



// start server after DB connection
db.on('ready', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});