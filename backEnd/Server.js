const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const fileupload = require("express-fileupload");
const app = express();

//untuk memakai connection mysql
const db = require("./connection/Connection");

//middleware yg dipakai
app.use(uploadRouter);
app.use(productRouter);
app.use(userRouter);
app.use(cors());
app.use(fileupload());

//untuk route utama
app.get("/", (req, res) => {
    res.send({ "status": "server active" });
});

//ambil gambar dr storage
app.use('/files', express.static('files'));

//kalau route nya gaada
app.use((req, res) => {
    res.status(404).send({ "status": "404 not found" });
});

app.listen(3007, () => {
    console.log(`Server is running in port 3007..`)
});