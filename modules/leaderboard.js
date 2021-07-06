const db = require("../db/connection");
exports.getLeaderboard = function (req, res){
    db.query(`SELECT rank, username,points,level FROM users ORDER BY rank`, (err, result) => {
        console.log(result);
        res.send(result);
    })
}
