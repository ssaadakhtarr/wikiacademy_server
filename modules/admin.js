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

exports.getUserData = function (req, res) {
    db.query(`SELECT id, username FROM users`, (err, result) => {
        // console.log(result);
        res.send(result);
    })
    
}

exports.deleteUser = function (req, res) {
    const username = req.body.temp;
    db.query(`DELETE FROM users WHERE username = ?`, [username], (err, result) => {
        console.log(err);
        console.log(result);
    })
}

exports.getAllRooms = function (req, res) {
    db.query(`SELECT roomsId, roomName FROM rooms`, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
}

exports.getPendingBlogs = function (req, res) {
    db.query(`SELECT blogId, blogTitle from blog WHERE blogStatus = 0`, (err, result) => {
        // console.log(err);
        // console.log(result);
        res.send(result);
    })
}

exports.discardBlog = function (req, res) {
    const blogId = req.body.id
    db.query(`DELETE from blog WHERE blogId = ?`, [blogId], (err, result) => {
        console.log(err);
        console.log(result);
    })
}

exports.approveBlog = function (req, res) {
    const blogId = req.body.id
    // console.log(blogId);
    db.query(`UPDATE blog SET blogStatus = 1 WHERE blogId = ?`, [blogId], (err, result) => {
        
    })
}

exports.getAllBlogs = function (req, res) {
    db.query(`SELECT blogId, blogTitle from blog WHERE blogStatus = 1`, (err, result) => {
        // console.log(err);
        // console.log(result);
        res.send(result);
    })
}













































































































