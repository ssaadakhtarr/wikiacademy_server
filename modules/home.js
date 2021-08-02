const db = require("../db/connection");

exports.getHomeData = function (req, res) {
  db.query(
    `SELECT blog.*,   users.username FROM blog, users WHERE blog.userId = users.id AND blog.blogStatus = 1`,
    (err, result) => {
      db.query(`SELECT * FROM rooms`, (err, result_1) => {
        console.log(result);
        res.send({ result, result_1 });
      });
    }
  );
};
