//supaya connected dengan server utama
const productRouter = require('express').Router();
const http = require("https");
var qs = require("querystring");

//untuk connect ke db
const db = require("../connection/connection");

//middleware
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const cors = require("cors");
const fileupload = require("express-fileupload");
const mkdirp = require('mkdirp');

// nodemailer
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');


//pakai middleware
productRouter.use(bodyParser.urlencoded({ extended: true }));
productRouter.use(bodyParser.json());
productRouter.use(cors());
productRouter.use(fileupload());

//UPDATE CART
productRouter.put("/cart/:id", (req, res) => {
    console.log(req.body)
    var quantity = req.body.quantity;
    if (req.body.status) {
        let sql = `UPDATE carts SET status = '${req.body.status}' where id = ${req.params.id} `;
        let query = db.query(sql, (err) => {
            if (err) {
                throw err;
            }
            else {
                res.send({ "status": "update status success" });
                console.log("Successfully update status!");
            }
        })
    }

    else {
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
    }



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
    let sql = `SELECT c.id as id_cart, u.id, u.name, p.name, p.price, p.size, p.location, p.stock, p.photo, c.id_product, c.quantity, c.status, c.totalPrice FROM carts c JOIN users u ON c.id_user = u.id JOIN products p ON c.id_product = p.id WHERE c.id_user = ${req.params.id_user}`;
    let query = db.query(sql, (err, result) => {
        res.send(result);
    })
});

//DELETE CART USER
productRouter.delete("/cart/:id", (req, res) => {
    let cartID = req.params.id;
    let sql = `DELETE FROM carts WHERE id = ${cartID}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {


            // kasi respon ke user
            res.send({ "status": "Cart deleted" });
        }
    })
})

productRouter.get("/products", (req, res) => {
    let sql = "SELECT p.id, p.name, p.id_category, p.price, p.stock, p.description, p.size, p.location, p.photo, p.photo2, p.photo3, c.category_name FROM products p, categories c WHERE p.id_category = c.id;";
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.send(result);
        }
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

productRouter.get("/province/:province_id", (req, response) => {
    // utk ambil data provinsi dari api rajaongkir
    var options = {
        "method": "GET",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": `/starter/province?id=${req.params.province_id}`,
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
            var dataProvinsi = JSON.parse(body)
            response.send(dataProvinsi.rajaongkir.results);
        });
    });
    req.end();
})

productRouter.get("/city/name/:city_id", (req, response) => {
    // utk ambil data kota dari api rajaongkir
    var options = {
        "method": "GET",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": `/starter/city?id=${req.params.city_id}`,
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

// API untuk dapat harga ongkos kirim
productRouter.get("/shipping/:destination_id", (req, response) => {
    var destination_id = req.params.destination_id;
    var hasil = "";
    var options = {
        "method": "POST",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": "/starter/cost",
        "headers": {
            "key": "865b1a0586feba49b34b9e4202ee6a12",
            "content-type": "application/x-www-form-urlencoded"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            hasil = JSON.parse(body.toString());
            var cost = {
                price: hasil.rajaongkir.results[0].costs[0].cost[0].value
            }
            response.send(cost)
        });
    });

    req.end(qs.stringify({
        origin: '152', //ini kode city jakarta, karena semua item dikirim dari jakarta
        destination: destination_id, //ini kode city si user pilih
        weight: 1000,
        courier: 'jne'
    }));

})

productRouter.get("/orders", (req, res) => {
    // untuk ambil data order yang sudah dibayar
    let sql = ` SELECT o.id AS order_id, o.id_user AS id_user, o.status as status, o.created_at as order_date, o.cust_name AS cust_name, o.cust_phone AS cust_phone, o.cust_address AS cust_address, p.name AS product_name, p.size AS product_size, t.quantity AS quantity from orders o INNER JOIN transactions t ON o.id = t.order_id INNER JOIN products p ON t.id_product = p.id WHERE o.status = 'Paid' OR o.status = 'Processed' GROUP BY o.id`;
    let query = db.query(sql, (err, result) => {
        console.log(result);
        res.send(result);
    });
})

productRouter.post("/orders", (req, res) => {
    console.log(req.body)
    let sql = `INSERT INTO orders SET ?`;
    let query = db.query(sql, req.body, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            let sql = `SELECT * FROM orders where id = '${req.body.id}'`;
            let query = db.query(sql, (err, resultGet) => {
                res.send({ "order_id": resultGet[0].id });
            })
        }
    })
})

productRouter.post("/transactions", (req, res) => {
    var email_user = "";
    console.log(req.body);
    let sql = `INSERT INTO transactions SET ?`;
    let query = db.query(sql, req.body, (err, result) => {
        let sql = `SELECT name, email FROM users where id = ${req.body.id_user}`;
        let query = db.query(sql, (err, response) => {
            email_user = response[0].email;
            nama_user = response[0].name;

            // fungsi email setelah semua proses checkout berjalan
            var sender = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'vanandco279@gmail.com',
                    type: 'OAuth2',
                    clientId: '890127507981-ecd3fi6g37rp8j6r51uoqosqmj6ffqrp.apps.googleusercontent.com',
                    clientSecret: 'E4QkZR6QdcGEg8ClFvHHbLbp',
                    refreshToken: '1/8r_shqeTRWHhX_MPclHF5gSUYH9UdLYM6qv1J9mJEEs'
                }
            })



            var html = `
            <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h1>Van & Co</h1>
                </div>
                <div className="col-lg-4">
                    <p className="text-muted">ORDER # ${req.body.order_id}</p>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <h3>Hai ${nama_user}, terima kasih atas pemesanan anda.</h3>
                        <p>Segera lakukan pembayaran sesuai total biaya Anda, ke rekening kami di bawah ini:</p>
                        <p style="font-style: italic">BCA: 527-135-8564 a/n Ivan Yufen Stefanus</p>
    
                        <p>Jika sudah, konfirmasi pembayaran dengan klik tombol di bawah agar barang Anda bisa langsung kami proses.</p>
            </div>

            <a style="background-color: #4CAF50;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;" href = 'http://localhost:3000/confirmPayment';">Konfirmasi Pembayaran</a> or <a style="text-decoration:none;" href="http://localhost:3000/my-orders">Lihat Order</a>

                    </div>
                </div>


            </div>
            `

            var myEmail = {
                from: 'Van & Co <vanandco279@gmail.com>',
                to: `${email_user}`,
                subject: `Van & Co - Invoice Number ${req.body.order_id} `,
                // html: '<h2>INVOICE OF PT Van and Co</h2>',
                html: html,
                attachments: { //kalau lebih dr satu, masukin array
                    filename: "vanandco.jpg",
                    path: "http://localhost:3007/files/logo/logo.png"
                }
            }

            sender.sendMail(myEmail, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Email terkirim');
                }
            })
        })



        res.send({ "status": "moved" })
    });
})



module.exports = productRouter;
