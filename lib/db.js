const mysql = require('mysql');

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
            if (err) throw err;
            console.table(result);
        });
        conn.end();
    });
};

module.exports = db;
