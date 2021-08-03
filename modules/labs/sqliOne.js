const db = require("../../db/connection");


exports.login = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    const query = `SELECT * FROM labusers WHERE username = '${username}' AND password = '${password}'`
    db.query(query, (err, result) => {
        res.send(result);
    })
}