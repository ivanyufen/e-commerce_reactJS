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

//UPDATE CART
productRouter.put("/cart/:id", (req, res) => {
    console.log(req.body);
    var quantity = req.body.quantity;

    // query untuk dapetin price productnya
    let sql = `SELECT p.price FROM carts c JOIN products p ON c.id_product = p.id WHERE c.id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        console.log(result);
        var price = result[0].price;
        var totalPrice = quantity * price;

        // setelah dapet dan dihitung total price nya, di update ke database

        let sql = `UPDATE carts SET quantity = ${quantity}, totalPrice = ${totalPrice} where id = ${req.params.id} `;
        let query = db.query(sql, (err) => {
            if (err) {
                throw err;
            }
            else {
                res.send({ "status": "update quantity success" });
                console.log("Successfully update quantity!");
            }
        })

    })



})

// INPUT CART
productRouter.post("/cart", (req, res) => {
    console.log(req.body);
    console.log("WAHAHHAHA");
    var id_user = req.body.id_user;
    var id_product = req.body.id_product;
    var quantityBody = req.body.quantity;

    // DI CEK DULU KE PRODUCTS BUAT DIAMBIL HARGANYA
    let sql = `SELECT * FROM products where id = ${id_product}`;
    let query = db.query(sql, (err, result) => {
        // DI CEK UDAH ADA BELOM DI TABLE CARTS, KALO UDAH, QUANTITY NYA AJA YG DITAMBAH
        let sql = `SELECT * FROM carts where id_product = ${id_product} and id_user = ${id_user}`;
        let query = db.query(sql, (err, result2) => {
            if (result2.length > 0) {
                let price = result[0].price;
                let quantity = result2[0].quantity + quantityBody;
                let totalPrice = quantity * price;
                let id_cart = result2[0].id;

                let data = {
                    id_user: id_user,
                    id_product: id_product,
                    quantity: quantity,
                    totalPrice: totalPrice
                }

                let sql = `UPDATE carts SET ? WHERE id = ${id_cart}`;
                let query = db.query(sql, data, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(result);
                        res.send('Added to cart!');
                    }
                })
            }
            // KALAU DATA BELUM ADA DI CARTS, YAUDAH DITAMBAH AJA
            else {
                let price = result[0].price;
                let totalPrice = quantityBody * price;
                let sql = `INSERT INTO carts (id_user, id_product, quantity, totalPrice) VALUES (?, ?, ?, ?)`;
                let query = db.query(sql, [id_user, id_product, quantityBody, totalPrice], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(result);
                        res.send('Added to cart!');
                    }
                });
            }
        })
    })

})


// GET CART OF USER
productRouter.get("/cart/:id_user", (req, res) => {
    console.log(req.params.id_user);
    let sql = `SELECT c.id as id_cart, u.id, u.name, p.name, p.price, p.size, p.location, p.photo, c.quantity, c.totalPrice FROM carts c JOIN users u ON c.id_user = u.id JOIN products p ON c.id_product = p.id WHERE c.id_user = ${req.params.id_user}`;
    let query = db.query(sql, (err, result) => {
        res.send(result);
    })
});

//DELETE CART USER
productRouter.delete("/cart/:id", (req, res) => {
    console.log("WADIDAW")
    let cartID = req.params.id;
    let sql = `DELETE FROM carts WHERE id = ${cartID}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send({ "status": "Cart deleted" });
        }
    })
})

productRouter.get("/products", (req, res) => {
    let sql = "SELECT p.id, p.name, p.id_category, p.price, p.stock, p.description, p.size, p.location, p.photo, p.photo2, p.photo3, c.category_name FROM products p, categories c WHERE p.id_category = c.id;";
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        // console.log("All data successfuly fetched");
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
