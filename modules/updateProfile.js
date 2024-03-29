const db = require("../db/connection");
const bcrypt = require("bcrypt");
const moment = require("moment");
const saltRounds = 10;

exports.updateDetails = function (req, res) {
  const id = req.body.id;
  const name = req.body.name.split(" ");
  const firstName = name[0];
  const lastName = name[1];
  const username = req.body.username;
  const email = req.body.email;

  db.query(`SELECT firstName, lastName, username, email FROM users WHERE id = ?`, [id], (err, result) => {
      console.log(err);
      console.log(result);
      if (result[0].email === email && result[0].username === username) {
          db.query(`UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ? WHERE id = ?`, [firstName, lastName, username, email, id], (err, result1) => {
            console.log(err);
            console.log(result1);
            res.json({status: "success"})
          })
      } else if (result[0].email !== email && result[0].username === username) {
          db.query(`SELECT COUNT(*) FROM users WHERE email = ?`, [email], (err, result2) => {
              console.log(err);
              console.log(result2);
              if (result2[0]['COUNT(*)'] < 1) {
                db.query(`UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ? WHERE id = ?`, [firstName, lastName, username, email, id], (err, result3) => {
                    console.log(err);
                    console.log(result3);
                    res.json({status: "success"})
                  })
              } else {
                  res.json({status: "email failure"});
              }
          })
      } else if (result[0].email === email && result[0].username !== username) {
        db.query(`SELECT COUNT(*) FROM users WHERE username = ?`, [username], (err, result2) => {
            console.log(err);
            console.log(result2);
            if (result2[0]['COUNT(*)'] < 1) {
              db.query(`UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ? WHERE id = ?`, [firstName, lastName, username, email, id], (err, result3) => {
                  console.log(err);
                  console.log(result3);
                  res.json({status: "success"})
                })
            } else {
                res.json({status: "username failure"});
            }
        })
      } else if (result[0].email !== email && result[0].username !== username) {
        db.query(`SELECT COUNT(*) FROM users WHERE username = ? OR email = ?`, [username, email], (err, result2) => {
            console.log(err);
            console.log(result2);
            if (result2[0]['COUNT(*)'] < 1) {
              db.query(`UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ? WHERE id = ?`, [firstName, lastName, username, email, id], (err, result3) => {
                  console.log(err);
                  console.log(result3);
                  res.json({status: "success"})
                })
            } else {
                res.json({status: "both failure"});
            }
        })
      }
  })

//   db.query(
//     `SELECT COUNT(*) FROM users WHERE email='${email}' OR username='${username}'`,
//     (err, result) => {
//       console.log(result);
//       if (result[0]["COUNT(*)"] > 0) {
//         res.json({ message: "User already exists" });
//       } else {
//         db.query(
//           `UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ? WHERE id = ?`,
//           [firstName, lastName, username, email, id],
//           (err, result) => {
//             console.log(result);
//           }
//         );
//       }
//     }
//   );
};

exports.changePassword = function (req, res) {
  const id = req.body.id;
  // console.log(id)
  const currentPassword = req.body.currentPassword;
  // console.log(currentPassword)
  const newPassword = req.body.newPassword;

  db.query(`SELECT password from users WHERE id = ?`, [id], (err, result) => {
    //console.log(result[0].password);
    // if (result[0].password == currentHash)
    bcrypt.compare(currentPassword, result[0].password, (err, response) => {
      if (response) {
        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
          db.query(
            `UPDATE users SET password = ? WHERE id = ?`,
            [hash, id],
            (err, result) => {
              console.log(result);
              res.json({status: "success"})
            }
          );
        });
      } else {
        res.json({ message: "Invalid Current Password", status: "failure"});
      }
    });
  });
};

exports.updatePersonalInfo = function (req, res) {
  const id = req.body.id;
  const selectedDate = req.body.selectedDate;
  const gender = req.body.gender;
  const occupation = req.body.occupation;
  const areaOfInterest = req.body.areaOfInterest;
  const summary = req.body.summary;
  console.log(selectedDate);
  console.log(gender);
  console.log(id);
  db.query(
    `UPDATE users SET dateOfBirth = ?, gender = ?, occupation = ?, areaOfInterest = ?, summary = ? WHERE id = ?`,
    [selectedDate, gender, occupation, areaOfInterest, summary, id],
    (err, result) => {
      console.log(result);
      if (!err) {
        res.json({ status: "success" });
      }
    }
  );
};

exports.updateSocials = function (req, res) {
  const id = req.body.id;
  const twitter = req.body.twitter;
  const instagram = req.body.instagram;
  const github = req.body.github;
  const linkedin = req.body.linkedin;

  db.query(
    `UPDATE users SET twitter = ?, instagram = ?, github = ?, linkedin = ? WHERE id = ?`,
    [twitter, instagram, github, linkedin, id],
    (err, result) => {
      console.log(result);
      if (!err) {
        res.json({ status: "success" });
      }
    }
  );
};

exports.deleteAccount = function (req, res) {
  const id = req.body.id;
  const password = req.body.password;
  db.query(`SELECT password from users WHERE id = ?`, [id], (err, result) => {
    //console.log(result[0].password);
    // if (result[0].password == currentHash)
    bcrypt.compare(password, result[0].password, (err, response) => {
      if (response) {
        db.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) => {
          req.session.destroy();
          res.json({ message: "success" });
          console.log(result);
        });
      } else {
        res.json({ message: "error" });
      }
    });
  });
};
