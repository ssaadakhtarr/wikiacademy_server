const db = require("../db/connection");

exports.getBlog = function (req, res) {
    var newArr = [];
    db.query(`SELECT * FROM blog`, (err, result) => {
        // console.log(err);
        // console.log(result);
        // res.send(result);
       result.map((i, index) => {
           db.query(`SELECT username FROM users WHERE id = ?`, [i.userId], (err, result1) => {
            //    console.log(result1);
               newArr.push({...i, username: result1[0].username})
            //    console.log(newArr);
            if (result.length === index+1) {
                console.log(newArr);
                res.send(newArr);
               }
           })
         

       })
       
    })
}

exports.addBlog = function (req, res) {
    const blogTitle = req.body.blogTitle;
    const blogDesc = req.body.blogDesc;
    const blogImg = req.body.blogImg;
    const blogMaterial = req.body.blogMaterial;
    const userId = req.body.userId;

    db.query(`INSERT INTO blog (blogTitle, blogDesc, blogImg, blogMaterial, userId) VALUES (?, ?, ?, ?, ?)`, [blogTitle, blogDesc, blogImg, blogMaterial, userId], (err, result) => {
        // console.log(err);
        // console.log(result);
    })

    
}

exports.getBlogPage=function(req,res){
    var newArr=[];
    const blogId=req.body.blogid;

    db.query(`SELECT * FROM blog WHERE blogId = ?`,[blogId],(err,result)=>{
        console.log(err);
        console.log(result);
        db.query(`SELECT username,summary from users WHERE id=?`,[result[0].userId],(err,result1)=>{
            console.log(err);
            console.log(result1);
            newArr.push({...result[0],username:result1[0].username,summary:result1[0].summary})
            console.log(newArr);
            res.send(newArr)
       
        })
   

    })
}