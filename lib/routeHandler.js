const fetch = require('node-fetch');
const inquirer = require('inquirer');
const {
    response,
    json
} = require('express');

class Department {
    static async addDepartment() {
        const data = await inquirer
            .prompt([{
                type: 'input',
                name: 'depName',
                message: 'Enter name of new department:',
                validate: depInput => {
                    if (depInput) {
                        return true;
                    } else {
                        console.log('You must enter a department name.');
                        return false;
                    }
                }
            }])

        const response = await fetch('http://localhost:3000/api/departments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.depName
            })
        });

        if (response.ok) {
            console.log(`${data.depName} department successfully created.`)
        } else {
            throw response;
        }
    }
}

class Role {
    static async getRoles() {
        const res = await fetch('http://localhost:3000/api/roles');

        if (!res.ok) throw res;
        const json = await res.json()

        return this.formatRoles(json.data);
    }

    static async formatRoles(obj) {
        let rolesArray = [];
        obj.forEach(role => {
            const formattedRole = `${role.id} ${role.title}`;
            rolesArray.push(formattedRole);
        });
        return rolesArray;
    }

    static async addRole() {
        const role = await inquirer
            .prompt([{
                type: 'input',
                name: 'roleName',
                message: 'Enter name of new role:',
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log('You must enter a role name.');
                        return false;
                    }
                }
            }])

        const response = await fetch('http://localhost:3000/api/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: role.roleName
            })
        });

        if (response.ok) {
            console.log(`${role.roleName} department successfully created.`)
        } else {
            throw response;
        }
    }
}

class Employee {
    static async getManagers() {
        const res = await fetch('http://localhost:3000/api/managers');

        if (!res.ok) throw res;
        const json = await res.json()
        return this.formatManagers(json.data);
    }

    static async formatManagers(obj) {
        let formattedArray = [];
        obj.forEach(manager => {
            const formattedManager = `${manager.id} ${manager.first_name} ${manager.last_name}`;
            formattedArray.push(formattedManager);
        });
        const noManager = 'NULL';
        formattedArray.push(noManager);
        return formattedArray;
    }

    

    static async prepareEmployee(employee) {
        const role_id = await employee.role_id.split(" ", 1);
        employee.role_id = role_id;
        if (employee.manager_id === 'NULL') {
            
            delete employee.manager_id
        } else {
            const manager_id = await employee.manager_id.split(" ", 1);
            employee.manager_id = manager_id;
        }
        return employee;
    }

    static async addEmployee() {
        const managersArray = await Employee.getManagers()
        const rolesArray = await Role.getRoles();

        const employee = await inquirer
            .prompt([{
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter first name of new employee:',
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log('You must enter a first name.')
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter last name of new employee:',
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log('You must enter a last name.');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Specify employee role:',
                    choices: rolesArray
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Specify employee manager:',
                    choices: managersArray
                }
            ])

        const finalEmployee = await Employee.prepareEmployee(employee);
            
        const response = await fetch('http://localhost:3000/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: finalEmployee.first_name,
                last_name: finalEmployee.last_name,
                role_id: finalEmployee.role_id,
                manager_id: finalEmployee.manager_id
            })
        });

        if (response.ok) {
            console.log(`${finalEmployee.first_name} ${finalEmployee.last_name} successfully added.`)
        } else {
            throw response;
        }
    }
}

module.exports = {
    Department,
    Role,
    Employee
};