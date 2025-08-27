const express = require("express");
const app= express();

app.get('/products', (req, res) => {
    res.send('List of products');
})

app.post('/products', (req, res) => {
    console.log("Request body", req.body);
    res.send('Create a new product');
});

module.exports = app;