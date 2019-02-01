import express = require("express");
import {CustomerBO} from "../business/customer-bo";
import {ItemBo} from "../business/item-bo";
import cors=require("cors");


// This will return a new instance of a router object that can be used to handle routing
const itemDispatcher = express.Router();

itemDispatcher.route("")
    .get((req, res) => {



        const promise = new ItemBo().findAllItems();
        promise.then(items=>{
            res.status(200).json(items);
        }).catch(error=>{
            res.status(500).send(error);
        });

    }).head(cors({
    exposedHeaders:['X-Count']

}),(req,res)=>{
    const promise =new ItemBo().countItem();
    promise.then(count=>{
        res.append("X-Count",count+"");
        res.sendStatus(200);
    }).catch(err=>{
        res.sendStatus(500);
    })
    //
    // res.append("X-count","50");
    // res.sendStatus(200);
}).post((req, res) => {

        if (!("code" in req.body && "description" in req.body && "unitPrice" in req.body && "qtyOnHand" in req.body)){
            res.status(400).send("Invalid Request Body");
            return;
        }

        const promise = new ItemBo().saveItem(req.body);
        promise.then(status => res.status(201).json(status))
            .catch(err=>res.status(500).send(err));

    });

itemDispatcher.route("/:code")
    .get((req, res) => {


        const promise = new ItemBo().findItems(req.params.id);
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
    .delete((req, res) => {

        const promise = new ItemBo().deleteItem(req.params.id);
        promise.then(status=>{

            if (status){
                res.status(200).send(true);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });

    })
    .put((req, res) => {

        if (!("code" in req.body && "description" in req.body && "unitPrice" in req.body && "qtyOnHand" in req.body)){
            res.status(400).send("Invalid Request Body");
            return;
        }

        if (req.body.code !== req.params.code){
            res.status(400).send("Mismatched Item Code");
            return;
        }

        const promise = new ItemBo().updateItem(req.body);
        promise.then(status=>{

            if (status){
                res.status(200).send(true);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });

    });


export default itemDispatcher;
