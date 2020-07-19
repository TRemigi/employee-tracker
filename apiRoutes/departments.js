const express = require('express');
const router = express.Router();
const connection = require('../db/database');
const cTable = require('console.table');

// view all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT d.id as ID, 
    d.name as Department 
    FROM departments d 
    ORDER BY d.id`;
    const params = [];

    connection.execute(
        sql, params,
        function (err, results) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                return;
            }
            res.json({
                message: 'success',
                data: results
            });
            console.table(results);
        }
    );
});

// add new department
router.post('/departments', (req, res) => {
    console.log('Adding a new department...\n');
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = [req.body.name];

    connection.execute(
        sql, params,
        function (err, results) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                console.log(`${req.body.name} department already exists.`);
                return;
            }
            res.json({
                message: 'success',
                data: results
            });
            
                console.log(`${req.body.name} department added.`);
        }
    );
});

module.exports = router;