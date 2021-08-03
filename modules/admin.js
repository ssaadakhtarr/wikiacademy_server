const db = require("../db/connection");


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
  
    res.send(result);
  });
};

exports.deleteUser = function (req, res) {
  const username = req.body.temp;
  db.query(
    `DELETE FROM users WHERE username = ?`,
    [username],
    (err, result) => {
    
    }
  );
};

exports.getAllRooms = function (req, res) {
  db.query(`SELECT roomsId, roomName, roomTitle FROM rooms`, (err, result) => {
   
    res.send(result);
  });
};

exports.getPendingBlogs = function (req, res) {
  db.query(
    `SELECT blogId, blogTitle from blog WHERE blogStatus = 0`,
    (err, result) => {
    
      res.send(result);
    }
  );
};

exports.discardBlog = function (req, res) {
  const blogId = req.body.id;
  db.query(`DELETE from blog WHERE blogId = ?`, [blogId], (err, result) => {
  
  });
};

exports.approveBlog = function (req, res) {
  const blogId = req.body.id;

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

      result.map((i) => {
        taskId.push(i.tasksId);
      });
     
      db.query(
        `DELETE FROM questions WHERE tasksId IN (?)`,
        [taskId],
        (err, result1) => {
     
          if (!err) {
            db.query(
              `DELETE FROM tasks WHERE roomsId = ?`,
              [roomId],
              (err, result2) => {
               
                if (!err) {
                  db.query(
                    `DELETE FROM rooms WHERE roomsId = ?`,
                    [roomId],
                    (err, result3) => {
                 
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
  
 
};
