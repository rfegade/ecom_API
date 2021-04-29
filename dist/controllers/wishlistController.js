"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListController = void 0;
var WishList_1 = require("../models/WishList");
var WishListController = /** @class */ (function () {
    function WishListController() {
    }
    WishListController.getWishList = function (req, res, next) {
        WishList_1.WishList.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'userWishList'
                }
            }
        ], function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'User WishList!', data: result });
            }
        });
    };
    WishListController.saveWishList = function (req, res, next) {
        var wishlist = new WishList_1.WishList(req.body);
        WishList_1.WishList.insertMany(wishlist).then(function (result) {
            res.json({ status: 'success', message: 'Product is added to wishlist!', data: {} });
        }).catch(function (err) {
            res.status(500).json({ status: 'failed', message: err });
        });
    };
    return WishListController;
}());
exports.WishListController = WishListController;
