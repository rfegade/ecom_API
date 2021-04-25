"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer = require("multer"); // to upload the files at physical location
// File Upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/product');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.upload = multer({ storage: storage });
