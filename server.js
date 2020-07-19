const express = require('express');
const connection = require('./db/database');
const PORT = process.env.PORT || 3000;
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

app.get('/', (req, res) => {
    res.json({ message: 'success' });
});

// start server after DB connection
connection.on('start', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});