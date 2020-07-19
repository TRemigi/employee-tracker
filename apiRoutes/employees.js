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

// add employee
router.post('/employees', (req, res) => {
    console.log('Adding a new employee...\n');
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const {
        first_name,
        last_name,
        role_id,
        manager_id
    } = req.body;
    const params = [first_name, last_name, role_id, manager_id];

    connection.execute(
        sql, params,
        function (err, results) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                console.log(`Employee with name ${first_name} ${last_name} already exists.`);
                return;
            }
            res.json({
                message: 'success',
                data: results
            });

            console.log(`${first_name} ${last_name} added to employees.`);
        }
    );
});

// update employee role
router.put('/employees/:id', (req, res) => {

    const sql = `UPDATE employees 
    SET role_id = ?
    WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    connection.execute(
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

            console.log(`Employee role updated.`)
        }
    );
});

module.exports = router;