const db = require("../db/connection");
const bcrypt = require("bcrypt");
const moment = require('moment');

exports.updateRank = function (req, res) {
    db.query(`SET @r=0;
    UPDATE users SET rank= @r:= (@r+1) ORDER BY points DESC;`, (err, result) => {
        
    })
}

exports.updateTitle = function (req, res) {
    var title = "NOOB";
    var level = 1;
    db.query(`SELECT * FROM users`, (err, result) => {
        // console.log(result);
        result.map((i) => {
            if (i.points >= 1000000) {
                title = "LEGEND";
                level = 10;
            } else if (i.points >= 300000) {
                title = "CHAMPION";
                level = 9;
            } else if (i.points >= 150000) {
                title = "HERO";
                level = 8;
            } else if (i.points >= 80000) {
                title = "CONQUEROR";
                level = 7;
            } else if (i.points >= 40000) {
                title = "KNIGHT";
                level = 6;
            } else if (i.points >= 25000) {
                title = "SLAYER";
                level = 5;
            } else if (i.points >= 15000) {
                title = "GUARDIAN";
                level = 4;
            } else if (i.points >= 8000) {
                title = "SCOUT";
                level = 3;
            } else if (i.points >= 3000) {
                title = "NOVICE";
                level = 2;
            } else if (i.points < 3000) {
                title = "NOOB";
                level = 1;
            }
            db.query(`UPDATE users SET title = ?, level = ? WHERE id = ?`, [title, level, i.id], (err, result1) => {
                console.log(title);
                // console.log(err);
                // console.log(result);
            })
        })
    })
}