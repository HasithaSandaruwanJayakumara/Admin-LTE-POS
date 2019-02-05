"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var order_bo_1 = require("../business/order-bo");
var orderDispatcher = express.Router();
orderDispatcher.route("")
    .get(function (req, res) {
    var promise = new order_bo_1.OrderBO().findAllOrders();
    promise.then(function (orders) {
        res.status(200).json(orders);
    }).catch(function (error) {
        res.status(500).send(error);
    });
})
    .post(function (req, res) {
    if (!("id" in req.body && "date" in req.body && "customerId" in req.body)) {
        res.status(400).send("Invalid Request Body");
        return;
    }
    var promise = new order_bo_1.OrderBO().saveOrder(req.body);
    promise.then(function (status) { return res.status(201).json(status); })
        .catch(function (err) { return res.status(500).send(err); });
})
    .head(cors({ exposedHeaders: ['X-Count'] }), (function (req, res) {
    var promise = new order_bo_1.OrderBO().countOrder();
    promise.then(function (count) {
        res.append("X-Count", count + "");
        res.sendStatus(200);
    }).catch(function (error) {
        res.sendStatus(500);
    });
}));
orderDispatcher.route("/:id")
    .get(function (req, res) {
    var promise = new order_bo_1.OrderBO().findOrder(req.params.id);
    promise.then(function (items) {
        if (items.length > 0) {
            res.status(200).send(items[0]);
        }
        else {
            res.sendStatus(404);
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
});
exports.default = orderDispatcher;
