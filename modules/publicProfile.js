const db = require("../db/connection");

exports.getPublicProfile = function (req, res) {
    const username = req.body.username;

    db.query(`SELECT * FROM users WHERE username = ?`, [username], (err, result) => {
        // console.log(err);
        // console.log(result);
        res.send(result);
    })
}