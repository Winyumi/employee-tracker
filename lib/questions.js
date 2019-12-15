const questions = {
    main: {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
            'View departments',
            'View roles',
            'View employees',
            'Exit'
        ]
    }
}

module.exports = questions;
