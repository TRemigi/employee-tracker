const inquirer = require('inquirer');
const art = require('./ascii');
const fetch = require('node-fetch');
const cTable = require('console.table');
const { Department, Role, Employee } = require('./crudHandlers');

const startup = function () {
    console.log(art);
    mainMenu();
};

const mainMenu = function () {
    inquirer
        .prompt([{
                type: 'list',
                name: 'begin',
                message: 'Press ENTER to open main menu',
                choices: ['']
            },
            {
                type: 'list',
                name: 'main',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update employee role',
                    'Quit Application'
                ]
            }
        ])
        .then(inputObj => {
            inputHandler(inputObj);
        });
}

const inputHandler = function (inputObj) {
    switch (inputObj.main) {
        case 'View all departments':
            // fetch all departments
            fetch('http://localhost:3000/api/departments')
                .then(res => res.json())
                .then(res => console.table(res.data))
                .catch(err => console.log(err))
                mainMenu();
            break;
        case 'View all roles':
            // fetch all roles
            fetch('http://localhost:3000/api/roles')
                .then(res => res.json())
                .then(res => console.table(res.data))
                .catch(err => console.log(err))
                mainMenu();
            break;
        case 'View all employees':
            // fetch all employees
            fetch('http://localhost:3000/api/employees')
                .then(res => res.json())
                .then(res => console.table(res.data))
                .catch(err => console.log(err))
                mainMenu();
            break;
        case 'Add a department':
            Department.addDepartment()
            .catch(err => console.log(err))
            .then(res => {
                mainMenu();
            })
            break;
        case 'Add a role':
            Role.addRole()
            .catch(err => console.log(err))
            .then(res => {
                mainMenu();
            })
            break;
        case 'Add an employee':
            Employee.addEmployee()
            .catch(err => console.log(err))
            .then(res => {
                mainMenu();
            });
            break;
        case 'Update employee role':
            Employee.updateEmployeeRole()
            .catch(err => console.log(err))
            .then(res => {
                mainMenu();
            });
            break;
        case 'Quit Application':
            return process.exit(0);
    }

    return;
}

module.exports = startup;