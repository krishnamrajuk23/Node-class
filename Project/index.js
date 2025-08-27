const products  = require('./controllers/products.js');

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();  // Process.env

// CURD - get, post, put, delete
const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    res.send("express started");
})

app.use("/api", products);

const PROT = process.env.PROT;

app.listen(PROT, () => console.log(`Server is started ${PROT}`))