const db = require("../db/connection");

exports.getDashboard = function (req, res) {

  db.query(`SELECT COUNT(*) FROM users`, (err, results) => {
    db.query(
      `SELECT rank,level,points FROM users WHERE id=${req.params.id}`,
      (err, results1) => {
        const { rank,points,level } = results1[0];
        res.send({
          users: results[0]["COUNT(*)"],
          rank,
          points,
          level,
         
        });
      }
    );
    
  });
};
