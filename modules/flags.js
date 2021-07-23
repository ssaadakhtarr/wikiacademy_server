const db = require("../db/connection");

exports.checkFlag = function (req, res) {
    const flag = req.body.submitFlag;
    const userId = req.body.userId;
    var exists = false;
    console.log(flag, userId);
    db.query(`SELECT id from flags WHERE flagValue = ?`, [flag], (err, result) => {
        console.log(err);
        // console.log(result[0].id);
        if (result.length > 0) {
            db.query(`SELECT * FROM userflags WHERE userId = ?`, [userId], (err, result1) => {
                console.log(err);
                console.log(result1);
                if (result1.length > 0) {
                    result1.map((i)=>{
                        if (i.flagId === result[0].id) {
                            exists = true;
                            res.json({status: "Already submitted"})
                            
                            
                        } 
                    })
                } 
                console.log("else after")
                if (exists === false) {
                    console.log("if here")
                    db.query(`INSERT INTO userflags (flagId, userId) VALUES (?, ?)`, [result[0].id, userId], (err, result2) => {
                        console.log(err);
                        console.log(result2);
                        res.json({status: "Flag submitted"})
                    })
                }
            })
        } else {
            console.log("else after after")
            res.json({status: "Invalid flag"})
        }
    })
}