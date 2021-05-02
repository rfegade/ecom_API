"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./routes/index");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var db_1 = require("./db/db");
var helmet = require("helmet");
var compression = require("compression");
// const helmet: Helmet
// load environment file
dotenv.config();
// load express App
var app = express();
app.use(helmet());
app.use(compression());
// Allow CORS 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
    next();
});
// load bodyparsor to parse json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Routes
app.use('/user', index_1.userRoute);
app.use('/category', index_1.categoryRoute);
app.use('/product', index_1.productRoute);
app.use('/errorLog', index_1.errorLogRoute);
app.use('/wishlist', index_1.wishlistRoute);
app.use('/cart', index_1.cartRoute);
// Port
app.listen(process.env.PORT || 3000, function () {
    db_1.mongoConnect.connect().then(function (res) { return console.log('Database is connected'); });
    console.log('Server is running');
});
