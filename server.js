const express = require('express');
const connection = require('./db/database');
const PORT = process.env.PORT || 3000;
const app = express();
const apiRoutes = require('./apiRoutes');
const employeeTracker = require('./app');

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
connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);

        employeeTracker();
    });
});