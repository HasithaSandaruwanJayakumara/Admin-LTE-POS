import express=require("express");
import cors=require("cors");


import {OrderBO} from "../business/order-bo";



const orderDispatcher = express.Router();


orderDispatcher.route("")
    .get((req, res) => {

        const promise = new OrderBO().findAllOrders();
        promise.then(orders=>{
            res.status(200).json(orders);
        }).catch(error=>{
            res.status(500).send(error);
        });

    })
    .post((req, res) => {
    if (!("id" in req.body && "date" in req.body && "customerId" in req.body)){
        res.status(400).send("Invalid Request Body");
        return;
    }

    const promise = new OrderBO().saveOrder(req.body);
    promise.then(status => res.status(201).json(status))
        .catch(err=>res.status(500).send(err));

})
    .head(cors({exposedHeaders:['X-Count']}),((req,res)=>{


    const promise=new OrderBO().countOrder();
    promise.then(count=>{
        res.append("X-Count",count+"");
        res.sendStatus(200);
    }).catch(error=>{
        res.sendStatus(500);
    });

}));

orderDispatcher.route("/:id")
    .get((req, res) => {
        const promise = new OrderBO().findOrder(req.params.id);
        promise.then(items=>{

            if (items.length > 0){
                res.status(200).send(items[0]);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });
    })

export default orderDispatcher;