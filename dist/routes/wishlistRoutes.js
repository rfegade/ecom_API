"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRoute = void 0;
var wishlistController_1 = require("../controllers/wishlistController");
var express = require("express");
exports.wishlistRoute = express.Router();
exports.wishlistRoute.get('/', wishlistController_1.WishListController.getWishList);
exports.wishlistRoute.post('/', wishlistController_1.WishListController.saveWishList);