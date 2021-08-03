const mysql = require("mysql");

var db = mysql.createPool({
  host: "wikisecdb2.mysql.database.azure.com",
  user: "areebsaad123@wikisecdb2",
  password: "r3,u}uBrYBZ$bJwW",
  database: "wikisecdb2",
  port: 3306,
  multipleStatements: true,
});

module.exports = db;