const db = require("../db/connection");
const bcrypt = require("bcrypt");
const moment = require('moment');

exports.updateRank = function (req, res) {
    db.query(`SET @r=0;
    UPDATE users SET rank= @r:= (@r+1) ORDER BY points DESC;`, (err, result) => {
        console.log(err);
        console.log(result);
    })
}