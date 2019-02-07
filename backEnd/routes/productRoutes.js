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
    let sql = "SELECT p.id, p.name, p.id_category, p.price, p.stock, p.description, p.size, p.location, p.photo, p.photo2, p.photo3, c.category_name FROM products p, categories c WHERE p.id_category = c.id;";
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("All data successfuly fetched")
        res.send(result);
        // console.log(result)
    });
});

productRouter.get("/products/:productID", (req, res) => {
    let productID = req.params.productID.replace(/\D/g, ""); //untuk extract angka id dari product nya, pakai regular expression
    let sql = `SELECT * FROM products WHERE id = '${productID}' ;`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
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
    // hapus semua isi didalam folder imagenya
    fs.emptyDirSync(`./files/products/${id}`);
    let sql = `DELETE FROM products where id = ${id} ;`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send({ "status": "Product Deleted" });

            //hapus folder imagenya
            fs.rmdirSync(`./files/products/${id}`);
        }
    });

});



module.exports = productRouter;
