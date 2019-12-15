const db = require('./db');

let query = {
    viewDepartments: () => {
        db(`SELECT * FROM department`)
    },
    viewRoles: () => {
        db(`SELECT * FROM role`)
    },
    viewEmployees: () => {
        db(`SELECT * FROM employee`)
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
