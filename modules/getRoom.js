const db = require("../db/connection");

exports.getRoomDetails = function (req, res) {
  const roomname = req.body.roomname;
  console.log(roomname);
  db.query(
    `SELECT * FROM rooms WHERE roomName = ?`,
    [roomname],
    (err, result) => {
      // console.log(err);
      // console.log(result);
      res.send(result[0]);
    }
  );
};

exports.getTaskDetails = function (req, res) {
  const roomname = req.body.roomname;
  const tasks = [];
  db.query(
    `SELECT roomsId FROM rooms WHERE roomName = ?`,
    [roomname],
    (err, result) => {
      console.log(err);
      console.log(result);
      db.query(
        `SELECT * FROM tasks WHERE roomsId = ?`,
        [result[0].roomsId],
        (err, result) => {
          // console.log(err);
          // console.log(result);
          // result.map((i) => {
          //   db.query(`SELECT * FROM questions WHERE tasksId = ?`, [i.tasksId], (err, result2) => {
          //     tasks.push({task: result, questions: result2});
          //   })
          // })
          // if (tasks.length === 5) {
          //   console.log(tasks)
          //   res.send(tasks);
          // }
          
          db.query(
            `SELECT * FROM questions WHERE tasksId IN (?, ?, ?, ?, ?)`,
            [
              result[0].tasksId,
              result[1].tasksId,
              result[2].tasksId,
              result[3].tasksId,
              result[4].tasksId,
            ],
            (err, result2) => {
              // console.log(err);
              // console.log(result2);
              res.send([result, result2]);
            }
          );
        }
      );
    }
  );
};

exports.getUserRooms = function (req, res) {
  const userId = req.body.userId;
  const roomname = req.body.roomname;

  db.query(
    `SELECT * FROM rooms WHERE roomName = ?`,
    [roomname],
    (err, result0) => {
      db.query(
        `SELECT tasksId from tasks WHERE roomsId = ?`,
        [result0[0].roomsId],
        (err, result) => {
          db.query(
            `SELECT questionsId from questions WHERE tasksId IN (?, ?, ?, ?, ?)`,
            [
              result[0].tasksId,
              result[1].tasksId,
              result[2].tasksId,
              result[3].tasksId,
              result[4].tasksId,
            ],
            (err, result2) => {
              const insertUserRoom = [
                [
                  userId,
                  result0[0].roomsId,
                  result[0].tasksId,
                  result2[0].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[0].tasksId,
                  result2[1].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[0].tasksId,
                  result2[2].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[0].tasksId,
                  result2[3].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[0].tasksId,
                  result2[4].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[1].tasksId,
                  result2[5].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[1].tasksId,
                  result2[6].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[1].tasksId,
                  result2[7].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[1].tasksId,
                  result2[8].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[1].tasksId,
                  result2[9].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[2].tasksId,
                  result2[10].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[2].tasksId,
                  result2[11].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[2].tasksId,
                  result2[12].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[2].tasksId,
                  result2[13].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[2].tasksId,
                  result2[14].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[3].tasksId,
                  result2[15].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[3].tasksId,
                  result2[16].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[3].tasksId,
                  result2[17].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[3].tasksId,
                  result2[18].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[3].tasksId,
                  result2[19].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[4].tasksId,
                  result2[20].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[4].tasksId,
                  result2[21].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[4].tasksId,
                  result2[22].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[4].tasksId,
                  result2[23].questionsId,
                ],
                [
                  userId,
                  result0[0].roomsId,
                  result[4].tasksId,
                  result2[24].questionsId,
                ],
              ];

              db.query(
                `INSERT INTO userRooms (userId, roomsId, tasksId, questionsId) VALUES ? ON DUPLICATE KEY UPDATE userId=VALUES(userId), roomsId=VALUES(roomsId), tasksId=VALUES(tasksId), questionsId=VALUES(questionsId)`,
                [insertUserRoom],
                (err, result3) => {
                  // console.log(err);
                  // console.log(result3);
                }
              );
            }
          );
        }
      );
    }
  );
};

exports.checkUserRooms = function (req, res) {
  const userId = req.body.userId;
  const roomname = req.body.roomname;

  db.query(`SELECT * FROM rooms WHERE roomName = ?`, [roomname], (err, result) => {
  //  console.log(result[0]);

    db.query(`SELECT * FROM userRooms WHERE userId = ? AND roomsId = ?`, [userId, result[0].roomsId], (err, result1) => {
      // console.log(result1);
      res.send(result1);
    })
  })
}


exports.isAnswered = function (req, res) {
  const userId = req.body.userId;
  const roomsId = req.body.roomsId;
  const questionsId = req.body.questionsId;

  db.query(`UPDATE userRooms SET isAnswered = ?, progBar = ? WHERE questionsId = ?`, [1, 4, questionsId], (err, result) => {
    // console.log(err);
    // console.log(result);
    db.query(`UPDATE users SET points = points + 100`, (err, result0) => {
      
    })
  db.query(`SELECT * FROM userRooms WHERE userId = ? AND roomsId = ?`, [userId, roomsId], (err, result1) => {
    // console.log(err);
    // console.log(result1);
    res.send(result1);
  })

  })
}

exports.getProgress = function (req, res) {
  const userId = req.body.userId;
  const roomname = req.body.roomname;

  db.query(`SELECT roomsId FROM rooms WHERE roomName = ?`, [roomname], (err, result) => {

    db.query(`SELECT COUNT(progBar) FROM userRooms WHERE userId = ? AND roomsId = ? AND isAnswered = ?`, [userId, result[0].roomsId, 1], (err, result1) => {
      // console.log(err);
      res.send(result1[0])
      
    })
  })
}



