"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var orderdetail_bo_1 = require("../business/orderdetail-bo");
var orderDetailDispatcher = express.Router();
orderDetailDispatcher.route("")
    .get(function (req, res) {
    var promise = new orderdetail_bo_1.OrderDetailBO().findAllOrderDetails();
    promise.then(function (orderdetails) {
        res.status(200).json(orderdetails);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});
orderDetailDispatcher.route("/:id")
    .get(function (req, res) {
    var promise = new orderdetail_bo_1.OrderDetailBO().findOrderDetail(req.params.id);
    promise.then(function (orderdetail) {
        if (orderdetail.length > 0) {
            res.status(200).send(orderdetail);
        }
        else {
            res.sendStatus(404);
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
});
exports.default = orderDetailDispatcher;
