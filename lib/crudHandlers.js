const fetch = require('node-fetch');
const inquirer = require('inquirer');
// department class
class Department {
    // utitlity method
    static async getDepartments() {
        const res = await fetch('http://localhost:3000/api/departments');

        if (!res.ok) throw res;
        const json = await res.json()
        return this.formatDepartments(json.data);
    }
    // utility method
    static async formatDepartments(obj) {
        let depsArray = [];
        obj.forEach(dep => {
            const formattedDep = `${dep.id} ${dep.name}`;
            depsArray.push(formattedDep);
        });
        return depsArray;
    }
    // adds new department to database
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
// role class
class Role {
    // utitlity method
    static async getRoles() {
        const res = await fetch('http://localhost:3000/api/roles');

        if (!res.ok) throw res;
        const json = await res.json()
        return this.formatRoles(json.data);
    }
    // utility method
    static async formatRoles(obj) {
        let rolesArray = [];
        obj.forEach(role => {
            const formattedRole = `${role.id} ${role.title}`;
            rolesArray.push(formattedRole);
        });
        return rolesArray;
    }
    // utility method
    static async prepareRole(role) {
        const department_id = await role.department_id.split(" ", 1);
        role.department_id = department_id;

        return role;
    }
    // adds new role to database
    static async addRole() {
        const rolesArray = await Department.getDepartments()
        const role = await inquirer
            .prompt([{
                    type: 'input',
                    name: 'title',
                    message: 'Enter title of new role:',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('You must enter a role title.');
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'Enter salary of new role:',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('You must enter a role salary using only numbers.');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Specify department of new role:',
                    choices: rolesArray
                }
            ])

        const finalRole = await Role.prepareRole(role);

        const response = await fetch('http://localhost:3000/api/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: finalRole.title,
                salary: finalRole.salary,
                department_id: finalRole.department_id
            })
        });

        if (response.ok) {
            console.log(`${role.title} role successfully created.`)
        } else {
            throw response;
        }
    }
}
// employee class
class Employee {
    // utility method
    static async getManagers() {
        const res = await fetch('http://localhost:3000/api/managers');

        if (!res.ok) throw res;
        const json = await res.json()
        return this.formatManagers(json.data);
    }
    // utility method
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
    // utility method
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
    // adds new employee to database
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
    // utility method
    static async getAllEmployees() {
        const res = await fetch('http://localhost:3000/api/employees');

        if (!res.ok) throw res;
        const json = await res.json()
        return this.formatEmployees(json.data);
    }
    // utility method
    static async formatEmployees(obj) {
        let formattedArray = [];
        obj.forEach(employee => {
            const formattedEmployee = `${employee.id} ${employee.first_name} ${employee.last_name}`;
            formattedArray.push(formattedEmployee);
        });
        return formattedArray;
    }
    // utility method
    static async prepareUpdate(updatingEmployee) {
        const id = await updatingEmployee.id.split(" ", 1);
        updatingEmployee.id = id;

        const newId = await updatingEmployee.role_id.split(" ", 1);
        updatingEmployee.role_id = newId;
        return updatingEmployee;
    }
    // utility method
    static async updateEmployeeRole() {
        const employeesArray = await Employee.getAllEmployees()
        const rolesArray = await Role.getRoles();

        const updatingEmployee = await inquirer
            .prompt([{
                    type: 'list',
                    name: 'id',
                    message: `Which employee's role would you like to update?`,
                    choices: employeesArray
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: `What is the employee's new role?`,
                    choices: rolesArray
                }
            ])

            const finalEmployee = await Employee.prepareUpdate(updatingEmployee);

        const response = await fetch(`http://localhost:3000/api/employees/${finalEmployee.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role_id: finalEmployee.role_id
            })
        });

        if (response.ok) {
            console.log(`Employee role successfully updated.`)
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