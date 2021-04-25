"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./routes/index");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var db_1 = require("./db/db");
// load environment file
dotenv.config();
// load express App
var app = express();
// load bodyparsor to parse json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Routes
app.use('/user', index_1.userRoute);
app.use('/category', index_1.categoryRoute);
app.use('/product', index_1.productRoute);
// Port
app.listen(3000, function () {
    db_1.mongoConnect.connect().then(function (res) { return console.log('Database is connected'); });
    console.log('Server running on port 3000');
});
