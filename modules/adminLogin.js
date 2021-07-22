const jwt = require("jsonwebtoken");
const db = require("../db/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const moment = require('moment');
const cookieParser = require("cookie-parser");
const session = require("express-session");


exports.checkAdmin = (req, res) => {
    const {username, password} = req.body;
    console.log(username)

    db.query(`SELECT * FROM admin WHERE username = '${username}'`, (err, result)=> {
        console.log(err, result)
        if(!err && result.length > 0){
            if (result[0].password === password){
                req.session.user = result;
               res.send({status: 'success',  message: 'Admin Signed In Successfully', result: result})
            }else{
                res.send({status: 'fail',  message: 'Admin Wrong Credentials'})
            }
        }else{
            res.send({status: 'fail',  message: err})
        }
    })   


}


exports.setAdminSession = function (req, res) {
    const username = req.body.username;
    const sessionCookie = req.body.sessionCookie;
    db.query(`UPDATE admin SET session = ? WHERE username = ?`, [sessionCookie, username], (err, result) => {
        console.log(err);
        console.log(result);
        db.query(`SELECT * FROM admin WHERE username = ?`, [username], (err, result1) => {
            res.send(result1);
        })
    })
}

exports.adminLogout = function (req, res) {
    req.session.destroy();
    res.clearCookie("userId");
    res.json({ auth: false, message: "successfully logged out" });
}