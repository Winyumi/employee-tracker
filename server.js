const inquirer = require('inquirer');
const table = require('console.table');

const query = require('./lib/query');
const questions = require('./lib/questions');

console.log(`
+-------------------------------------------+
|                                           |
|      E M P L O Y E E   M A N A G E R      |
|                                           |
+-------------------------------------------+
`)

async function init() {
    console.log('');

    let departments = await query.viewDepartments(),
        roles = await query.viewRoles(),
        employees = await query.viewEmployees(),
        { main } = await inquirer.prompt(questions.main),
        data, list = [];

    switch (main) {

        case 'View departments':
            console.table(await query.viewDepartments());
            return init();

        case 'View roles':
            console.table(await query.viewRoles());
            return init();

        case 'View employees':
            console.table(await query.viewEmployees());
            return init();

        case 'Add department':
            data = await inquirer.prompt(questions.addDepartment);
            if (data.confirm) {
                await query.addDepartment(data.name);
                console.log(`Department "${data.name}" added.`);
            }
            return init();

        case 'Add role':
            // Populate choices with list of departments
            list = []; for (let d of departments) list.push(d.name);
            questions.addRole.find(e => e.name == "department").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.addRole);
            // Run query
            if (data.confirm) {
                // Get department id
                data.department_id = (await query.getDepartmentByName(data.department))[0].id;
                await query.addRole(data.title, data.salary, data.department_id);
                console.log(`Role "${data.title}" added.`);
            }
            return init();

        case 'Add employee':
            // Populate choices with list of roles
            list = []; for (let r of roles) list.push(r.title);
            questions.addEmployee.find(e => e.name == "role").choices = list;
            // Populate choices with list of employees for manager select
            list = ['None']; for (let e of employees) list.push(e.first_name + " " + e.last_name);
            questions.addEmployee.find(e => e.name == "manager").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.addEmployee);
            // Run query
            if (data.confirm) {
                // Get role id
                data.role_id = (await query.getRoleByTitle(data.role))[0].id;
                if (data.manager != 'None') {
                    // Get manager id
                    data.manager_id = (await query.getEmployeeByFullName(data.manager))[0].id;
                    // Run query
                    await query.addEmployee(data.first_name, data.last_name, data.role_id, data.manager_id);
                } else {
                    // Run query
                    await query.addEmployee(data.first_name, data.last_name, data.role_id);
                }
                console.log(`Employee "${data.first_name} ${data.last_name}" added.`);
            }
            return init();

        case 'Update role':
            // Populate choices with list of employees
            list = []; for (let e of employees) list.push(e.first_name + " " + e.last_name);
            questions.updateEmployeeRole.find(e => e.name == "employee").choices = list;
            // Populate choices with list of roles
            list = []; for (let r of roles) list.push(r.title);
            questions.updateEmployeeRole.find(e => e.name == "role").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.updateEmployeeRole);
            if (data.confirm) {
                // Get employee id
                data.employee_id = (await query.getEmployeeByFullName(data.employee))[0].id;
                // Get role id
                data.role_id = (await query.getRoleByTitle(data.role))[0].id;
                // Run query
                await query.updateEmployeeRole(data.employee_id, data.role_id);
                console.log(`Employee "${data.employee}" updated.`);
            }
            return init();

        /*
        case 'Add role by ID':
            data = await inquirer.prompt(questions.addRole);
            if (data.confirm) {
                if (data.department_id > departments.length) {
                    console.error('Department id out of range. Role was not added.');
                    return init();
                }
                await query.addRole(data.title, data.salary, data.department_id);
                console.log(`Role "${data.title}" added.`);
            }
            return init();

        case 'Add employee by ID':
            data = await inquirer.prompt(questions.addEmployee);
            if (data.confirm) {
                if (data.role_id > roles.length) {
                    console.error('Role id out of range. Employee was not added.');
                    return init();
                }
                if (data.manager_id > employees.length) {
                    console.error('Manager id out of range. Employee was not added.');
                    return init();
                }
                if (data.manager_id) {
                    await query.addEmployee(data.first_name, data.last_name, data.role_id, data.manager_id);
                } else {
                    await query.addEmployee(data.first_name, data.last_name, data.role_id);
                }
                console.log(`Employee "${data.first_name} ${data.last_name}" added.`);
            }
            return init();
        */

    }
};

init();

/*
query.viewDepartments();
query.viewRoles();
query.viewEmployees();
*/
/*
1. if database does not exist, source schema.sql

2. set up all functions
    - add department
    - add role
    - add employee
    - view departments
    - view roles
    - view employees
    - update employees' roles

    bonus:
    - update managers
    - view employees by manager
    - delete department
    - delete role
    - delete employee
    - view combined salaries of department

3. set up inquirer and questions
*/
