const db = require("../db/connection");

// areeb's work

exports.getAdminData = function (req, res) {
  try {
    db.query(`SELECT COUNT(*) FROM users`, (err, result) => {
      db.query(`SELECT COUNT(*) FROM rooms`, (err, result1) => {
        db.query(`SELECT COUNT(*) FROM questions`, (err, result2) => {
          if (err) res.status(422).json({ status: "fail", message: err });
          else {
            res.send({
              users: result[0]["COUNT(*)"],
              rooms: result1[0]["COUNT(*)"],
              questions: result2[0]["COUNT(*)"],
            });
          }
        });
      });
    });
  } catch (err) {
    res.status(422).json({ status: "fail", message: err });
  }
};

// saad's work

exports.getUserData = function (req, res) {
  db.query(`SELECT id, username FROM users`, (err, result) => {
    // console.log(result);
    res.send(result);
  });
};

exports.deleteUser = function (req, res) {
  const username = req.body.temp;
  db.query(
    `DELETE FROM users WHERE username = ?`,
    [username],
    (err, result) => {
      console.log(err);
      console.log(result);
    }
  );
};

exports.getAllRooms = function (req, res) {
  db.query(`SELECT roomsId, roomName, roomTitle FROM rooms`, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
};

exports.getPendingBlogs = function (req, res) {
  db.query(
    `SELECT blogId, blogTitle from blog WHERE blogStatus = 0`,
    (err, result) => {
      // console.log(err);
      // console.log(result);
      res.send(result);
    }
  );
};

exports.discardBlog = function (req, res) {
  const blogId = req.body.id;
  db.query(`DELETE from blog WHERE blogId = ?`, [blogId], (err, result) => {
    console.log(err);
    console.log(result);
  });
};

exports.approveBlog = function (req, res) {
  const blogId = req.body.id;
  // console.log(blogId);
  db.query(
    `UPDATE blog SET blogStatus = 1 WHERE blogId = ?`,
    [blogId],
    (err, result) => {}
  );
};

exports.getAllBlogs = function (req, res) {
  db.query(
    `SELECT blogId, blogTitle from blog WHERE blogStatus = 1`,
    (err, result) => {
      // console.log(err);
      // console.log(result);
      res.send(result);
    }
  );
};

exports.deleteRoom = function (req, res) {
  const roomId = req.body.roomId;
  const taskId = [];

  db.query(
    `SELECT tasksId FROM tasks WHERE roomsId = ?`,
    [roomId],
    (err, result) => {
      // console.log(err);
      // console.log(result);
      result.map((i) => {
        taskId.push(i.tasksId);
      });
      // console.log(taskId);
      db.query(
        `DELETE FROM questions WHERE tasksId IN (?)`,
        [taskId],
        (err, result1) => {
          // console.log(err);
          // console.log(result1);
          if (!err) {
            db.query(
              `DELETE FROM tasks WHERE roomsId = ?`,
              [roomId],
              (err, result2) => {
                // console.log(err);
                // console.log(result2);
                if (!err) {
                  db.query(
                    `DELETE FROM rooms WHERE roomsId = ?`,
                    [roomId],
                    (err, result3) => {
                      // console.log(err);
                      // console.log(result3);
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  );
  // db.query(`SELECT tasks.tasksId, questions.questionsId FROM tasks, questions WHERE tasks.roomsId = ${roomId} AND questions.tasksId = tasks.tasksId`,(err, result) => {
  //     console.log(err);
  //     console.log(result);
  //     // res.send(result);

  // })
  console.log(taskId);
};
