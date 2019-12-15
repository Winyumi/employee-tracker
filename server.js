const inquirer = require('inquirer');
const table = require('console.table');

const query = require('./lib/query');
const questions = require('./lib/questions');

async function init() {
    let { main } = await inquirer.prompt(questions.main);
    let data;
    switch (main) {
        case 'View departments':
            data = await query.viewDepartments();
            console.table(data);
            return init();
        case 'View roles':
            data = await query.viewRoles();
            console.table(data);
            return init();
        case 'View employees':
            data = await query.viewEmployees();
            console.table(data);
            return init();
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
