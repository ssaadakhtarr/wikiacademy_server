const mysql = require("mysql");

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "",
//   database: "wikisecdb",
//   multipleStatements: true,
// });

// var db = mysql.createPool({
//   host: "remotemysql.com",
//   user: "a57nqXHFM7",
//   password: "tyW3J7kuef",
//   database: "a57nqXHFM7",
//   multipleStatements: true,
//   port: 3306,
// });

var db = mysql.createPool({
  host: "areeb.mysql.database.azure.com",
  user: "areeb@areeb",
  password: "SE0451980nadeem",
  database: "wikisecdb",
  port: 3306,
  multipleStatements: true,
});

// db.connect((err) => {
//   if (!err) {
//     console.log("Connected");
//   } else {
//     console.log(err);
//     console.log("Connection Failed");
//   }
// });

module.exports = db;
