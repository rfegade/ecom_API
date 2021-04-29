"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
var Cart_1 = require("../models/Cart");
var CartController = /** @class */ (function () {
    function CartController() {
    }
    CartController.getCart = function (req, res, next) {
        Cart_1.Cart.aggregate([
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
    CartController.saveCart = function (req, res, next) {
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
