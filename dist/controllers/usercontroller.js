"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
var User_1 = require("../models/User");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var userController = /** @class */ (function () {
    function userController() {
    }
    userController.login = function (req, res, next) {
        var private_key = process.env.PRIVATEKEY || '';
        // find recond from database
        User_1.User.findOne({ email: req.body.email }, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                // check if result has null values
                if (result != undefined) {
                    // create a auth token 
                    var token = jsonwebtoken_1.sign({ id: result._id }, private_key, { expiresIn: '1h' });
                    // compare password with the function provided by bcrypt
                    if (bcryptjs_1.compareSync(req.body.password, result.password)) {
                        res.json({ status: 'Success', message: 'Login is successful', data: token });
                    }
                    else {
                        res.status(500).json({ status: 'failed', message: 'UserName or Password is incorrect!' });
                    }
                }
                else {
                    res.status(500).json({ status: 'failed', message: 'UserName or Password is incorrect!' });
                }
            }
        });
    };
    userController.registration = function (req, res, next) {
        var user = new User_1.User(req.body);
        User_1.User.create(user, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Registration Successful!', data: result });
            }
        });
    };
    userController.updateProfile = function (req, res, next) {
        var userId = req.body.userId;
        User_1.User.findByIdAndUpdate(userId, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                addressInfo: req.body.addressInfo
            }
        }, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Profile is updated!', data: null });
            }
        });
    };
    userController.getProfile = function (req, res, next) {
        var userId = req.body.userId;
        User_1.User.findById(userId, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Profile is retrived!', data: result });
            }
        });
    };
    return userController;
}());
exports.userController = userController;
