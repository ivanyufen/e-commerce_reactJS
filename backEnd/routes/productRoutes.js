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
    if (req.query.max) {
        let sql = `SELECT p.id, p.name, p.id_category, p.price, p.stock, p.description, p.size, p.location, p.photo, c.category_name FROM products p, categories c WHERE p.id_category = c.id limit ${req.query.max};`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.log("All data successfuly fetched")
            res.send(result);
        });
    }
    else if (req.query.size) {
        console.log("ada query size!")
        let sql = `SELECT p.id, p.name, p.id_category, p.price, p.stock, p.description, p.size, p.location, p.photo, c.category_name FROM products p, categories c WHERE p.id_category = c.id and p.size = ${req.query.size};`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.log("All data successfuly fetched")
            res.send(result);
        });
    }

    else if (req.query.type) {
        console.log("ada query size!")
        let sql = `SELECT p.id, p.name, p.id_category, p.price, p.stock, p.description, p.size, p.location, p.photo, c.category_name FROM products p, categories c WHERE p.id_category = c.id and p.name LIKE "${req.query.type}%";`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.log("All data successfuly fetched")
            res.send(result);
        });
    }
    else {
        let sql = "SELECT p.id, p.name, p.id_category, p.price, p.stock, p.description, p.size, p.location, p.photo, c.category_name FROM products p, categories c WHERE p.id_category = c.id;";
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.log("All data successfuly fetched")
            res.send(result);
            // console.log(result)
        });
    }
});

productRouter.get("/products/:id", (req, res) => {
    let id_product = req.params.id; //kenapa ini id bukan id_user karena parameter yg ditrima itu :id walau yg dikirim dr front end id_user
    let sql = `SELECT * FROM users WHERE id = ${id_product} ;`;
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



//request add product
productRouter.post("/products", (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let price = req.body.price;
    let id_category = req.body.id_category;
    let stock = req.body.stock;
    let description = req.body.description;
    let size = req.body.size;
    let location = req.body.location;


    let data = req.body;
    console.log(data);
    let sql = `SELECT * FROM products WHERE name = '${name}' && size = '${size}'`;
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


//request edit data product
productRouter.put("/products/:id", (req, res) => {
    let data = req.body;
    let sql = `UPDATE products SET ? where id = ${req.params.id} ;`;
    let query = db.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(`Product with id: ${req.params.id} successfully updated!`);
    });
});


//request delete data product
productRouter.delete("/products/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM products where id = ${id} ;`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(`Product with id: ${id} successfully deleted!`);

        // remove files user and the directory
        var deleteFolderRecursive = function (path) {
            if (fs.existsSync(`./files/products/${id}`)) {
                fs.readdirSync(`./files/products/${id}`).forEach(function (file, index) {
                    var curPath = `./files/products/${id}` + "/" + file;
                    if (fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(`./files/products/${id}`);
            }
        };
        deleteFolderRecursive();

    });
});



module.exports = productRouter;
