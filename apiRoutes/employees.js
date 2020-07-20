const express = require('express');
const router = express.Router();
const connection = require('../db/database');
const cTable = require('console.table');

// view all employees
router.get('/employees', (req, res) => {
    const sql = `select e.id, 
    e.first_name, 
    e.last_name, 
    r.title as title, 
    d.name as department, 
    r.salary as salary, 
    concat(m.first_name, ' ', m.last_name) as manager 
    from employees e 
    left join roles r 
    on e.role_id = r.id 
    left join departments d 
    on r.department_id = d.id 
    left join employees m 
    on e.manager_id = m.id 
    ORDER BY d.id;`;
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

// get managers
router.get('/managers', (req, res) => {
    const sql = `SELECT e.id, 
    e.first_name, 
    e.last_name 
    FROM employees e 
    WHERE e.manager_id IS NULL;`;
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

// add employee
router.post('/employees', (req, res) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const {
        first_name,
        last_name,
        role_id,
        manager_id
    } = req.body;
    const params = [first_name, last_name, role_id, manager_id];

    connection.query(
        sql, params,
        function (err, results) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                console.log(`Error: ${err.message}`);
                return;
            }
            res.json({
                message: 'success',
                data: results
            });
        }
    );
});

// update employee role
router.put('/employees/:id', (req, res) => {

    const sql = `UPDATE employees 
    SET role_id = ?
    WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    connection.query(
        sql, params,
        function (err, results) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                console.log(`Error: ${err.message}`);
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