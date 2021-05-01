"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
var mongoose_1 = require("mongoose");
var Cart_1 = require("../models/Cart");
var CartController = /** @class */ (function () {
    function CartController() {
    }
    CartController.getUserCart = function (req, res, next) {
        Cart_1.Cart.aggregate([
            {
                $match: { userId: new mongoose_1.Types.ObjectId(req.body.userId), status: 'A' }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'userCart'
                }
            }
        ], function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'User Cart!', data: result });
            }
        });
    };
    CartController.saveToCart = function (req, res, next) {
        var cart = new Cart_1.Cart(req.body);
        Cart_1.Cart.insertMany(cart).then(function (result) {
            res.json({ status: 'success', message: 'Product is added to cart!', data: {} });
        }).catch(function (err) {
            res.status(500).json({ status: 'failed', message: err });
        });
    };
    return CartController;
}());
exports.CartController = CartController;
