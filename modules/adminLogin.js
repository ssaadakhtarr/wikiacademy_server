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
        if(!err){
            if (result[0].password === password){
               res.send({status: 'success',  message: 'Admin Signed In Successfully'})
            }else{
                res.send({status: 'fail',  message: 'Admin Wrong Credentials'})
            }
        }else{
            res.send({status: 'fail',  message: err})
        }
    })   


}