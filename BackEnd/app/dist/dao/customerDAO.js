"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var Promise = require("promise");
var CustomerDAO = /** @class */ (function () {
    function CustomerDAO() {
    }
    CustomerDAO.prototype.findAllCustomer = function () {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            database: "thogakade",
            user: "root",
            password: "The@best"
        });
        return new Promise(function (resolve, reject) {
            connection.query("SELECT * FROM Customer", function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    return CustomerDAO;
}());
exports.CustomerDAO = CustomerDAO;
