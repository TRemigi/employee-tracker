const express = require('express');
const router = express.Router();
const connection = require('../db/database');
const cTable = require('console.table');

// view all roles
router.get('/roles', (req, res) => {
    const sql = `select 
    r.id as ID, 
    r.title as Title, 
    d.name as Department, 
    r.salary as Salary 
    from roles r
    left join departments d 
    on r.department_id = d.id 
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

// add new role
router.post('/roles', (req, res) => {
    console.log('Adding a new department...\n');
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const { title, salary, department_id } = req.body;
    const params = [title, salary, department_id];

    connection.execute(
        sql, params,
        function (err, results) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                console.log(`${title} role already exists.`);
                return;
            }
            res.json({
                message: 'success',
                data: results
            });
            
                console.log(`${title} role added.`);
        }
    );
});

module.exports = router;