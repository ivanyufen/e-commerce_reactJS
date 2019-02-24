//supaya connected dengan server utama
const userRouter = require('express').Router();
const http = require("https");
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
        console.log(result)
        console.log(result.length)
        if (err) {
            throw err;
        }
        else if (result.length == 0) {
            res.send({
                "status": "wrongSession"
            });

        }
        else {
            res.send(result);
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
    let sql = `SELECT * FROM users WHERE username = '${username}' OR email='${username}'`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, checkPass) => {
                if (checkPass == true) {
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
    console.log(req.body)
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let phone_number = req.body.phone_number;
    let address = req.body.address;
    let province = req.body.province;
    let city = req.body.city;
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
                let query = db.query(`INSERT INTO users (name, email, password, username, address, city, province, phone_number, role ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [name, email, hash, username, address, city, province, phone_number, role], (err, resultt) => {
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

//request change password user
userRouter.put("/userspassword/:id", (req, res) => {
    console.log(req.params.id)
    let oldPassword = req.body.password;
    let newPassword = req.body.newPassword;
    let sql = `SELECT * FROM users WHERE id = '${req.params.id}'`;
    let query = db.query(sql, (err, result) => {
        bcrypt.compare(oldPassword, result[0].password, (err, checkPass) => {
            if (checkPass) {
                bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                    let sql = `UPDATE users SET password = '${hash}' where id = ${req.params.id} ;`;
                    let query = db.query(sql, (err, result) => {
                        if (err) throw err;
                        res.send("passwordChanged");
                    });
                })
            }
            else {
                res.send("wrongPassword");
            }
        })
    })
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

// https://www.npmjs.com/package/rajaongkir-nodejs
// sebenarnya bisa pakai yg diatas, tp keburu tahu di pertengahan

userRouter.get("/province", (req, response) => {
    // utk ambil data provinsi dari api rajaongkir
    var options = {
        "method": "GET",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": "/starter/province",
        "headers": {
            "key": "865b1a0586feba49b34b9e4202ee6a12"
        }
    };

    var req = http.request(options, function (res) {
        var provinceData = [];

        res.on("data", function (data) {
            provinceData.push(data);
        });

        res.on("end", function () {
            var body = Buffer.concat(provinceData);
            console.log(body.toString());
            var dataProvinsi = JSON.parse(body)
            response.send(dataProvinsi.rajaongkir.results);
        });
    });
    req.end();
})

userRouter.get("/city/:province_id", (req, response) => {
    // utk ambil data kota dari api rajaongkir
    var options = {
        "method": "GET",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": `/starter/city?province=${req.params.province_id}`,
        "headers": {
            "key": "865b1a0586feba49b34b9e4202ee6a12"
        }
    };

    var req = http.request(options, function (res) {
        var cityData = [];

        res.on("data", function (data) {
            cityData.push(data);
        });

        res.on("end", function () {
            var body = Buffer.concat(cityData);
            var dataKota = JSON.parse(body)
            response.send(dataKota.rajaongkir.results);
        });
    });
    req.end();
})


module.exports = userRouter;
