const db = require('./db');

let query = {
    viewDepartments: () => {
        db(`SELECT id, name FROM department`)
    },
    viewRoles: () => {
        db(`SELECT role.id, role.title, department.name AS department, CONCAT("$", role.salary) AS salary FROM role INNER JOIN department ON role.department_id = department.id`)
    },
    viewEmployees: () => {
        db(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM (((employee AS employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON employee.role_id = department.id) INNER JOIN employee AS manager ON employee.manager_id = manager.id)`)
    },
    addDepartment: (name) => {
        db(`INSERT INTO department (name) VALUES ('${name}')`)
    },
    addRole: (title, salary, department_id) => {
        db(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id})`)
    },
    addEmployee: (first_name, last_name, role_id, manager_id) => {
        db(`INSERT INTO department (first_name, last_name, role_id${manager_id ? ', manager_id' : ''}) VALUES ('${first_name}', '${last_name}', ${role_id}${manager_id ? `, '${manager_id}'` : ''})`)
    },
    updateEmployeeRole: (employee_id, role_id) => {
        db(`UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id}`)
    }
};

module.exports = query;
