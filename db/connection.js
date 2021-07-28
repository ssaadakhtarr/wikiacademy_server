const mysql = require("mysql");

// const db = mysql.createConnection({
//   user: "areeb@areeb",
//   host: "localhost",
//   password: "",
//   database: "wikisecdb",
//   multipleStatements: true,

// });

var db = mysql.createConnection({
  host: "areeb.mysql.database.azure.com",
  user: "areeb@areeb",
  password: "SE0451980nadeem",
  database: "wikisecdb",
  port: 3306,
});

module.exports = db;
