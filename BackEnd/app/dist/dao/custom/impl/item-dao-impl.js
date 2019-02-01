"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("promise");
var ItemDAOImpl = /** @class */ (function () {
    function ItemDAOImpl(connection) {
        this.connection = connection;
    }
    ItemDAOImpl.prototype.delete = function (code) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("DELETE FROM Item WHERE code='" + code + "'", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    };
    //
    ItemDAOImpl.prototype.find = function (code) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("SELECT * FROM Item WHERE code='" + code + "'", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    ItemDAOImpl.prototype.findAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("SELECT * FROM Item", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    ItemDAOImpl.prototype.save = function (entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("INSERT INTO Item VALUES ('" + entity.code + "','" + entity.description + "','" + entity.unitPrice + "','" + entity.qtyOnHand + "')", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    };
    ItemDAOImpl.prototype.update = function (entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("UPDATE Item SET name = '" + entity.description + "','" + entity.unitPrice + "','" + entity.qtyOnHand + "' WHERE code='" + entity.code + "'");
            _this.connection.query("UPDATE Item SET description = '" + entity.description + "',unitPrice='" + entity.unitPrice + "',qtyOnHand='" + entity.qtyOnHand + "' WHERE code='" + entity.code + "'", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    };
    ItemDAOImpl.prototype.count = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("SELECT COUNT(*) as count FROM Item", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results[0].count);
                }
            });
        });
    };
    return ItemDAOImpl;
}());
exports.ItemDAOImpl = ItemDAOImpl;
