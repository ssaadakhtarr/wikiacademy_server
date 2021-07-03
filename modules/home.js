const db = require("../db/connection");

exports.getHomeData = function (req, res) {
  var newArr = [];
  db.query(`SELECT * FROM blog`, (err, result) => {
    result.map((i, index) => {
      db.query(
        `SELECT username FROM users WHERE id = ?`,
        [i.userId],
        (err, result1) => {
          //    console.log(result1);
          newArr.push({ ...i, username: result1[0].username });
          //    console.log(newArr);
          if (result.length === index + 1) {
            // console.log(newArr);
          } else {
            db.query(`SELECT * FROM rooms`, (err, result_1) => {
              // console.log(err);
              // console.log(result_1);
              console.log(newArr);
              console.log(result_1);
              res.send({ newArr, result_1 });
            });
          }
        }
      );
    });
  });
};
