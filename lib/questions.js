const filter = {
    toInteger: input => {
        if (Number.parseInt(input) < 0 || Number.isNaN(Number.parseInt(input)))
            return 0;
        return Number.parseInt(input);
    },
    toFloat: input => {
        if (Number.parseFloat(input) < 0 || Number.isNaN(Number.parseFloat(input)))
            return 0;
        return Number.parseFloat(input);
    },
    toDouble: input => {
        if (Number.parseFloat(input) < 0 || Number.isNaN(Number.parseFloat(input)))
            return 0;
        return Number.parseFloat(input).toFixed(2);
    }
}

const validate = {
    required: input => {
        return input ? true : 'Please enter a name.';
    },
    isNumberGTE0: input => {
        if (Number.parseFloat(input) < 0 || Number.isNaN(Number.parseFloat(input)))
            return 'Please enter a number greater than or equal to zero.';
        return true;
    },
    isIntegerGT0: input => {
        if (!Number.isInteger(input) || Number.parseInt(input) <= 0)
            return 'Please enter a positive integer.';
        return true;
    },
    isIntegerGTE0: input => {
        if (!Number.isInteger(input) || Number.parseInt(input) < 0)
            return 'Please enter an integer greater than or equal to zero.';
        return true;
    }
}

const questions = {
    main: {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
            'View departments',
            'View roles',
            'View employees',
            'View employees by department',
            'View employees by manager',
            'Add department',
            'Add role',
            'Add employee',
            'Update employee role',
            'Exit'
        ]
    },
    addDepartment: [
        {
            type: 'input',
            name: 'name',
            message: 'Enter new department name:',
            validate: validate.required
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: `Confirm?`
        }
    ],
    addRole: [
        {
            type: 'input',
            name: 'title',
            message: 'Enter new role title:',
            validate: validate.required
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter role salary:',
            filter: filter.toDouble,
            validate: validate.isNumberGTE0
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this employee belong to?',
            choices: []
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: `Confirm?`
        }
    ],
    addEmployee: [
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter new employee\'s first name:',
            validate: validate.required
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter new employee\'s last name:',
            validate: validate.required
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which is the employee\'s role?',
            choices: []
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: []
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: `Confirm?`
        }
    ],
    updateEmployeeRole: [
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee do you want to update?',
            choices: []
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which is the employee\'s new role?',
            choices: []
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: `Confirm?`
        }
    ],
    /*
    addRoleByID: [
        {
            type: 'input',
            name: 'title',
            message: 'Enter new role title:',
            validate: validate.required
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter role salary:',
            filter: filter.toDouble,
            validate: validate.isNumberGTE0
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter department id:',
            filter: filter.toFloat,
            validate: validate.isIntegerGT0
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: `Confirm?`
        }
    ],
    addEmployeeByID: [
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter new employee\'s first name:',
            validate: validate.required
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter new employee\'s last name:',
            validate: validate.required
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter role id:',
            filter: filter.toInteger,
            validate: validate.isIntegerGT0
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter manager id [leave blank if none]:',
            filter: filter.toInteger,
            validate: validate.isIntegerGTE0
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: `Confirm?`
        }
    ],
    updateEmployeeRoleByID: [
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter employee id:',
            filter: filter.toInteger,
            validate: validate.isIntegerGT0
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter new role id:',
            filter: filter.toInteger,
            validate: validate.isIntegerGT0
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: `Confirm?`
        }
    ],
    */
}

module.exports = questions;
