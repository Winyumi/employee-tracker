const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');

const db = function(query) {
    let conn = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "test",
        password: "test",
        database: "employee_db"
    });
    conn.connect(function(err) {
        if (err) throw err;
        conn.query(query, function(err, result) {
            console.table(result);
        });
        conn.end();
    });
};

db(`SELECT * FROM employee`);

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
