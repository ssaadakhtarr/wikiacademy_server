const db = require("../db/connection");

exports.getDashboard = function (req, res) {
  db.query(`SELECT COUNT(*) FROM users`, (err, results) => {
    db.query(
      `SELECT rank,level,points,title,firstName,lastName,username,email,dateOfBirth, gender, occupation, areaOfInterest, summary, twitter, instagram, github, linkedin FROM users WHERE id=${req.params.id}`,
      (err, results1) => {
        const {
          rank,
          points,
          level,
          title,
          firstName,
          lastName,
          username,
          email,
          dateOfBirth,
          gender,
          occupation,
          areaOfInterest,
          summary,
          twitter,
          instagram,
          github,
          linkedin,
        } = results1[0];
        res.send({
          users: results[0]["COUNT(*)"],
          rank,
          points,
          level,
          title,
          firstName,
          lastName,
          username,
          email,
          dateOfBirth,
          gender,
          occupation,
          areaOfInterest,
          summary,
          twitter,
          instagram,
          github,
          linkedin,
        });
      }
    );
  });
};

exports.getJoinedRooms = function (req, res) {
  const username = req.body.username;
  const roomsIds = [];
  const progressRoom = [];

  db.query(
    `SELECT id FROM users WHERE username = ?`,
    [username],
    (err, result0) => {
      console.log(result0[0].id);
      db.query(
        `SELECT DISTINCT roomsId from userrooms WHERE userId = ?`,
        [result0[0].id],
        (err, result) => {
          if (result.length > 0) {
            result.map((i) => {
              roomsIds.push(i.roomsId);
            });
            console.log(roomsIds);
            db.query(
              `SELECT * FROM rooms WHERE roomsId in (?)`,
              [roomsIds],
              (err, result1) => {
                console.log(err);
                console.log(result1);
                // db.query(`SELECT COUNT(progBar) FROM userrooms WHERE roomsId in (?) AND userId = ? AND progBar = ?`, [roomsIds, userId, 4], (err, result2) => {
                //   console.log(err);
                //   console.log(result2);
                // } )
                result1.map((j) => {
                  //  console.log(j.roomName);
                  // console.log(j.roomsId, result0[0].id, 4);
                  db.query(
                    `SELECT COUNT(progBar) FROM userrooms WHERE roomsId = ? AND userId = ? AND progBar = ?`,
                    [j.roomsId, result0[0].id, 4],
                    (err, result2) => {
                      // console.log(err);
                      // console.log(result2);
                      progressRoom.push({
                        ...j,
                        progBar: result2[0]["COUNT(progBar)"],
                      });
                      // console.log(progressRoom);
                      if (progressRoom.length === roomsIds.length) {
                        res.send(progressRoom);
                      }
                      // res.send(progressRoom);
                      // res.end();
                    }
                  );
                });
              }
            );
          } else {
            res.json({length: 0})
          }
          // console.log(result);
          
        }
      );
    }
  );
};
