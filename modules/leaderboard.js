const db = require("../db/connection");
exports.getLeaderboard = function (req, res){
    db.query(`SELECT rank, username,points,level FROM users`, (err, result) => {
        console.log(result);
        res.send(result);
    })
}