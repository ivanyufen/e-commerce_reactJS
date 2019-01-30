//supaya connected dengan server utama
const productRouter = require('express').Router();

//untuk connect ke db
const db = require("../connection/connection");

//middleware
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const cors = require("cors");
const fileupload = require("express-fileupload");
const mkdirp = require('mkdirp');


//pakai middleware
productRouter.use(bodyParser.urlencoded({ extended: true }));
productRouter.use(bodyParser.json());
productRouter.use(cors());
productRouter.use(fileupload());

productRouter.get("/products", (req, res) => {
    let sql = "SELECT * FROM products;";
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        // res.send("All users data successfully fetched!");
        res.send(result);
    });
});

productRouter.get("/products/:id", (req, res) => {
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
productRouter.post("/session", (req, res) => {
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
productRouter.delete('/session/:id_user', (req, res) => {
    let id_user = req.params.id_user;
    let sql = `DELETE FROM sessions WHERE id_user = ${id_user}`;
    let query = db.query(sql, (err, result) => {
        console.log(`User with id ${id_user} just logged out!`);
    });
});


// request login dr user
productRouter.post("/login", (req, res) => {
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
productRouter.post("/products", (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let price = req.body.price;
    let id_category = req.body.category;
    let stock = req.body.stock;
    let description = req.body.description;
    let size = req.body.size;
    let location = req.body.location;


    let data = req.body;
    console.log(data);
    let sql = `SELECT * FROM products WHERE name = '${name}'`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else if (result.length > 0) {
            res.send({ "status": "dataExist" });
        }
        else {
            let query = db.query(`INSERT INTO products (name, price, id_category, stock, description, size, location ) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, price, id_category, stock, description, size, location], (err, resultt) => {
                if (err) {
                    throw err;
                }
                else {
                    let id_product = {
                        id_product: resultt.insertId
                    }
                    console.log("Product inserted successfully");

                    res.send(id_product);
                }
            });
        }
    });
});


//request edit data user
productRouter.put("/users/:id", (req, res) => {
    console.log("wow ada yg mau edit")
    let data = req.body;
    let sql = `UPDATE users SET ? where id = ${req.params.id} ;`;
    let query = db.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(`User with id: ${req.params.id} successfully updated!`);
    });
});


//request delete data user
productRouter.delete("/users/:id", (req, res) => {
    console.log(req.params.id)
    let id = req.params.id;
    console.log(id)
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



module.exports = productRouter;
