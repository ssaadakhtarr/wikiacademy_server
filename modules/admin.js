const db = require("../db/connection");


// areeb's work

exports.getAdminData = function (req, res){
    const arr1=[];

    db.query(`SELECT COUNT(*) FROM users`,(err,results)=>{
       
        arr1.push({users:results[0]['COUNT(*)']})
     
    })

    db.query(`SELECT COUNT(*) FROM rooms`,(err,results)=>{
        console.log(err);
      
        arr1.push({rooms:results[0]['COUNT(*)']})
        console.log(results);
      
    })
    db.query(`SELECT COUNT(*) FROM questions`,(err,results)=>{
        console.log(err);
        console.log(results);
        arr1.push({questions:results[0]['COUNT(*)']})
        res.send(arr1); 
    })
}





























































































// saad's work



















































































































