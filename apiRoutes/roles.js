const express = require('express');
const router = express.Router();
const connection = require('../db/database');
const cTable = require('console.table');

// view all roles
router.get('/roles', (req, res) => {
    const sql = `select 
    r.id as id, 
    r.title as title, 
    d.name as department, 
    r.salary as salary 
    from roles r
    left join departments d 
    on r.department_id = d.id 
    ORDER BY d.id`;
    const params = [];

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

// add new role
router.post('/roles', (req, res) => {
    console.log('Adding a new role...\n');
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const { title, salary, department_id } = req.body;
    const params = [title, salary, department_id];

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