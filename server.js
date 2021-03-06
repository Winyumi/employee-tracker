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

        case 'View departments\' total utilized budgets':
            console.table(await query.viewDepartmentsTotalBudget());
            return init();

        case 'View roles':
            console.table(await query.viewRoles());
            return init();

        case 'View employees':
            console.table(await query.viewEmployees());
            return init();

        case 'View employees by department':
            console.table(await query.viewEmployeesByDepartment());
            return init();

        case 'View employees by manager':
            console.table(await query.viewEmployeesByManager());
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
            questions.addRole.find(e => e.name === "department").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.addRole);
            // Run query
            if (data.confirm) {
                // Get department id
                data.department_id = departments.find(e => e.name === data.department).id;
                await query.addRole(data.title, data.salary, data.department_id);
                console.log(`Role "${data.title}" added.`);
            }
            return init();

        case 'Add employee':
            // Populate choices with list of roles and employees for manager select
            list = []; for (let r of roles) list.push(r.title);
            questions.addEmployee.find(e => e.name === "role").choices = list;
            list = ['None']; for (let e of employees) list.push(e.first_name + " " + e.last_name);
            questions.addEmployee.find(e => e.name === "manager").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.addEmployee);
            // Run query
            if (data.confirm) {
                // Get role and manager ids
                data.role_id = roles.find(e => e.title === data.role).id;
                data.manager === 'None' ?
                    data.manager_id = null :
                    data.manager_id = employees.find(e => e.first_name + " " + e.last_name === data.manager).id;
                // Run query
                await query.addEmployee(data.first_name, data.last_name, data.role_id, data.manager_id);
                console.log(`Employee "${data.first_name} ${data.last_name}" added.`);
            }
            return init();

        case 'Update employee role':
            // Populate choices with list of employees and roles
            list = []; for (let e of employees) list.push(e.first_name + " " + e.last_name);
            questions.updateEmployeeRole.find(e => e.name === "employee").choices = list;
            list = []; for (let r of roles) list.push(r.title);
            questions.updateEmployeeRole.find(e => e.name === "role").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.updateEmployeeRole);
            if (data.confirm) {
                // Get employee and role ids
                data.employee_id = employees.find(e => e.first_name + " " + e.last_name === data.employee).id;
                data.role_id = roles.find(e => e.title === data.role).id;
                // Run query
                await query.updateEmployeeRole(data.employee_id, data.role_id);
                console.log(`Employee "${data.employee}" updated.`);
            }
            return init();

        case 'Update employee manager':
            // Populate choices with list of employees
            list = []; for (let e of employees) list.push(e.first_name + " " + e.last_name);
            questions.updateEmployeeManager.find(e => e.name === "employee").choices = list;
            list = ['None']; for (let e of employees) list.push(e.first_name + " " + e.last_name);
            questions.updateEmployeeManager.find(e => e.name === "manager").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.updateEmployeeManager);
            if (data.confirm) {
                // Get employee and role ids
                data.employee_id = employees.find(e => e.first_name + " " + e.last_name === data.employee).id;
                data.manager === 'None' ?
                    data.manager_id = null :
                    data.manager_id = employees.find(e => e.first_name + " " + e.last_name === data.manager).id;
                if (data.employee_id === data.manager_id) data.manager_id = null;
                // Run query
                await query.updateEmployeeManager(data.employee_id, data.manager_id);
                console.log(`Employee "${data.employee}" updated.`);
            }
            return init();

        case 'Remove department':
            // Populate choices with list of departments
            list = []; for (let d of departments) list.push(d.name);
            questions.removeDepartment.find(e => e.name === "department").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.removeDepartment);
            if (data.confirm) {
                // Get department id
                data.department_id = departments.find(e => e.name === data.department).id;
                // Run query
                try {
                    await query.removeDepartment(data.department_id);
                    console.log(`Department "${data.department}" removed.`);
                } catch(err) {
                    console.error(`Unable to remove department "${data.department}". There are roles still assigned to it.`);
                }
            }
            return init();

        case 'Remove role':
            // Populate choices with list of roles
            list = []; for (let r of roles) list.push(r.title);
            questions.removeRole.find(e => e.name === "role").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.removeRole);
            if (data.confirm) {
                // Get role id
                data.role_id = roles.find(e => e.title === data.role).id;
                // Run query
                try {
                    await query.removeRole(data.role_id);
                    console.log(`Role "${data.role}" removed.`);
                } catch(err) {
                    console.error(`Unable to remove role "${data.role}". There are employees still assigned to it.`);
                }
            }
            return init();

        case 'Remove employee':
            // Populate choices with list of employees
            list = []; for (let e of employees) list.push(e.first_name + " " + e.last_name);
            questions.removeEmployee.find(e => e.name === "employee").choices = list;
            // Ask questions
            data = await inquirer.prompt(questions.removeEmployee);
            if (data.confirm) {
                // Get employee id
                data.employee_id = employees.find(e => e.first_name + " " + e.last_name === data.employee).id;
                // Run query
                try {
                    await query.removeEmployee(data.employee_id);
                    console.log(`Employee "${data.employee}" removed.`);
                } catch(err) {
                    console.error(`Unable to remove employee "${data.employee}". This employee is currently assigned as manager to other employees.`);
                }
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
