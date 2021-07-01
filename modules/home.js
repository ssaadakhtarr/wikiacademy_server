const db = require("../db/connection");

exports.getHomeData = function (req, res) {
    // db.query(`SELECT * FROM blog WHERE blogStatus = 1`, (err, result_0) => {
    //     // console.log(err);
    //     // console.log(result_0);
    //     db.query(`SELECT * FROM rooms`, (err, result_1) => {
    //         // console.log(err);
    //         // console.log(result_1);
    //         res.send({result_0, result_1});
    //     })
    // })
    var newArr = [];
    db.query(`SELECT * FROM blog`, (err, result) => {
        // console.log(err);
        // console.log(result);
        // res.send(result);
        result.map((i, index) => {
          db.query(
            `SELECT username FROM users WHERE id = ?`,
            [i.userId],
            (err, result1) => {
              //    console.log(result1);
              newArr.push({ ...i, username: result1[0].username });
              //    console.log(newArr);
              if (result.length === index + 1) {
                console.log(newArr);
                
              }
            }
          );

          db.query(`SELECT * FROM rooms`, (err, result_1) => {
            // console.log(err);
            // console.log(result_1);
            res.send({newArr, result_1});
        })
        });
      });
}