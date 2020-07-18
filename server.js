const express = require('express');
const connection = require('./db/database');

const PORT = process.env.PORT || 3306;
const app = express();

// const apiRoutes = require('./routes/apiRoutes');

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // use apiRoutes
// app.use('/api', apiRoutes);

// Default response for any other request (Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
});

// start server after DB connection
connection.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});