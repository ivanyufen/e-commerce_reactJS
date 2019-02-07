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
    console.log("jalan!")
    var productid = req.body.productid;
    console.log(req.files)
    var fileData2 = "";
    var fileData3 = "";
    var filePath2 = "";
    var filePath3 = "";

    let query = db.query(`SELECT photo, photo2, photo3 FROM products where ID = ${productid}`, (err, hasil) => {
        console.log(hasil);

        if (req.files) {
            //masukin url path gambarnya ke row user

            if (req.files.file) {
                var fileData = req.files.file;
                var fileDataName = fileData.name;
                var filePath = `http://localhost:3007/files/products/${productid}/photo1/${fileDataName}`;
            }
            else {
                var filePath = hasil[0].photo;
            }


            if (req.files.file2) {
                var fileData2 = req.files.file2;
                var fileDataName2 = fileData2.name;
                var filePath2 = `http://localhost:3007/files/products/${productid}/photo2/${fileDataName2}`;
            }
            else {
                var filePath2 = hasil[0].photo2;
            }
            if (req.files.file3) {
                var fileData3 = req.files.file3;
                var fileDataName3 = fileData3.name;
                var filePath3 = `http://localhost:3007/files/products/${productid}/photo3/${fileDataName3}`;
            }
            else {
                var filePath3 = hasil[0].photo3;
            }

            let query = db.query(`UPDATE products SET photo = '${filePath}', photo2 = '${filePath2}', photo3 = '${filePath3}' WHERE ID = ${productid}`, (err, result) => {
                if (err) {
                    console.log("error");
                }
                else {
                    res.send(filePath);
                }
            });

            //masukin foto nya ke storage backend
            //kalau udh ada foldernya (berarti mau update)
            fs.pathExists(`./files/products/${productid}`, (err, exists) => {
                if (exists) {
                    // hapus isi dari direktori nya dulu
                    // fs.emptyDirSync(`./files/products/${productid}/photo1`);
                    // // dimasukin file yg baru
                    // fileData.mv(`./files/products/${productid}/photo1/` + fileDataName, (err) => {
                    //     if (err) {
                    //         throw err;
                    //     } else {
                    //         // res.send(fileDataName);
                    //         console.log("Photo successfully stored in storage!")
                    //     }
                    // });

                    if (fileDataName) {
                        fs.emptyDirSync(`./files/products/${productid}/photo1`);
                        // dimasukin file yg baru
                        fileData.mv(`./files/products/${productid}/photo1/` + fileDataName, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                // res.send(fileDataName);
                                console.log("Photo successfully stored in storage!")
                            }
                        });
                    }
                    if (fileDataName2) {
                        fs.emptyDirSync(`./files/products/${productid}/photo2`);
                        console.log("adaaa");
                        fileData2.mv(`./files/products/${productid}/photo2/` + fileDataName2, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log("Photo 2 successfully stored in storage!")
                            }
                        });
                    }
                    if (fileDataName3) {
                        fs.emptyDirSync(`./files/products/${productid}/photo3`);
                        fileData3.mv(`./files/products/${productid}/photo3/` + fileDataName3, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log("Photo 3 successfully stored in storage!")
                            }
                        });
                    }
                }
                // kalau belum ada direktori nya (berarti baru register), buat folder baru, trus dimasukin file yg baru
                else {
                    console.log("gaada")
                    fs.mkdirSync(`./files/products/${productid}`);
                    fs.mkdirSync(`./files/products/${productid}/photo1`);
                    fs.mkdirSync(`./files/products/${productid}/photo2`);
                    fs.mkdirSync(`./files/products/${productid}/photo3`);

                    fileData.mv(`./files/products/${productid}/photo1/` + fileDataName, (err) => {
                        if (err) {
                            throw err;
                        } else {
                            console.log("Photo successfully stored in storage!")
                        }
                    });
                    if (fileDataName2) {
                        fileData2.mv(`./files/products/${productid}/photo2/` + fileDataName2, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log("Photo 2 successfully stored in storage!")
                            }
                        });
                    }
                    if (fileDataName3) {
                        fileData3.mv(`./files/products/${productid}/photo3/` + fileDataName3, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log("Photo 3 successfully stored in storage!")
                            }
                        });
                    }
                }
            })

        }

    });


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