"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
var cartController_1 = require("../controllers/cartController");
var express = require("express");
exports.cartRoute = express.Router();
exports.cartRoute.get('/', cartController_1.CartController.getCart);
exports.cartRoute.post('/', cartController_1.CartController.saveCart);
