const db = require("../db/connection");

exports.getPublicProfile = function (req, res) {
    const username = req.body.username;

    db.query(`SELECT * FROM users WHERE username = ?`, [username], (err, result) => {
        res.send(result);
    })
}