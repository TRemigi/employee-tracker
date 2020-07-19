const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Tj345734571124842!',
    database: 'employees_DB'
});

module.exports = connection;