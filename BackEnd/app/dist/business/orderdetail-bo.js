"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_pool_1 = require("../db/db-pool");
var dao_factory_1 = require("../dao/dao-factory");
var Promise = require("promise");
var OrderDetailBO = /** @class */ (function () {
    function OrderDetailBO() {
    }
    OrderDetailBO.prototype.findAllOrderDetails = function () {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var orderdetailDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ORDERDETAIL, connection);
                    var promise = orderdetailDAO.findAll();
                    promise.then(function (orderdetail) {
                        resolve(orderdetail);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    OrderDetailBO.prototype.findOrderDetail = function (id) {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var orderdetailDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ORDERDETAIL, connection);
                    var promise = orderdetailDAO.find(id);
                    promise.then(function (orderdetail) {
                        resolve(orderdetail);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    return OrderDetailBO;
}());
exports.OrderDetailBO = OrderDetailBO;
