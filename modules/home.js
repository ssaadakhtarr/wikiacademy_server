const db = require("../db/connection");

exports.getHomeData = function (req, res) {
  db.query(
    `SELECT blog.*,   users.username FROM blog, users WHERE blog.userId = users.id`,
    (err, result) => {
      db.query(`SELECT * FROM rooms`, (err, result_1) => {
        res.send({ result, result_1 });
      });
    }
  );
};
