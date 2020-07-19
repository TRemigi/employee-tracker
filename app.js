const inquirer = require('inquirer');
const prompts = require('./lib/prompts');
const { startup, displayTitle } = require('./lib/prompts');

employeeTracker = function () {
    displayTitle();
    startup();
};

module.exports = employeeTracker;