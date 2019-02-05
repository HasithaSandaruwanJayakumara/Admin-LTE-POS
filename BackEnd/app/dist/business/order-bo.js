"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("promise");
var db_pool_1 = require("../db/db-pool");
var dao_factory_1 = require("../dao/dao-factory");
var order_1 = require("../entity/order");
var orderdetails_1 = require("../entity/orderdetails");
var OrderBO = /** @class */ (function () {
    function OrderBO() {
    }
    OrderBO.prototype.findAllOrders = function () {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var orderDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ORDER, connection);
                    var promise = orderDAO.findAll();
                    promise.then(function (orders) {
                        resolve(orders);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    OrderBO.prototype.findOrder = function (id) {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var orderDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ORDER, connection);
                    var promise = orderDAO.find(id);
                    promise.then(function (order) {
                        resolve(order);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    OrderBO.prototype.saveOrder = function (order1) {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var orderDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ORDER, connection);
                    var orderdetailDAO_1 = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ORDERDETAIL, connection);
                    var promise = orderDAO.save(new order_1.Order(order1.id, order1.date, order1.customerId));
                    promise.then(function (result) {
                        for (var _i = 0, _a = order1.orderDetails; _i < _a.length; _i++) {
                            var orderDetail = _a[_i];
                            var promise_1 = orderdetailDAO_1.save(new orderdetails_1.OrderDetail(orderDetail.orderId, orderDetail.itemCode, orderDetail.qty, orderDetail.unitPrice));
                            promise_1.then(function (result) {
                                resolve(result);
                                db_pool_1.pool.releaseConnection(connection);
                            }).catch(function (error) {
                                reject(error);
                                db_pool_1.pool.releaseConnection(connection);
                            });
                        }
                        // resolve(result);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    OrderBO.prototype.countOrder = function () {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connect) {
                if (err) {
                    reject(err);
                }
                else {
                    var orderDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ORDER, connect);
                    var promise = orderDAO.count();
                    promise.then(function (count) {
                        resolve(count);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
            });
        });
    };
    return OrderBO;
}());
exports.OrderBO = OrderBO;
