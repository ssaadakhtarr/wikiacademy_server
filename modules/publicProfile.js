const db = require("../db/connection");

exports.getPublicProfile = function (req, res) {
    const username = req.body.username;

    db.query(`SELECT * FROM users WHERE username = ?`, [username], (err, result) => {
        res.send(result);
    })
}

exports.getUsername = function (req, res) {
    const userId = req.body.userId;

    db.query(`SELECT username FROM users WHERE id = ?`, [userId], (err, result) => {
        // console.log(err);
        // console.log(result);
        res.send(result);
    })
}