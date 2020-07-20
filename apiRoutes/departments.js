const express = require('express');
const router = express.Router();
const connection = require('../db/database');
const cTable = require('console.table');

// view all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT d.id as id, 
    d.name as name 
    FROM departments d 
    ORDER BY d.id`;
    const params = [];

    connection.query(
        sql, params,
        function (err, rows) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                console.log(`Error: ${err.message}`)
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        }
    );
});

// add new department
router.post('/departments', (req, res) => {
    console.log('Adding a new department...\n');
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = [req.body.name];

    connection.query(
        sql, params,
        function (err, results) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                console.log(`Error: ${err.message}`)
                return;
            }
            res.json({
                message: 'success',
                data: results
            });
        }
    );
});

module.exports = router;