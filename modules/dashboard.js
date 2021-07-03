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

exports.getJoinedRooms = function (req, res) {
  const userId = req.body.userId;
  const roomsIds = []
  const progressRoom = [];
  db.query(`SELECT DISTINCT roomsId from userrooms WHERE userId = ?`, [userId], (err, result) => {
    result.map((i) => {
      roomsIds.push(i.roomsId);
    })
    //console.log(roomsIds);
    db.query(`SELECT * FROM rooms WHERE roomsId in (?)`, [roomsIds], (err, result1) => {
      // console.log(err);
      console.log(result1);
      // db.query(`SELECT COUNT(progBar) FROM userrooms WHERE roomsId in (?) AND userId = ? AND progBar = ?`, [roomsIds, userId, 4], (err, result2) => {
      //   console.log(err);
      //   console.log(result2);
      // } )

      res.send(result1);
    })
    // result1.RowDataPacket.map((i) => {
    //   db.query(`SELECT COUNT(progBar) FROM userrooms WHERE roomsId = ? AND userId = ? AND progBar = ?`, [i.roomsId, userId, 4], (err, result2) => {
    //     console.log(err);
    //     console.log(result2);
    //     progressRoom.push({...i, progBar: result2[0]['COUNT(progBar)']});
    //     console.log(progressRoom);
    //   })
    // })
  })
}
