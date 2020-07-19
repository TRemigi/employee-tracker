const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Tj345734571124842!',
    database: 'employees_DB'
});

db.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + db.threadId + '\n');
    
  });

  module.exports = connection;