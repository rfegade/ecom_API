"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = void 0;
var mongoose = require("mongoose");
var mongoConnect = /** @class */ (function () {
    function mongoConnect() {
    }
    mongoConnect.connect = function () {
        var mongoDBConn = process.env.MONGODB_URL || '';
        return mongoose.connect(mongoDBConn, { useNewUrlParser: true });
    };
    return mongoConnect;
}());
exports.mongoConnect = mongoConnect;
