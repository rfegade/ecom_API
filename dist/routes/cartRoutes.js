"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
var cartController_1 = require("../controllers/cartController");
var express = require("express");
var auth_1 = require("../middleware/auth");
exports.cartRoute = express.Router();
exports.cartRoute.get('/', auth_1.validateUser, cartController_1.CartController.getUserCart);
exports.cartRoute.post('/', auth_1.validateUser, cartController_1.CartController.saveToCart);
