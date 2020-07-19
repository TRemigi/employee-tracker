const inquirer = require('inquirer');
const art = require('./ascii');

const displayTitle = function () {
    console.log(art);
}

const startup = function () {
    inquirer
        .prompt([
            {
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
                'Update employee role'
            ]
        }
    ])
        .then(answers => {
            console.log(answers.main);
        });
};

module.exports = { startup, displayTitle };