const db = require('./db');

let query = {

    viewDepartments: () =>
        db(`SELECT id, name FROM department`),

    viewRoles: () =>
        db(`SELECT role.id, role.title, department.name AS department, CONCAT("$", role.salary) AS salary FROM role LEFT JOIN department ON role.department_id = department.id`),

    viewEmployees: () =>
        db(`SELECT employee.id, employee.first_name, employee.last_name, IFNULL(role.title,"") AS role, IFNULL(department.name,"") AS department, CONCAT("$", role.salary) AS salary, IFNULL(CONCAT(manager.first_name, " ", manager.last_name),"") AS manager FROM (((employee AS employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee AS manager ON employee.manager_id = manager.id)`),

    viewEmployeesByDepartment: () =>
        db(`SELECT employee.id, employee.first_name, employee.last_name, IFNULL(role.title,"") AS role, IFNULL(department.name,"") AS department, CONCAT("$", role.salary) AS salary, IFNULL(CONCAT(manager.first_name, " ", manager.last_name),"") AS manager FROM (((employee AS employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee AS manager ON employee.manager_id = manager.id) ORDER BY department ASC, role.salary DESC, role.title ASC`),

    viewEmployeesByManager: () =>
        db(`SELECT employee.id, employee.first_name, employee.last_name, IFNULL(role.title,"") AS role, IFNULL(department.name,"") AS department, CONCAT("$", role.salary) AS salary, IFNULL(CONCAT(manager.first_name, " ", manager.last_name),"") AS manager FROM (((employee AS employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee AS manager ON employee.manager_id = manager.id) ORDER BY manager ASC, role.salary DESC`),

    getEmployeeByFullName: (name) =>
        db(`SELECT employee.id, employee.first_name, employee.last_name, IFNULL(role.title,"") AS role, IFNULL(department.name,"") AS department, CONCAT("$", role.salary) AS salary, IFNULL(CONCAT(manager.first_name, " ", manager.last_name),"") AS manager FROM (((employee AS employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee AS manager ON employee.manager_id = manager.id) WHERE CONCAT(employee.first_name, " ", employee.last_name) = '${name}'`),

    getDepartmentByName: (name) =>
        db(`SELECT id, name FROM department WHERE name = '${name}'`),

    getRoleByTitle: (title) =>
        db(`SELECT role.id, role.title, department.name AS department, CONCAT("$", role.salary) AS salary FROM role LEFT JOIN department ON role.department_id = department.id WHERE role.title = '${title}'`),

    addDepartment: (name) =>
        db(`INSERT INTO department (name)
            VALUES ('${name}')`),

    addRole: (title, salary, department_id) =>
        db(`INSERT INTO role (title, salary, department_id)
            VALUES ('${title}', ${salary}, ${department_id})`),

    addEmployee: (first_name, last_name, role_id, manager_id) =>
        manager_id ?
            db(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`) :
            db(`INSERT INTO employee (first_name, last_name, role_id)
                VALUES ('${first_name}', '${last_name}', ${role_id})`),

    updateEmployeeRole: (employee_id, role_id) =>
        db(`UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id}`),

    updateEmployeeManager: (employee_id, manager_id) =>
        db(`UPDATE employee SET manager_id = ${manager_id} WHERE id = ${employee_id}`),

    removeDepartment: (department_id) =>
        db(`DELETE FROM department WHERE id = ${department_id}`),

    removeRole: (role_id) =>
        db(`DELETE FROM role WHERE id = ${role_id}`),

    removeEmployee: (employee_id) =>
        db(`DELETE FROM employee WHERE id = ${employee_id}`),

    viewDepartmentsTotalBudget: () =>
        db(`SELECT department.id, department.name, CONCAT("$", SUM(role.salary)) AS budget FROM ((employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) GROUP BY department.name`),

};

module.exports = query;
