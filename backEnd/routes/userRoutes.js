//supaya connected dengan server utama
const userRouter = require('express').Router();

//untuk connect ke db
const db = require("../connection/connection");

//middleware
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const cors = require("cors");
var bcrypt = require('bcryptjs');
const saltRounds = 10;
const fileupload = require("express-fileupload");
const mkdirp = require('mkdirp');
const md5 = require("md5");


//pakai middleware
userRouter.use(bodyParser.urlencoded({ extended: true }));
userRouter.use(bodyParser.json());
userRouter.use(cors());
userRouter.use(fileupload());

userRouter.get("/users", (req, res) => {
    let sql = "SELECT * FROM users;";
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        // res.send("All users data successfully fetched!");
        res.send(result);
    });
});

userRouter.get("/users/:id", (req, res) => {
    let id_user = req.params.id; //kenapa ini id bukan id_user karena parameter yg ditrima itu :id walau yg dikirim dr front end id_user
    let sql = `SELECT * FROM users WHERE id = ${id_user} ;`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
        // res.send(`User with id: ${id} successfully fetched!`);

    });
});

//saat di refresh / login, buat session user
userRouter.post("/session", (req, res) => {
    let user_session = req.body.user_session;
    let sql = `SELECT * FROM sessions WHERE session_token = '${user_session}'`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
            console.log(result);
        }
    });
});

//logout dan hapus session user
userRouter.delete('/session/:id_user', (req, res) => {
    let id_user = req.params.id_user;
    let sql = `DELETE FROM sessions WHERE id_user = ${id_user}`;
    let query = db.query(sql, (err, result) => {
        console.log(`User with id ${id_user} just logged out!`);
    });
});


// request login dr user
userRouter.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let sql = `SELECT * FROM users WHERE username = '${username}'`;
    let query = db.query(sql, (err, result) => {
        console.log(result)
        if (err) {
            throw err;
        }
        else if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, checkPass) => {
                if (checkPass == true) {
                    // createSession(res, result);
                    // res.send(result);
                    // algoritma untuk hash session token user
                    let date = new Date();
                    let time = date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
                    let id_user = result[0].id;
                    let stringSession = id_user + "-" + time;
                    console.log(stringSession)
                    let session_token = md5(stringSession);
                    let session = {
                        id_user: result[0].id,
                        session_token: session_token
                    }
                    let sql = `INSERT INTO sessions SET ?`;
                    let query = db.query(sql, session, (err, resultSession) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("Data session sukses masuk!");
                            res.send(session.session_token);
                        }
                    });
                    // sampai sini
                }
                else {
                    res.send({ "status": "wrongPassword" });
                }
            });
        }
        else {
            res.send({ "status": "notRegistered" });
        }
    });
});

//request register dr user
userRouter.post("/users", (req, res) => {
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let phone_number = req.body.phone_number;
    let address = req.body.address;
    let role = "";
    req.body.role ? role = req.body.role : role = "User"


    let data = req.body;
    let sql = `SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else if (result.length > 0) {
            res.send({ "status": "dataExist" });
        }
        else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                let query = db.query(`INSERT INTO users (name, email, password, username, address, phone_number, role ) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, email, hash, username, address, phone_number, role], (err, resultt) => {
                    if (err) {
                        throw err;
                    };
                    console.log(resultt.insertId);

                    // algoritma untuk hash session token user
                    let date = new Date();
                    let time = date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
                    // let id_user = result[0].id;
                    let id_user = resultt.insertId;
                    let stringSession = id_user + "-" + time;
                    console.log(stringSession)
                    let session_token = md5(stringSession);
                    let session = {
                        id_user: id_user,
                        session_token: session_token
                    }
                    let sql = `INSERT INTO sessions SET ?`;
                    let query = db.query(sql, session, (err, resultSession) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("Data session sukses masuk!");
                            res.send(session);
                        }
                    });
                    // sampai sini
                });
            })
        }
    });
});


//request edit data user
userRouter.put("/users/:id", (req, res) => {
    let data = req.body;
    let sql = `UPDATE users SET ? where id = ${req.params.id} ;`;
    let query = db.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(`User with id: ${req.params.id} successfully updated!`);
    });
});


//request delete data user
userRouter.delete("/users/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM users where id = ${id} ;`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(`User with id: ${id} successfully deleted!`);

        // remove files user and the directory
        var deleteFolderRecursive = function (path) {
            if (fs.existsSync(`./files/users/${id}`)) {
                fs.readdirSync(`./files/users/${id}`).forEach(function (file, index) {
                    var curPath = `./files/users/${id}` + "/" + file;
                    if (fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(`./files/users/${id}`);
            }
        };
        deleteFolderRecursive();

    });
});


//request upload profile picture user
userRouter.post('/upload', (req, res) => {
    //kalau ada data nya, masukin; kalau gaada, default di database udh ada profpict.png
    if (req.files) {
        var userid = req.body.userid;
        var fileData = req.files.file;
        var fileDataName = fileData.name;

        //masukin url path gambarnya ke row user
        var filePath = `http://localhost:3007/files/users/${userid}/${fileDataName}`;
        let query = db.query(`UPDATE users SET profpict = ? WHERE ID = ${userid}`, filePath, (err, result) => {
            if (err) {
                console.log("error");
            }
            else {
                res.send(filePath);
            }
        });

        //masukin foto nya ke storage backend
        //kalau udh ada foldernya (berarti mau update)
        fs.pathExists(`./files/users/${userid}`, (err, exists) => {
            if (exists) {
                // hapus isi dari direktori nya
                fs.emptyDirSync(`./files/users/${userid}`);
                // dimasukin file yg baru
                fileData.mv(`./files/users/${userid}/` + fileDataName, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        // res.send(fileDataName);
                        console.log("Photo successfully stored in storage!");
                    }
                });
            }
            // kalau belum ada direktori nya (berarti baru register), buat folder baru, trus dimasukin file yg baru
            else {
                fs.mkdirSync(`./files/users/${userid}`);
                fileData.mv(`./files/users/${userid}/` + fileDataName, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        // res.send(fileDataName);
                        console.log("Photo successfully stored in storage!");
                    }
                });
            }
        })
    }
});


module.exports = userRouter;
