const DB_ENV = require('./env');
const mysql = require('mysql');

const db = function(query) {
    return new Promise((resolve, reject) => {
        let conn = mysql.createConnection(DB_ENV);
        conn.connect(err => {
            if (err) {
                console.error(err.message);
                reject(err.message);
            }
            conn.query(query, (err, result) => {
                conn.end();
                if (err) {
                    console.error(err.message);
                    reject(err.message);
                }
                resolve(result);
            });
        });
    });
};

module.exports = db;
