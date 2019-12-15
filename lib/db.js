const mysql = require('mysql');

const db = function(query) {
    return new Promise((resolve, reject) => {
        let conn = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "test",
            password: "test",
            database: "employee_db"
        });
        conn.connect(err => {
            if (err) console.error(err.message);
            conn.query(query, (err, result) => {
                conn.end();
                if (err) console.error(err.message);
                resolve(result);
            });
        });
    });
};

module.exports = db;
