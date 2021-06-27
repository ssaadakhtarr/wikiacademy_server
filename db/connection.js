const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "wikisecdb",
  multipleStatements: true,
});

module.exports = db;
