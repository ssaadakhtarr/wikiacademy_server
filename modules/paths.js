const db = require("../db/connection");

exports.getPath = function (req, res) {
    const {pathName} = req.params;
    console.log(pathName);
    const newarray = [];
    // console.log(req.params.pathName);
    // console.log(req.query.pathName);

// `SELECT blog.*,   users.username FROM blog, users WHERE blog.userId = users.id`

    db.query(`SELECT paths.roomsId,   rooms.* FROM paths, rooms WHERE paths.${pathName} = 1 AND paths.roomsId = rooms.roomsId`,(err, result) => {
        // console.log(err);
        // console.log(result);
        res.send(result);
    })

    // db.query(`SELECT roomsId FROM paths WHERE ${pathName} = 1`, (err,result) => {
    //     // console.log(err);
    //     // console.log(result);
    //     result.map((i) => {
    //         newarray.push(i.roomsId);
    //     })
    //     console.log(newarray);
    //     db.query(`SELECT * FROM rooms WHERE roomsId IN (?)`, [newarray], (err, result2) => {
    //         console.log(err);
    //         console.log(result2);
    //     })
    // })
    

}