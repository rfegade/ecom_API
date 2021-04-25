"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
var productController_1 = require("../controllers/productController");
var express = require("express");
var multer_1 = require("../config/multer");
exports.productRoute = express.Router();
exports.productRoute.get('/', productController_1.ProductController.getProducts);
exports.productRoute.get('/:id', productController_1.ProductController.getProductsById);
exports.productRoute.post('/', multer_1.upload.single('file'), productController_1.ProductController.addProduct);
exports.productRoute.post('/getProductByCategory', productController_1.ProductController.getProductByCategory);
exports.productRoute.put('/', productController_1.ProductController.updateProduct);
