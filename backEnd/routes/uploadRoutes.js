// route ini dibuat supaya upload foto antara users dan products tidak bentrok

const uploadRouter = require('express').Router();


const db = require("../connection/connection");

//middleware
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const cors = require("cors");
const fileupload = require("express-fileupload");
const mkdirp = require('mkdirp');


//pakai middleware
uploadRouter.use(bodyParser.urlencoded({ extended: true }));
uploadRouter.use(bodyParser.json());
uploadRouter.use(cors());
uploadRouter.use(fileupload());

uploadRouter.post('/uploadProduct', (req, res) => {
    if (req.files) {
        var productid = req.body.productid;
        var fileData = req.files.file;
        var fileDataName = fileData.name;

        //masukin url path gambarnya ke row user
        var filePath = `http://localhost:3007/files/products/${productid}/${fileDataName}`;
        let query = db.query(`UPDATE products SET photo = ? WHERE ID = ${productid}`, filePath, (err, result) => {
            if (err) {
                console.log("error");
            }
            else {
                res.send(filePath);
            }
        });

        //masukin foto nya ke storage backend
        //kalau udh ada foldernya (berarti mau update)
        fs.pathExists(`./files/products/${productid}/`, (err, exists) => {
            if (exists) {
                // hapus isi dari direktori nya
                fs.emptyDirSync(`./files/products/${productid}`);
                // dimasukin file yg baru
                fileData.mv(`./files/products/${productid}/` + fileDataName, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        // res.send(fileDataName);
                        console.log("Photo successfully stored in storage!")
                    }
                });
            }
            // kalau belum ada direktori nya (berarti baru register), buat folder baru, trus dimasukin file yg baru
            else {
                fs.mkdirSync(`./files/products/${productid}`);
                fileData.mv(`./files/products/${productid}/` + fileDataName, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        // res.send(fileDataName);
                        console.log("Photo successfully stored in storage!")
                    }
                });
            }
        })

    }
});

uploadRouter.post('/upload', (req, res) => {
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


module.exports = uploadRouter;