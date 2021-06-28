const jwt = require("jsonwebtoken");
const db = require("../db/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const moment = require('moment');
const cookieParser = require("cookie-parser");
const session = require("express-session");

exports.getLogin = function (req, res) {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

exports.register = function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      `SELECT COUNT(*) FROM users WHERE email='${email}' OR username='${username}'`,
      (err, result) => {
        console.log(result);
        if (result[0]["COUNT(*)"] > 0) {
          res.json({ message: "User already exists" });
        } else {
          db.query(
            "INSERT INTO users (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)",
            [firstName, lastName, username, email, hash],
            (err, result) => {
              console.log(err);
              console.log(result);
              res.json({ message: "Success" });
            }
          );
        }
      }
    );
  });
};

exports.verifyJWT = function (req, res, next) {
  const token = String(req.headers["authorization"]).slice(7);

  if (!token) {
    res.json({ auth: false, message: "Yo, we need a token rn" });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ auth: false, message: "Yo u failed to auth.." });
      } else {
        next();
      }
    });
  }
};

exports.userAuth = function (req, res) {
  res.json({ auth: true, message: "Yo, u are authenticated!" });
};

exports.login = function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, "jwtSecret", {});
            //this contains every info about the logged in user
            req.session.user = result;
            result[0].dateOfBirth = moment(result[0].dateOfBirth).format('YYYY-MM-DD');
            console.log(result);
            res.json({ auth: true, token: token, result: result });
            
          } else {
            res.json({ auth: false, message: "wrong username/password" });
          }
        });
      } else {
        res.json({ auth: false, message: "no user exists" });
      }
    }
  );
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.clearCookie("userId");
  res.json({ auth: false, message: "successfully logged out" });
};
