
import express=require("express");
import cors=require("cors");
import {OrderDetailBO} from "../business/orderdetail-bo";

const orderDetailDispatcher = express.Router();


orderDetailDispatcher.route("")

    .get((req, res) => {

        const promise = new OrderDetailBO().findAllOrderDetails()
        promise.then(orderdetails=>{
            res.status(200).json(orderdetails);
        }).catch(error=>{
            res.status(500).send(error);
        });

    })

orderDetailDispatcher.route("/:id")

    .get((req, res) => {
        const promise = new OrderDetailBO().findOrderDetail(req.params.id);
        promise.then(orderdetail=>{

            if (orderdetail.length > 0){
                res.status(200).send(orderdetail);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });
    })


export default orderDetailDispatcher;