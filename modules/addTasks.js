const db = require("../db/connection");

exports.sendRoomDetails = function (req, res) {
    const roomName = req.body.roomName;
    const roomTitle = req.body.roomTitle;
    const paths = [req.body.tools, req.body.web, req.body.vuln, req.body.beginner];
    const roomTagline = req.body.roomTagline;
    const roomImage = req.body.roomImage;
    const roomDescription = req.body.roomDescription;
   
    
    db.query(`INSERT INTO rooms (roomName, roomTitle, roomTagline, roomImage, roomDescription) VALUES (?, ?, ?, ?, ?)`, [roomName, roomTitle, roomTagline, roomImage, roomDescription], (err, result) => {
        // console.log(err);
        // console.log(result.insertId);
        // console.log(fields);
        db.query(`INSERT INTO paths (roomsId) VALUES (?)`, [result.insertId], (err, result1) => {
            // console.log(err);
            // console.log(result1);
            db.query(`UPDATE paths SET tools = ?, web = ?, vuln = ?, beginner =? WHERE roomsId = ?`, [req.body.tools, req.body.web, req.body.vuln, req.body.beginner, result.insertId], (err, result2)=>{
                console.log(err);
                console.log(result2);
            })
        })
    })

}

exports.sendTask = function (req, res) {
    const roomName = req.body.roomName;
    const taskNo = req.body.taskNo;
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const ques1 = req.body.ques1;
    const ques2 = req.body.ques2;
    const ques3 = req.body.ques3;
    const ques4 = req.body.ques4;
    const ques5 = req.body.ques5;
    const ans1 = req.body.ans1;
    const ans2 = req.body.ans2;
    const ans3 = req.body.ans3;
    const ans4 = req.body.ans4;
    const ans5 = req.body.ans5;
    
   
    
 
    console.log("here")

    db.query(`SELECT * FROM rooms WHERE roomName = ?`, [roomName], (err, result) => {
       
        const roomId = result[0].roomsId;
        console.log(roomId)
        db.query(`INSERT INTO tasks (taskNo, taskName, taskDescription, roomsId) VALUES (?, ?, ?, ?)`, [taskNo, taskName, taskDescription, roomId], (err, result) => {
            console.log(err);
            console.log(result);
        })
        db.query(`SELECT tasksId FROM tasks WHERE roomsId = ? AND taskNo = ?`, [roomId, taskNo], (err, result) => {
            console.log(err);
            console.log(result);
            const quesAns = [
                [ques1, ans1, result[0].tasksId],
                [ques2, ans2, result[0].tasksId],
                [ques3, ans3, result[0].tasksId],
                [ques4, ans4, result[0].tasksId],
                [ques5, ans5, result[0].tasksId],
            ]
            db.query(`INSERT INTO questions (questions, answers, tasksId) VALUES ?`, [quesAns], (err, result) => {
                console.log(err);
                console.log(result);
            })
        })
        
    })

}