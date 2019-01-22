const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "terserahh",
    database: "vanandco"
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Database Connected!");
    }
});

module.exports = connection;