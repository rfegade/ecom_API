"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
var Product_1 = require("../models/Product");
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.getProducts = function (req, res, next) {
        Product_1.Product.find({}, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Product is found', data: result });
            }
        });
    };
    ProductController.getProductsById = function (req, res, next) {
        var productId = req.params.id;
        Product_1.Product.findById(productId, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Product is found', data: result });
            }
        });
    };
    ProductController.addProduct = function (req, res, next) {
        // get the image url before add a product
        req.body.imageUrl = process.env.IMAGE_BASE_PATH + req.file.originalname;
        var product = new Product_1.Product(req.body);
        Product_1.Product.insertMany(product).then(function (result) {
            res.json({ status: 'success', message: 'Product is added', data: result });
        }).catch(function (err) {
            res.status(500).json({ status: 'failed', message: err });
        });
    };
    ProductController.getProductByCategory = function (req, res, next) {
        var category = req.body.category;
        var productCount = 0;
        Product_1.Product.find().estimatedDocumentCount().exec(function (err, result) {
            productCount = result;
            Product_1.Product.find({ categoryName: category }, function (err, result) {
                if (err) {
                    res.status(500).json({ status: 'failed', message: err });
                }
                else {
                    res.json({ status: 'success', message: 'Products Found!', data: result, count: productCount });
                }
            });
        });
    };
    ProductController.updateProduct = function (req, res, next) {
        Product_1.Product.findByIdAndUpdate(req.body._id, {
            $set: {
                productName: req.body.productName,
                description: req.body.description,
                price: req.body.price,
                outOfStock: req.body.outOfStock
            }
        }, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Product Updated!', data: result });
            }
        });
    };
    ProductController.searchProduct = function (req, res, next) {
        var productName = req.body.productName;
        var productCount = 0;
        Product_1.Product.find().estimatedDocumentCount().exec(function (err, result) {
            productCount = result;
            Product_1.Product.find({ productName: { $regex: productName, $options: 'i' } }, function (err, result) {
                if (err) {
                    res.status(500).json({ status: 'failed', message: err });
                }
                else {
                    res.json({ status: 'success', message: 'Product List Found!', data: result, count: productCount });
                }
            });
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
